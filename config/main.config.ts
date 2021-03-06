import { root } from "../lib/root";

const configFnc = () => {
    const src = root("./src");
    const assets = root("./src", "assets");
    const components = root("src", "components");
    const configRoot = root("config");
    const srcRelative = "/";
    const app = root("./src", "app");
    const docs = "../docs";
    const reports = root("reports");
    const exclude = [/node_modules/, /\.spec.ts$/];
    const distFileName = "[name].bundle.js";
    const assetsPathPattern = "[name].[ext]";
    const entry = src + "/main.ts";
    const dist = root("./dist");
    const vendor = [
        src + "/vendor.ts",
    ];
    const env = "development";

    const extensions = [".ts", ".tsx", ".js", ".scss", ".json", "css"];


    const serverPort = process.env.PORT || 3001;
    const ip = process.env.IP || "localhost";

    const cssPath = "/static/сss/";
    const fontsPath = "/static/fonts";
    const serveFilesPath = "assets";

    const htmls = [
        "index.html",
    ]

    return {
        ip,
        src,
        env,
        app,
        dist,
        docs,
        htmls,
        entry,
        vendor,
        assets,
        reports,
        exclude,
        cssPath,
        fontsPath,
        configRoot,
        components,
        serverPort,
        extensions,
        srcRelative,
        distFileName,
        serveFilesPath,
        assetsPathPattern,
    }
}

export const config = configFnc();