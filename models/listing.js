import mongoose from "mongoose";
const Schema= mongoose.Schema;

const listingSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    description: String,
    image: {
       type: String,
       default: "https://images.unsplash.com/photo-1791827296475-a3742d44727d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
       set: (v) => v === "" ? "https://images.unsplash.com/photo-1791827296475-a3742d44727d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
        : v,
    },
    price: Number,
    location : String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;