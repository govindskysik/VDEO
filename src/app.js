import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

// CORS - Cross-Origin Resource Sharing -
// It allows or restricts resources on a web server to be requested from another domain outside the domain from which the resource originated.

app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true, // Allow cookies to be sent
}));

// Middleware to parse JSON and URL-encoded data with size limits
app.use(express.json({
    limit: '16kb' // Limit JSON payload to 16kb
}));
app.use(express.urlencoded({
    extended: true, // Use extended parsing for URL-encoded data
    limit: '16kb' // Limit URL-encoded payload to 16kb
}));

app.use(express.static('public')); // Serve static files from the 'public' directory

app.use(cookieParser()); // Parse cookies from incoming requests

// Routes import
import userRouter from './routes/user.router.js'

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is working",
        timestamp: new Date().toISOString()
    });
});

app.use("/api/v1/users", userRouter)

export default app;