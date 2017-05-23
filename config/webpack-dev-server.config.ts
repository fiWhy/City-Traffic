import { config } from "./main.config";
const devServerConf = () => {
    return {
        contentBase: config.dist,
        disableHostCheck: true,
        public: `${config.ip}:${config.serverPort}`,
    };
}
export const webpackDevServerConfig = devServerConf();
