const express = require("express"); // Importing express
const session = require("express-session"); // import session
require('dotenv').config(); // configuring dotenv to acces .env file

const app = express(); // initialising express app

app.set('view engine', 'ejs'); // setting ejs as view engine

app.use(express.static('static')); // using static to acces other files 


// adding express session as middleware
app.use(session({
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
    }
}));

app.use(express.json()); // using middleware to manipulate json file
app.use(express.urlencoded({ extended:true })); // to access post data

const PORT = 9876; // port number

const DB = {
    name:"akshay",
    pass:'password'
}

// home page route
app.get("/", (req, res) => {
    if(req.session.isLoggedIn){
        res.render('index', { title:'Home', data:req.session.data });
    }
    else{
        res.redirect("/login")
    }
})

// login get route
app.get("/login", (req, res) => {
    res.render("login", {title:'Login'})
});

// login post route
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if(DB.name === username && DB.pass === password){
        req.session.isLoggedIn=true;
        req.session.data={
            name:"Akshay Kumar"
        }
        req.session.save(() => {
            res.redirect("/");
        }); // session saving and redirection
    }
});
app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    })
});

// server listening on port
app.listen(PORT, () => {
    console.log("[*] Server started");
    console.log(`[*] site Acces in http://localhost:${PORT}/`);
})
