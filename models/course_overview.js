const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseOverview = new Schema({
    details: String
});

module.exports = mongoose.model("courseDetails", courseOverview);