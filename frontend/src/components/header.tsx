"use client"

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
    return (
        <header className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-between w-[100%] p-4">
                <h1 className="p-3 text-3xl">JafCar</h1>

                <div className="space-x-2">
                    <Link href="/login">
                        <Button>Login</Button>
                    </Link>
                    <Link href="/register">
                        <Button variant="secondary">Sign Up</Button>
                    </Link>
                </div>
            </div>

            <Separator />
        </header>
    );
}