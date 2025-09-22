import { useEffect, useState } from "react";

export default function useStorage<Type>(key: string, initialValue: Type) {
    const [value, setValue] = useState(() => {
        const stored = localStorage.getItem(key);
        return stored ? (JSON.parse(stored) as Type) : initialValue
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
}