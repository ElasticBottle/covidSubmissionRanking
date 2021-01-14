import { endpoint } from "./endpoint";
const Axio = require("axios");

export async function getSequenceData() {
  return process.env.NODE_ENV === "fake"
    ? Axio.get(endpoint.concat("sequenceData.json"))
        .then((result) => {
          return result.data;
        })
        .catch((err) => {
          console.log("err :>> ", err);
          return {};
        })
    : new Promise((res, rej) => {
        setTimeout(() => {
          const sequenceData = require("../assets/data/sequenceData.json");
          res(sequenceData);
        }, 2000);
      });
}
