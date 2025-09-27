"use client";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { FormEvent } from "react";

export default function Form() {

    const handlerLoginSubmit = (event: FormEvent<HTMLFormElement>) => {

    };

    return (
        <form onSubmit={handlerLoginSubmit}
            className="w-1/3 min-w-[350px]">
            <Card className="">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Faça login para ter acesso a plataforma
                    </CardDescription>
                    <CardAction>
                        <Link href="/register">Sign Up</Link>
                    </CardAction>
                </CardHeader>
                <Separator />
                <CardContent>

                    <div className="grid grid-cols-4 space-y-4">
                        <Label className="col-span-1">Email: </Label>
                        <Input name="email" className="col-span-3" type="email" required />

                        <Label className="col-span-1">Password</Label>
                        <Input name="password" className="col-span-3" type="text" required />
                    </div>

                </CardContent>
                <Separator />
                <CardFooter className="space-x-2">
                    <Button type="reset" variant="secondary">Limpar</Button>
                    <Button type="submit">Login</Button>
                </CardFooter>
            </Card>
        </form>
    );
}