const express = require("express"); // importing express
const session = require("express-session"); // import session

const mongoose = require("mongoose");

require('dotenv').config(); // configuring dotenv to ecces .env files

const UserModel = require("./database/UserSchema"); // importing UserModel

const app = express(); // initialising express server

app.set('view engine', 'ejs'); // setting ejs as view engine

app.use(session({
    secret:'My Secret',
    saveUninitialized:false,
    resave:false
}))
app.use(express.static('static')); // using static folder to acces other files

app.use(express.urlencoded({ extended:true })); //using url encoder to acces post data
const PORT = 9876; // storing port number into a variable

mongoose.connect(process.env.URL) //connection to database
.then(() => {
    console.log("[*] Connected to databse"); // printing if connected
})
.catch((err) => {
    console.log("[*] Error occured " + err); // displaying if not connected
})

// home route
app.get("/", (req, res) => {
    if(req.session.isLogged){
        res.render("home", {title:"Home", data:req.session.data});
    }
    else{
        res.redirect("/login")
    }
});
// sign up 
app.get("/signup", (req, res) => {
    res.render("signup", {title:'Sign Up'})
})

//login get
app.get("/login", (req, res) => {
    res.render("login", {title:'Login'});
})

// sign up post method
app.post("/signup", (req, res) => {
    console.log(req.body);
    new UserModel(req.body).save()
    .then(() => {
        res.redirect('/login');
    })
    .catch((err) => {
        console.log(err);
        res.redirect("/signup");
    })
})

// login post method
app.post('/login', async (req, res) =>{
    const {username, password} = req.body;
    const user = await UserModel.findOne({username:username});
    console.log(user);
    if(user && password == user.password){
        req.session.isLogged = true;
        req.session.data = user;
        req.session.save(() => {
            res.redirect("/");
        });
    }
    else{
        res.redirect("/login")
    }
})

app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    })
})

app.listen(PORT, () => {
    console.log("[*]Server started...");
    console.log(`[*] access site on  http://localhost:${PORT}/`);
})

