import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "HOSPITALAPP",
    })
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => {
      console.log(`some error occured while connecting to db: ${err}`);
    });
};
