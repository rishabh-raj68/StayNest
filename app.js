import express from 'express';
const app= express();
import mongoose from 'mongoose';
const PORT=6060;
import Listing from './models/listing.js';
import path from 'path';
import { fileURLToPath } from "url";
import methodOverride from 'method-override';
import ejsMate from "ejs-mate";

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req,res) => {
    res.send("root is working");
})

//Index Route to display all listings
app.get("/listings", async (req,res) => {
   const allListings= await Listing.find({});
   console.log("Total Listings:", allListings.length);
    console.log(allListings);

   res.render("listings/index.ejs", {allListings});

    
});


//new Route
app.get("/listings/new", (req,res)=> {
    res.render("listings/new.ejs");
})

//show Route
app.get("/listings/:id", async(req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    console.log(listing);
    res.render("listings/show.ejs", {listing});

});

//create route-----
app.post("/listings", async (req, res) => {

    console.log("BODY:", req.body);
    console.log("LISTING:", req.body.listing);
    console.log("TITLE:", req.body.listing?.title);

    if (!req.body.listing || !req.body.listing.title) {
        return res.send("Title is missing!");
    }

    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

//Edit Route-----
app.get("/listings/:id/edit", async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});

//update Route
app.put("/listings/:id", async(req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});

//delte Route---
app.delete("/listings/:id", async(req,res) => {
    let {id} = req.params;
    const deletedListing= await Listing.findByIdAndDelete(id);
    console.log("Deleted Listing:", deletedListing);
    res.redirect("/listings");
})


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