const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");



const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


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

// Home Page -----------------------------------------------------
app.get("/home", (req, res) => {
    res.render("courselisting/index.ejs");
});




//  Port connection ------------------------------------------------
app.listen(8080, () => {
    console.log("Server is runing Successfully!")
});
// -----------------------------------------------------------------
