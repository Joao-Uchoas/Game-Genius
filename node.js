const express = require("express");

const exp = express();

exp.get("/", function(req, res) {
    res.sendFile(__dirname + "/html/index.html");
});

exp.listen(8080, function(){
    console.log("Servidor rodando na porta 8080 !");
});