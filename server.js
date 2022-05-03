console.time("Execution time:");
import express from "express";
import dotenv from "dotenv";
import route from "./server/routes/router.js";

//import a logger services
import morgan from "morgan";

//import
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

app.use("/", route);

//setting a short links to load assets inside the application
app.use("/css", express.static(path.resolve("assets/css")));
app.use("/img", express.static(path.resolve("assets/img")));
app.use("/js", express.static(path.resolve("assets/js")));

//Calling instance of MongoDB Connection by Mongoose
connectDB();

//call port from /config.env or call port 4000 if it is not reachable
export const PORT = process.env.PORT || 4000;
export const SERVER = process.env.SERVER || `http://localhost:${PORT}`;

app.listen(PORT, () => {
    console.log(`Server is running on ${SERVER}`);
});
console.timeEnd("Execution time:");