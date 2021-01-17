import * as https from "https";

/**
 * Encapsulation of https client for components usage.
 * @param url The url to request
 */
export const getRequest = function (url: string) {
  return new Promise((resolve, reject) => {
    console.log("URL: " + url);
    https
      .get(url, (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          console.log("Retrieved all the data from Endpoint");
          resolve(JSON.parse(data));
        });
      })
      .on("error", (err) => {
        console.log("Error: " + err.message);
        reject();
      });
  });
};
