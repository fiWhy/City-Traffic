import "./polyfills";
import "./main.ts";

const context = require.context("./", true, /\.spec\.ts$/);
context.keys().map(context);