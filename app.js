const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const homepageRoute = require('./src/routes/homepage')
const registerInstituteRoute = require('./src/routes/registerInstitute')
const CourseRoute = require('./src/routes/courses')
const DegreeRoute = require('./src/routes/degrees')
const registerCoursesRoute = require('./src/routes/registerCourses')
const DepartmentRoute = require('./src/routes/departments')
const InstructorRoute = require('./src/routes/instructors')
const StudentRoute = require('./src/routes/students')
const studentHomeRoute = require('./src/routes/studentHome')
const instructorHomeRoute = require('./src/routes/instructorHome')
const adminHomeRoute = require('./src/routes/adminHome')
// SETUP EXPRESS APP
const app = express()
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
// Connect to MongoDB
mongoose
  .connect(db='ums', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));
// test route
app.get('/', (req, res) => res.send('Hello World'));

// LISTEN FOR REQUESTS
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

//connecting to database
mongoose.connect('mongodb+srv://bipinverma:12345@cluster0.ipziev1.mongodb.net/ums',
{
    useNewUrlParser: true,
    //useCreateIndex: true
},
(err)=>{
    if(err) {
        console.log(err)
    }
    else 
    
    console.log('*****WELLCOME TO UNIVERSITY MANAGMENT SYSTEM(UMS)***** Connection to database successful ')
})

//Allowing cross access resource sharing
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8000");
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if(req.method === 'OPTIONS')
    {
        res.setHeader('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
        return res.status(200).json({})
    }
    next();
});

//register the routes here
app.use('/',homepageRoute)
app.use('/adminHome',adminHomeRoute)
app.use('/registerInstitute',registerInstituteRoute)
app.use('/departments',DepartmentRoute)
app.use('/degrees',DegreeRoute)
app.use('/courses',CourseRoute)
app.use('/instructors',InstructorRoute)
app.use('/students',StudentRoute)
app.use('/register',registerCoursesRoute)
app.use('/studentProfile',studentHomeRoute)
app.use('/instructorProfile',instructorHomeRoute)

//error handling
app.use((req,res,next)=>{
    var error = new Error("Page not found")
    error.status = 404
    next(error) 
})
app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        status: error.status,
        error: error.message
    })
})
//export
module.exports = app