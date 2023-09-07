const express = require('express'); // importing express
import axios from 'axios'; // axios import for api request


require('dotenv').config(); // accesing .env file

const app = express(); // initialising express 

app.set('view engine', 'ejs'); // setting ejs as view engine
app.use(express.static('static')); // Showing static folder structure
app.use(express.urlencoded({extended:true})); // Using middleware to acces post data
app.use(express.json()); // for json file manipulation

const PORT = 9876; // Storing port number
const URL = "https://api.nasa.gov/planetary/apod"; // NASA api link
const API_KEY = process.env.API_KEY; // Accesing api key inside of .env

let db = {
    copyright: 'Chris Willocks',
    date: '2023-09-07',
    explanation: "The 16th century Portuguese navigator Ferdinand Magellan and his crew had plenty of time to study the southern sky during the first circumnavigation of planet Earth. As a result, two fuzzy cloud-like objects easily visible to southern hemisphere skygazers are known as the Clouds of Magellan, now understood to be satellite galaxies of our much larger, spiral Milky Way galaxy. About 160,000 light-years distant in the constellation Dorado, the Large Magellanic Cloud is seen in this sharp galaxy portrait. Spanning about 15,000 light-years or so, it is the most massive of the Milky Way's satellite galaxies and is the home of the closest supernova in modern times, SN 1987A.  The prominent patch above center is 30 Doradus, also known as the magnificent Tarantula Nebula, a giant star-forming region about 1,000 light-years across.",
    hdurl: 'https://apod.nasa.gov/apod/image/2309/TheLargeMagellanicCloud.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'The Large Cloud of Magellan',
    url: 'https://apod.nasa.gov/apod/image/2309/TheLargeMagellanicCloud1024.jpg'
  }


// home page route
app.get("/", (req, res) => {
    res.render('index', {title:"Home"})
} )

// Route to get Date
app.get("/apod/calendar", (req, res) => {
    res.render("calendar", { title:'Calendar' })
})

app.post("/apod", (req, res) => {
    const { start_date, end_date } = req.body;
    // if(start_date.length <= 0){
    //     let url = `${URL}?api_key=${API_KEY}`
    //     axios.get(url)
    //     .then((res) => {
    //         console.log(res.data);
    //     })
    //     .catch((err) => {
    //         console.log("error");
    //     })
    // }
    res.render('apods', {title:"APOD's", data:db});
})

//server listening on PORT 
app.listen(PORT, () => {
    console.log("[*] Server started");
    console.log(`[*] Visit http://localhost:${PORT}/`);
})
