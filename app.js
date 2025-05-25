const express = require("express");
const mongoose = require("mongoose");



const app = express();


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



//  initial Route -------------------------------------------------
app.get("/", (req, res) => {
    res.send("all working good!")
});
// ----------------------------------------------------------------




//  Port connection ------------------------------------------------
app.listen(8080, () => {
    console.log("Server is runing Successfully!")
});
// -----------------------------------------------------------------
