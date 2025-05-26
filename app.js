const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const CourseListing = require("./models/course_listing")
const CourseDetails = require("./models/course_overview")
const methodOverride = require("method-override");



const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));


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
    res.redirect('/home')
});
// ----------------------------------------------------------------


// Home Page ------------------------------------------------------
app.get("/home", async (req, res) => {
    const allCourses = await CourseListing.find({});
    res.render("courselisting/index.ejs", { allCourses });
});
// ----------------------------------------------------------------


// (GET) Create Page!
app.get("/home/new", async (req, res) => {
    res.render("courselisting/new.ejs");
});
// ----------------------------------------------------------------


// (POST) Create Page!
app.post("/home", async (req, res) => {
    try {
        const newCourse = new CourseListing(req.body.course);
        const savedCourse = await newCourse.save(); // await is needed
        console.log(savedCourse);
        res.redirect("/home");
    } catch (err) {
        console.error("Error saving course:", err);
        res.status(500).send("Something went wrong");
    }
});
// ----------------------------------------------------------------


// (GET) Show Page!
app.get("/home/show/:id", async (req, res) => {
    // let { id } = req.params;

    try {
        const Course = await CourseListing.findOne({ _id: req.params.id }).populate("overview");

        if (!Course) {
            return res.redirect("/home"); // Redirect if not found
        }

        res.render("courselisting/showCourse.ejs", { Course }); // ✅ Pass Course to the view
    } catch (error) {
        console.error("Error fetching course:", error);
        res.redirect("/home");
    }
});
// ----------------------------------------------------------------

// (GET) Course Overview Create Page ------------------------------
app.get("/home/show/:id/overview", async (req, res) => {
    res.render("courselisting/courseOverview.ejs", { id: req.params.id });
});
// ----------------------------------------------------------------


// (POST) Course Overview Post Page ------------------------------
app.post("/home/show/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { details } = req.body.course;

        // Step 1: Create the overview document
        const overview = new CourseDetails({ details });
        await overview.save();

        // Step 2: Attach the overview to the course
        const course = await CourseListing.findById(id);
        course.overview = overview._id;
        await course.save();

        // Step 3: Populate the overview before redirecting or rendering
        // const populatedCourse = await CourseListing.findById(id).populate("overview");

        // Step 4: Redirect or render with the populated course
        // res.render("some-template.ejs", { course: populatedCourse }); // If rendering
        res.redirect(`/home/show/${id}`); // If redirecting

        // If you later want to use the populated data, pass it into the render like above
    } catch (err) {
        console.error("Error creating overview:", err);
        res.status(500).send("Something went wrong");
    }
});
// ----------------------------------------------------------------


// (GET) Edit Page ----------------------------------------------------
app.get("/home/show/:id/edit", async (req, res) => {
    let {id} = req.params;
    const courselisting = await CourseListing.findById(id).populate("overview");

    if(!courselisting){
        return res.redirect(`/home/show/${id}`);
    }

    res.render("courselisting/editCourse.ejs", { courselisting });
});
// -------------------------------------------------------------------


app.put("/home/show/:id", async (req, res) => {
    const { id } = req.params;
    const { course, overviewDetails } = req.body;

    // Update the CourseListing fields
    const updatedCourse = await CourseListing.findByIdAndUpdate(id, course, { new: true }).populate("overview");

    // If overview exists, update it
    if (updatedCourse.overview) {
        updatedCourse.overview.details = overviewDetails;
        await updatedCourse.overview.save();
    }

    res.redirect(`/home/show/${id}`);
});

//  Port connection ------------------------------------------------
app.listen(8080, () => {
    console.log("Server is runing Successfully!")
});
// -----------------------------------------------------------------
