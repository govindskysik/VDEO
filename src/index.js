// Dotenv loads environment variables from a .env file into process.env
// It is used to manage configuration settings for different environments (development, production, etc.)

// require("dotenv").config();

import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env"
});

connectDB();




















// DB is always in another continent
// Always use try catch with async await 

// IIFE - Immediately Invoked Function Expression ()() - 
// We use IIFE to execute code immediately after its definition.
// It helps to create a local scope, avoid polluting the global namespace,
// and is useful for running async code at startup (like connecting to DB).

/* const app = express();

;(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
        console.log("MongoDB connected");
        app.on("error", (error)=>{
            console.log("Error: ", error);
            throw error;
        });

        app.listen(process.env.PORT, ()=>{
            console.log(`Server started at http://localhost:${process.env.PORT}`);
        });

    } catch (error) {
        console.log("Error: " ,error);
        throw error;
    }
})()

*/