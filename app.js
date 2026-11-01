import express from 'express';
const app= express();
import mongoose from 'mongoose';
const PORT=6060;
import Listing from './models/listing.js';
import path from 'path';
import { fileURLToPath } from "url";

main()
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.get("/", (req,res) => {
    res.send("root is working");
})

app.get("/listings", async (req,res) => {
   const allListings= await Listing.find({});
   res.render("listings/index.ejs", {allListings});

    
});

// app.get("/testListing", async(req,res) => {
//      let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calanguta Goa",
//         country: "India",
//      });
//      await sampleListing.save();
//      console.log("sample was  saved");
//      res.send("successful testing")
     
// })

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});