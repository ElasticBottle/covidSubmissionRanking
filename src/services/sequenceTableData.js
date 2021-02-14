import { endpoint } from "./endpoint";
const Axio = require("axios");

export async function getSequenceData() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const sequenceData = require("../assets/data/seqData.json");
      res(sequenceData);
    }, 2000);
  });
  // process.env.NODE_ENV === "production"
  //   ? Axio.get(endpoint.concat("country_submission_ranking.json"))
  //       .then((result) => {
  //         return result.data.stats;
  //       })
  //       .catch((err) => {
  //         console.log("err :>> ", err);
  //         return {};
  //       })
  //   :
}
