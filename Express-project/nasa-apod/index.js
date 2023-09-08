const express = require('express'); // importing express
const axios = require("axios"); // axios import for api request


require('dotenv').config(); // accesing .env file

const app = express(); // initialising express 

app.set('view engine', 'ejs'); // setting ejs as view engine
app.use(express.static('static')); // Showing static folder structure
app.use(express.urlencoded({extended:true})); // Using middleware to acces post data
app.use(express.json()); // for json file manipulation

const PORT = 9876; // Storing port number
const URL = "https://api.nasa.gov/planetary/apod"; // NASA api link
const API_KEY = process.env.API_KEY; // Accesing api key inside of .env

var DATABASE; // just a variable to store fetched data

// home page route
app.get("/", (req, res) => {
    res.render('index', {title:"Home"})
} )

// Route to get Date
app.get("/apod/calendar", (req, res) => {
    res.render("calendar", { title:'Calendar' })
})

app.post("/apod", async (req, res) => {
    const { start_date, end_date } = req.body;
    if(start_date.length <= 0){
        let url = `${URL}?api_key=${API_KEY}`
        await axios.get(url)
        .then((res) => {
            console.log(res.data);
            DATABASE = [res.data]
        })
        .catch((err) => {
            console.log(err);
            DATABASE='';
        })
        res.render('apods', {title:"APOD's", data:DATABASE});
    }
    else if(start_date.length > 0 && end_date.length > 0){
        let url = `${URL}?api_key=${API_KEY}&start_date=${start_date}&end_date=${end_date}`
        await axios.get(url)
        .then((res) => {
            console.log(res.data);
            DATABASE = res.data
        })
        .catch((err) => {
            console.log(err);
            DATABASE=''
        })
        res.render('apods', {title:"APOD's", data:DATABASE});
    }
    else{
        let url = `${URL}?api_key=${API_KEY}&start_date=${start_date}`
        await axios.get(url)
        .then((res) => {
            console.log(res.data);
            DATABASE = res.data
        })
        .catch((err) => {
            console.log(err);
            DATABASE='';
        })
        res.render('apods', {title:"APOD's", data:DATABASE});
    }

})

//server listening on PORT 
app.listen(PORT, () => {
    console.log("[*] Server started");
    console.log(`[*] Visit http://localhost:${PORT}/`);
})
