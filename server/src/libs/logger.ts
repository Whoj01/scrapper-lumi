import pino from "pino";

const logger = pino({
	transport: {
		target: "pino-pretty",
		options: {
			colorize: true,
			ignore: "pid,hostname",
			translateTime: "SYS:HH:MM:ss",
		},
	},
	timestamp: pino.stdTimeFunctions.isoTime,
});

export { logger };
