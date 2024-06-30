const express = require("express");
const http = require("http");
const userAuth = require("./routes/userAuth");
const mongoose = require("mongoose");
require("dotenv").config();
const socket = require("socket.io");

mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log("[*] Database connection succes");
})
.catch( (err) => {
    console.log("[*] Database connection failed ", err);
})

// app initialised
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use('/user', userAuth);

/* chat section starts */

// initiated http server for socket
const server = http.createServer(app);

const io = socket( // socket initialisation
    server,
    {
        pingTimeout:6000,
        cors:{
            origin:'http://localhost:3000'
        }
    }
);




/* chat section closes */
server.listen(9876, () => {
    console.log("[*] Server started ");
    console.log("[*] http://localhost:9876/");
});
