console.time('Execution time:');
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from "path";
import bodyparser from 'body-parser';


const app = express();

app.use(express.json());

//set a global variable filename to env engine
dotenv.config({ path: 'config.env' });

//log requests
app.use(morgan('tiny'));

//parser
app.use(bodyparser.urlencoded({ extends: true }));

//set views engine
app.set("view engine", "ejs");

// app.use('/', route);

//setting a short links to load assets inside the application
app.use("/css", express.static(path.resolve("assets/css")));
app.use('/img', express.static(path.resolve("assets/img")));
app.use('/js', express.static(path.resolve("assets/js")));

//call port from /config.env or call port 4040 if it is not reachable
const PORT = process.env.PORT || 4040;
const SERVER = process.env.SERVER || 'localhost:';

app.listen(PORT, () => {
    console.log(`Server is running on ${SERVER}${PORT}`)
});
console.timeEnd('Execution time:');