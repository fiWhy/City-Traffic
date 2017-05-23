import { webpackConfig } from "../config/webpack.config";
import { webpackDevServerConfig } from '../config/webpack-dev-server.config';
import { config } from '../config/main.config';

import * as WebpackDevServer from "webpack-dev-server";
import * as webpack from "webpack";


const task = () => {
    let compiler = webpack(webpackConfig());
    let server = new WebpackDevServer(compiler, <any>webpackDevServerConfig);
    server.listen(config.serverPort, config.ip);
    console.log(`You can see your project by http://${config.ip}:${config.serverPort}`);
}

task();