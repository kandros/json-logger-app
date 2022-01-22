import pino from "pino";
import os from "os";

process.on("SIGINT", function () {
  console.log("Received SIGINT -> EXITING");
  process.exit();
});

let INTERVAL = 500;
if (typeof process.env.INTERVAL !== "undefined") {
  try {
    INTERVAL = parseInt(process.env.INTERVAL);
  } catch (e) {
    throw new Error("process.env.INTERVAL must be a number");
  }
}

const levels = ["trace", "debug", "info", "warn", "error"];

let LOG_LEVEL = "info";

if (typeof process.env.LOG_LEVEL !== "undefined") {
  if (levels.includes(process.env.LOG_LEVEL)) {
    LOG_LEVEL = process.env.LOG_LEVEL;
  } else {
    throw new Error(
      "provided unknonw process.env.LOG_LEVEL must be one of " +
        levels.join(", ")
    );
  }
}

const logger = pino({
  prettyPrint:
    process.env.PRETTY === "true"
      ? {
          levelLabel: true,
        }
      : false,
});

logger.info(`
Starting with settings:
  INTERVAL: ${INTERVAL}
  LOG_LEVEL: ${LOG_LEVEL}
`);

const hostname = os.hostname();

function handler() {
  logger[LOG_LEVEL]({
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
