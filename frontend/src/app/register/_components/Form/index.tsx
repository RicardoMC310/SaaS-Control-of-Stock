"use client";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/authContext";
import Link from "next/link";
import { FormEvent } from "react";

export default function Form() {
    const {register} = useAuth();

    const handlerRegisterSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const formData: FormData = new FormData(event.currentTarget);

        const name: string = formData.get("name") as string ?? "";
        const email: string = formData.get("email") as string ?? "";
        const password: string = formData.get("password") as string ?? "";

        try {
            await register({name, email, password});
            alert("logado com sucesso!");
        }catch(error) {
            alert(error);
        }
    };

    return (
        <form onSubmit={handlerRegisterSubmit}
            className="w-1/3 min-w-[350px]">
            <Card className="">
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>
                        Garanta acesso a plataforma para aproveitar nossos recursos
                    </CardDescription>
                    <CardAction>
                        <Link href="/login">Login</Link>
                    </CardAction>
                </CardHeader>
                <Separator />
                <CardContent>

                    <div className="grid grid-cols-4 space-y-4">
                        <Label className="col-span-1">Name: </Label>
                        <Input name="name" className="col-span-3" type="text" required />

                        <Label className="col-span-1">Email: </Label>
                        <Input name="email" className="col-span-3" type="email" required />

                        <Label className="col-span-1">Password</Label>
                        <Input name="password" className="col-span-3" type="password" required />
                    </div>

                </CardContent>
                <Separator />
                <CardFooter className="space-x-2">
                    <Button type="reset" variant="secondary">Limpar</Button>
                    <Button type="submit">Sign Up</Button>
                </CardFooter>
            </Card>
        </form>
    );
}