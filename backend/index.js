// load env variables
import dotenv from "dotenv"


import express from "express"
import connectToDb from "./connectToDb/connectToDb.js";
import cors from 'cors';
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoutes.js'

// configure app
dotenv.config();

const app = express();

// Middleware for parsing request body
app.use(express.json());
const PORT = process.env.PORT;
app.use(cors({
    origin: true,
    credentials: true,
}));

// Connect to Db
connectToDb();

app.get('/', (req, res)=>{
    return res.send("Home Page")
})

app.use('/books', booksRoute);

app.listen(PORT, () => {
    console.log(`App is listening to port: ${process.env.PORT}`);
})
