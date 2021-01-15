import { endpoint } from "./endpoint";
import config from "../assets/data/config.json";
const Axios = require("axios");

export async function getConfig() {
  return process.env.NODE_ENV === "production"
    ? Axios.get(endpoint.concat("config.json"))
        .then((result) => {
          return result.data;
        })
        .catch((err) => {
          console.log("err :>> ", err);
          return {};
        })
    : new Promise((res, rej) => {
        res(config);
      });
}

export function getSequenceTableHeader(config, setting = "default") {
  return (config.sequenceTableHeaders ?? {})[setting] ?? [];
}

export function getSequenceTableTitle(config) {
  return config.sequenceTableTitle ?? "";
}
export function getSequenceTableDisclaimer(config) {
  return config.sequenceTableDisclaimer ?? "";
}

export function getSequenceTableBarCol(config) {
  return config.sequenceTableBarCol;
}

export function getBarConfig(config) {
  return config.barConfig;
}

export function getRankOptions(config) {
  return config.sequenceTableRanking;
}
