import { describe, expect, it, vi } from "vitest";
import App from "./server";

describe("testando conexão do servidor", () => {
    it("testando constante app", () => {
        const spyLog = vi.spyOn(console, "log").mockImplementation((...fmt: string[]) => { 
        });

        const app = new App(3000, "127.0.0.1");

        app.run();

        expect(spyLog).toHaveBeenCalledWith("rodando");
        expect(spyLog).toHaveBeenCalledTimes(1);

        spyLog.mockRestore();
    });
});