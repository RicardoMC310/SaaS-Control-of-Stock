import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header fixo */}
            <div className="w-full top-0 left-0">
                <Header />
            </div>

            {/* Conteúdo centralizado */}
            <div className="p-1 flex flex-1 justify-center items-center">
                <Card className="p-4 w-1/3 min-w-[350px] shadow-lg rounded-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Faça login para acesso total!</CardDescription>
                        <CardAction>
                            <Button variant="link" asChild>
                                <Link to="/signup">SingUp</Link>
                            </Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <form autoComplete="off">
                            <div className="grid grid-cols-4 gap-6 items-center">
                                <Label htmlFor="email">Email: </Label>
                                <Input
                                    className="col-span-3"
                                    name="email"
                                    placeholder="seu melhor email"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                    autoComplete="username"
                                />
                                <Label htmlFor="password">Password: </Label>
                                <Input
                                    className="col-span-3"
                                    name="password"
                                    placeholder="sua senha aqui"
                                    type="password"
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                    autoComplete="new-password"
                                />
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Logar</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
