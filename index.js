// import express, body-parser 
const express = require("express");
const bodyParser = require("body-parser");
const { listBankController,
    updateBankController,
    createBankController,
    deleteBankController,
    createAccountController, 
    listAccountController} = require("./controllers");
const mongoose = require('mongoose');


//create an instance of express
const server = express();

//middlewares
server.use(bodyParser.json());


//routes 
//view banks - get method
server.get('/bank/:id?', listBankController);
//create banks - post method
server.post('/bank', createBankController);
//update banks - put method 
server.put('/bank', updateBankController);
// //delete banks - delete method
server.delete('/bank', deleteBankController);

//server for related accounts
server.post('/account', createAccountController);

//get related accounts
server.get('/accounts', listAccountController);


//connect to database and start server
mongoose.connect("mongodb+srv://codetrainUser:Z16ipm5T9lSrBRSP@cluster0.vhqaz.mongodb.net/codetrain?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(result => {
        server.listen(3000, () => console.log("server is ready"))
    })
    .catch(err => console.log(err))
