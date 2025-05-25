const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const courseListingSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: String,

    thumbnail: {
        filename: { type: String },
        url: {
            type: String,
            default: "https://thumbs.dreamstime.com/b/comic-speech-bubble-cartoon-word-wow-vintage-style-comic-speech-bubble-cartoon-word-wow-vintage-style-illustration-design-text-158651844.jpg",
            set: (v) => v === "" ? "https://thumbs.dreamstime.com/b/comic-speech-bubble-cartoon-word-wow-vintage-style-comic-speech-bubble-cartoon-word-wow-vintage-style-illustration-design-text-158651844.jpg" : v,
            }
    },

    price: Number,

    offers: String,

});


module.exports = mongoose.model("CourseListing", courseListingSchema);