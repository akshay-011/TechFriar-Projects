const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const router = require('express').Router();


router.post('/signup', async (req, res) => {
    const { name, username, password, phoneNumber  } = req.body;
    if(!(name || username || password || phoneNumber)){
        res.status(422).send("data incomplete");
    }

    // generating salt
    const salt = await bcrypt.genSalt();
    // hashing password
    console.log(password, salt);
    const newPassword = await bcrypt.hash(password, salt);

    console.log("[*] User set " + username + `${password} ${newPassword}`);

    userModel.create({
        name:name,
        username:username,
        phoneNumber:phoneNumber,
        password:newPassword
    })
    .then((user) => {
        res.status(200).send(user);
    })
    .catch((err) => {
        console.log(err);
        return res.send("errr ");
    })
})

//login route
router.post("/login", async (req, res) => {
    const { phoneNumber, password } = req.body;

    if(!(phoneNumber || password)){
        return res.status(422).send();
    }

    // finding user 
    const user = await userModel.findOne({ phoneNumber:phoneNumber });
    if(!user){
        return res.status(404).send("user not found");
    }

    const result = await bcrypt.compare(password, user.password);
    if(!result){
        return res.status(400).send("invalid password");
    }
    else{
        user.password = " "
        res.status(200).send(user);
    }
});


// export the router
module.exports = router;