const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CourseDetails = require("./course_overview")


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

    overview: {
        type: Schema.Types.ObjectId,
        ref: "courseDetails"
    }

});


// Middleware: Delete related overview
courseListingSchema.post("findOneAndDelete", async function (doc) {
    if (doc && doc.overview) {
        await CourseDetails.findByIdAndDelete(doc.overview);
        console.log("Deleted associated courseDetails:", doc.overview);
    }
});


module.exports = mongoose.model("CourseListing", courseListingSchema);