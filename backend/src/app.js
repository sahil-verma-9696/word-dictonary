import express from "express";
import cors from "cors";
import routes from "./routes.js";

// Initialize local database
// import "./db/localdb.js";

const app = express();


// Middlewares

// cors
app.use(cors())

// body parser
app.use(express.json());


// Routes
app.use("/", routes);



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.message);

  let message = 'Internal Server Error';

  if(err.message) message = err.message;
  
  res.status(500).json({ error: message });
});


// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});