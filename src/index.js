// Dotenv loads environment variables from a .env file into process.env
// It is used to manage configuration settings for different environments (development, production, etc.)

// require("dotenv").config();

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js"; // Change this line - remove curly braces

dotenv.config({
    path: "./.env"
});

// Connect to the database
// Using .then and .catch to handle the promise returned by connectDB
connectDB()
.then(() => {
    // what is the use of app.on - to handle errors globally in the app 
    app.on("error", (error) => {
        console.error("Error: ", error);
        throw error;
    });

    // Start the server only after successful DB connection
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server started at http://localhost:8000`);
    });
})
.catch((error) => {
    console.error("Failed to connect to DB:", error);
    process.exit(1); // Exit the process with failure
});














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