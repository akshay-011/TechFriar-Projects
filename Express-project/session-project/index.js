const express = require("express"); // import express
const session = require("express-session"); // import express session

const app = express(); // initialising express app

app.use(session({
    secret:'MySecretKeyHehe',
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false
    }
}))

app.set("view engine", 'ejs'); // setting ejs as view engine

app.use(express.urlencoded({extended:true}));
app.use(express.static('static')); // static folder

const PORT = 9876; // port number into variable

// home route
app.get("/", (req, res) => {
    if(req.session.loggedIn){ // checking user already came
        res.render('home', {title:'Home', loggedIn:true, data:req.session.data}); 
    }
    else{
        res.render("home", {title:'Home', loggedIn:false}); 
    }
});
// login route
app.post("/login", (req, res) => {

});

// server listening on port
app.listen(PORT, () => {
    console.log("[*] Server starting....");
    console.log(`[*] acces site on http://localhost:${PORT}`);
});
