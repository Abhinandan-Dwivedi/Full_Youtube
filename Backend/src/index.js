//require("dotenv").config({path : "./.env"}); 
import express from "express";
import dotenv from "dotenv";
import connectDB from "./DataB/index.js";
import app from "./app.js";

dotenv.config({ path: "./.env" });

const port = process.env.PORT || 5000;

connectDB()
.then(() => {
    console.log("Database connected successfully");
   app.listen(port , () => {
       console.log(`Server is running on port ${port}`);
   });
})
.catch((error) => {
    console.error("Failed to connect to the database:", error);
});