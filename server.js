//start a measurement of the time of execution the app
console.time("Execution time:");
import express from "express";
import dotenv from "dotenv";
import route from "./server/routes/router.js";

//import a logger services
import morgan from "morgan";

//import path module to access the path of the project
import path from "path";
import bodyparser from "body-parser";
import connectDB from "./server/database/connection.js";

//Calling the instance of express
const app = express();

//Calling the JSON support to the API
app.use(express.json());

//set a global variable filename to env engine
dotenv.config({ path: "config.env" });

//log requests
app.use(morgan("tiny"));

//set the ability to work with the body of the requests
app.use(bodyparser.urlencoded({ extended: true }));

//set views engine
app.set("view engine", "ejs");

//make the public folder available at "/" public for all routes
app.use("/", route);

//setting shortcuts to load assets inside the application
app.use("/css", express.static(path.resolve("assets/css")));
app.use("/img", express.static(path.resolve("assets/img")));
app.use("/js", express.static(path.resolve("assets/js")));

//Calling instance of MongoDB Connection by Mongoose
connectDB();

//call port from /config.env or call port 4000 if it is not reachable
export const PORT = process.env.PORT || 4000;
console.log(PORT);
//Calling the server from /config.env or call localhost combined with port
//this line makes the app compatible to run on localhost and port 4000 and Heroku at the same time
export const SERVER = process.env.SERVER || `http://localhost:${PORT}`;
console.log(SERVER);

//put the app available at port 4000
app.listen(PORT, () => {
  //show on console a msg that the server is running at the port
  console.log(`Server is running on ${SERVER}`);
});
//finish the measurement of the time of execution the app
console.timeEnd("Execution time:");
