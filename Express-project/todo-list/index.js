// Imports express
const express = require("express")

const app = express(); // Initialising express to app variable 

app.use(express.static('static')) // specifying static folder
app.use(express.urlencoded({extended:true})); //Parsing urlencoded to acces post method data
app.use(express.json()); // Parsing json to manipulate json data

app.set('view engine', 'ejs');// setting ejs as view engine

const PORT = 9876; // Assingning a port number

//Initialising mock up Database
const DATABASE = [
    { name: 'Akshay', head: 'Test', desc: 'testing my app' },
  { name: 'Kumar', head: 'test 2', desc: 'Do my home work' },
  {
    name: 'Akshay kumar s',
    head: 'hehe',
    desc: 'Do my projects'
  }
]; // Just some mock up things


// Home route
app.get("/", (req, res) => {
    const message = req.query.message;
    console.log(message);
    res.render('home', {title:'Home', msg:message})
})

// Todo add route
app.get('/todo/add', (req, res) => {
    res.render('add-todo', {title:'Add'});
})

// Todo add Post method
app.post('/todo/add', (req, res) => {
    const data = req.body;
    DATABASE.push(data);
    console.log(DATABASE);
    res.redirect('/?message=succes');
});

// Todo list show route
app.get("/todo/show", (req, res) => {
    res.render('show', {title:'Show', data:DATABASE});
});

// App listening
app.listen(PORT, () => {
    console.log("[*] Server Started listening on port "+PORT);
    console.log(`[*] Visit http://localhost:${PORT}`);
})