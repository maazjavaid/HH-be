const mongoose = require("mongoose");
const DB = process.env.DATABASE;
mongoose.set("strictQuery", false);
mongoose
  .connect(DB)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err: Error) => {
    console.log("Database not connected");
  });
