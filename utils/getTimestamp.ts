export const getTimestamp = (objectIdStr: string) => {
	const { ObjectId } = require("mongodb");

	const objectId = new ObjectId(objectIdStr);
	const unixTimestamp = objectId.getTimestamp().getTime() / 1000;
	// const humanReadableTimestamp = objectId.getTimestamp();

	// console.log("Unix Timestamp:", unixTimestamp);
	return unixTimestamp;
};

export const isTimestampOld = (unixTimestamp: number): boolean => {
	const currentTimestamp = Math.floor(Date.now() / 1000);
	const differenceInSeconds = currentTimestamp - unixTimestamp;
	return differenceInSeconds > 3600; // 1 hour
};
