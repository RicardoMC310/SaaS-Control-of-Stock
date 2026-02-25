console.log("teste");
// permitir ver ip real do cliente inves do ip do proxy no build
// app.set("trust proxy", 1)

export default class App {
    constructor(
        private readonly port: number,
        private readonly host: string
    ){}

    run(): void {
        console.log("rodando");
    }
}