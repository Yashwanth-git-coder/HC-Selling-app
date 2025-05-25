const mongoose = require("mongoose");
const courseListing = require("../models/course_listing.js");
const initData = require("./data.js")


//  DATA BASE Connection! -----------------------------------------
const DB_URL = 'mongodb://127.0.0.1:27017/HC-Course-DB'

main()
    .then(() => {
        console.log("connected to DB!");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect(DB_URL);
}
// ----------------------------------------------------------------

const initDB = async () => {
    await courseListing.deleteMany({});
    await courseListing.insertMany(initData.data);
    console.log("Data was Initsitlazed!");
}

initDB();