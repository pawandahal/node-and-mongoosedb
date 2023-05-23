const app = require("./app");

const dotenv = require("dotenv"); // config.env ma bhako value thahapauna dot env use gareko
const connectDatabase = require("./config/database");

//Handle uncaught exception
process.on("uncaughtException", (err) => {
  console.log(err, "errr");
  console.log(`Error:${err.message}`);
  console.log("Shutting down due to the unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});

//Config
dotenv.config({ path: "backend/config/config.env" }); // config.env ko path

//Connecting database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

//Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log("Shutting down due to the unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
