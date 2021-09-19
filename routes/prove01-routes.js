const express = require('express');
const fs = require('fs');
const router = express.Router();

users = [];

router.get("/", (req, res, next) => {
    fs.readFile("./routes/users.json", (err, raw) => {
        console.log(raw);
        result = JSON.parse(raw);
        console.log(result);
        
        res.render('pages/prove01/index', {
            title: "Prove 01",
            path: "/",
            usernames: result.users});
    })
})

router.post("/users", (req, res, next) => {
    fs.readFile("./routes/users.json", (err, raw) => {
        input = JSON.parse(raw);

        for (let i = 0; i < input.users.length; i++) {
            if (req.body.username === input.users[i].name) {
                res.redirect('/');
                return;
            }
        }

        input.users.push({name:req.body.username});
        console.log(input);

        fs.writeFile("./routes/users.json", JSON.stringify(input), (err) => {
            res.redirect('/');
            
        })
    })
})

module.exports = router;