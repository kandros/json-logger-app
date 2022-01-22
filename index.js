import pino from "pino";
import os from "os";

process.on("SIGINT", function () {
  console.log("Received SIGINT -> EXITING");
  process.exit();
});

if (
  typeof process.env.INTERVAL !== "undefined" &&
  typeof INTERVAL !== "number"
) {
  throw new Error("process.env.INTERVAL must be a number");
}

const INTERVAL = process.env.INTERVAL || 500;

const logger = pino({});

logger.info(`
Starting with settings:
interal: ${INTERVAL}
`);

const hostname = os.hostname();

function handler() {
  logger.info({
    hostname,
    ...obj,
  });
}

setInterval(handler, INTERVAL);

const obj = {
  random: 70,
  "random float": 87.171,
  bool: false,
  date: "1999-10-19",
  regEx: "hellooooooooooooooooooooooooooooooooooooooooo to you",
  enum: "generator",
  firstname: "Lexine",
  lastname: "Quinn",
  city: "Namangan",
  country: "Slovenia",
  countryCode: "DK",
  "email uses current data": "Lexine.Quinn@gmail.com",
  "email from expression": "Lexine.Quinn@yopmail.com",
  array: ["Drucie", "Sandie", "Collen", "Starla", "Fidelia"],
  "array of objects": [
    {
      index: 0,
      "index start at 5": 5,
    },
    {
      index: 1,
      "index start at 5": 6,
    },
    {
      index: 2,
      "index start at 5": 7,
    },
  ],
  Inga: {
    age: 55,
  },
};
