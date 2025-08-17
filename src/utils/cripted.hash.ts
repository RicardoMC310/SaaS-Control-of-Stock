import { BadGatewayException } from "@nestjs/common";
import { createSecretKey } from "crypto";
import { compactDecrypt, CompactEncrypt } from "jose";

export async function createHashCnpj(cnpj: string, secret: string): Promise<string> {
    if (!secret) {
        throw new BadGatewayException('Secret key not found');
    }

    const key = createSecretKey(Buffer.from(secret, "base64"));

    const enconder = new TextEncoder();

    return await new CompactEncrypt(enconder.encode(JSON.stringify({ cnpj }))).setProtectedHeader({ alg: "dir", enc: "A256GCM" }).encrypt(key);
}

export async function extractCnpjToHash(hash: string, secret: string): Promise<string> {
    if (!secret) {
        throw new BadGatewayException("Secret key not found");
    }

    const key = createSecretKey(Buffer.from(secret, "base64"));

    const { plaintext } = await compactDecrypt(hash, key);
    const deconder = new TextDecoder();

    return JSON.parse(deconder.decode(plaintext)).cnpj;
}