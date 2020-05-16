import main from "./main";
import { promises as fs } from "fs";
import * as config from "../config.json";
// const defaultConfigPath = resolve(__dirname, "./config.json");
// let customConfigPath;

// process.argv.forEach(function (val, index, array) {
//   if (index === 2) {
//     customConfigPath = val;
//   }
// });
main(config);
