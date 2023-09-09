const express = require("express"); // import express
const cookieParser = require('cookie-parser'); // import cookie-parser


const app = express(); // initialising express app

app.use(express.static('static')); // using static folder to acces other files

const PORT = 9876; // saving port number into a variable

app.set('view engine', 'ejs'); // setting ejs as view engine
app.use(cookieParser()); // applying cookie parser as middleware

//home route
app.get("/", (req, res) => {
    if(req.cookies.came){
        let newCount = parseInt(req.cookies.count)+1; // incrimenting cout
        res.cookie('count', newCount).render('home', {title:'Home', ...req.cookies});
    }
    else{
        res.cookie('count', 1);
        res.cookie('came', true);
        res.render("home", {title:'Home', came:false});
    }
});

// delete cookie route
app.get("/delete", (req, res) => {
    res.clearCookie('count'); // deleting cookie
    res.clearCookie('came'); // deleting cookie
    res.redirect("/"); // redirecting to home

})

app.listen(PORT, () => {
    console.log("[*] Server started");
    console.log(`[*] acces site http://localhost:${PORT}`);
})
