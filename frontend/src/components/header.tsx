"use client";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "./ui/button";
import { useAuth } from "@/lib/authContext";
import { useRouter } from "next/navigation"; // App Router

export default function Header() {
    const { token, logout, loading } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login"); // melhor que window.location.href
    };

    const renderButtons = () => {
        if (!token) {
            return (
                <>
                    <Link href="/login">
                        <Button disabled={loading}>Login</Button>
                    </Link>
                    <Link href="/register">
                        <Button variant="secondary" disabled={loading}>Sign Up</Button>
                    </Link>
                </>
            );
        }

        return (
            <>
                <Link href="/">
                    <Button variant="link" disabled={loading}>Home</Button>
                </Link>
                <Button onClick={handleLogout} disabled={loading}>Logout</Button>
            </>
        );
    };

    return (
        <header className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-between w-full p-4">
                <h1 className="p-3 text-3xl">JafCar</h1>
                <div className="space-x-2">{renderButtons()}</div>
            </div>
            <Separator />
        </header>
    );
}
