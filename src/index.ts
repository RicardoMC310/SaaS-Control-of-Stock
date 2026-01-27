import { createApp } from "./app";

import DotEnv from "@utils/Env/dotenv";

const bootstrap = async () => {
    const App = await createApp();

    const PORT = parseInt(DotEnv.getenv("SERVER_PORT", "3000"));

    App.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

bootstrap();