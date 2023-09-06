//importing modules
const express = require("express");

const PORT = 9876; // declaring port in a variable

const app = express(); //declaring express instance

app.use(express.urlencoded( { extended:true } )); //Apllying urlencoder as middleware for opst data acces 
app.use(express.json()); // for json manipulation

app.set('view engine', 'ejs'); // Setting View engine to EJS
app.use(express.static('static')); // Setting static folder

//just a variable to store image url
const image_path = "https://api.time.com/wp-content/uploads/2023/03/Worlds-Greatest-Places-Barcelona-Spain.jpg";
// for easier acces assigning blog to a variable
const blog = "The moment I stepped off the plane at El Prat Airport, I could feel the excitement in the air. Barcelona is known for its stunning architecture, and my first stop was the iconic Sagrada Familia. Antoni Gaudi's masterpiece is a breathtaking work of art both inside and out.";

// a db like thing
const db = [
    {
        name:'Akshay Kumar',
        heading:"Travelling Coutries",
        topic:'Travel Blogg',
        subject: blog,
        img:image_path
    },
    {
        name:'Akshay Kumar S',
        heading:"Travelling to  Coutries",
        topic:'Travel Blogg',
        subject:blog,
        img:image_path
    },
    {
        name:'Akshay Kumar',
        heading:"Journey to Coutries",
        topic:'Travel Blogg',
        subject:blog,
        img:image_path
    },
    {
        name:'Akshay Kumar',
        heading:"Travellers life",
        topic:'Travel Blogg',
        subject:blog,
        img:image_path
    },
    {
        name:'Akshay Kumar',
        heading:"Travelling Coutries",
        topic:'Travel Blogg',
        subject:blog,
        img:image_path
    },
    {
        name:'Arya Pradeep',
        heading:"Beauty of Coutries",
        topic:'Travelling Bloggs',
        subject:blog,
        img:image_path
    }
]


// Home Page
app.get('/', (req, res) => {
    const message = req.query.message;
    res.render('index', { title:'Home', msg:message });
})

// blog show route
app.get("/blogs/show", (req, res) => {
    res.render('show', {title:'Show', data:db})
})

// blog add route
app.get("/blogs/add", (req, res) => {
    res.render('blog-add', {title:'Add'})
})

app.post('/blogs/add', (req, res) => {
    let data = req.body;
    data['img'] = image_path; // adding image path
    db.push(data);
    res.redirect("/?message=sucess"); // redirection with messaging
})

// express listening for request and setting a call back function
app.listen(PORT, () => {
   console.log("[*] Site On service on Port " + PORT);
   console.log(`[*] Visit http://localhost:${PORT}/`); // Just printing site url 
});