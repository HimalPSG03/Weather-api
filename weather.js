const express = require("express");
const bodyParser = require("body-parser");
const app=express();
const http = require("https");
app.use(bodyParser.urlencoded({extended:true}));
app.listen(3000,function(){
    console.log("the server is running on port 3000");
});

app.post("/",function(req,res){
    const city=req.body.c_name;
    const apiKey="18da51005c7f198059d5b703ed4f596d";
    const unit="metric";
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+city +"&appid="+ apiKey+"&units="+unit;
    http.get(url,function(response){
        response.on("data",function(data){
            const weatherResult = JSON.parse(data);
            const weatherDescription = weatherResult.weather[0].description;
            const weatherIcon= weatherResult.weather[0].icon;
            const iconUrl = "https://openweathermap.org/img/wn/"+ weatherIcon+"@2x.png"
            const temperature = weatherResult.main.temp;
            console.log(weatherDescription);
            console.log(weatherIcon);
            console.log(temperature);
            console.log(iconUrl);
            res.set("Content-Type", "text/html");
            res.write("<img src="+iconUrl+">");
            // res.write("<h1>the temperature is " + temperature +" Drgree celcius <br> Weather Description: "+weatherDescription+"</h1>");
            res.write("<h1>the temperature in "+ city+" is " + temperature +" Drgree celcius</h1>");
            res.write("<h1>Weather Description: "+weatherDescription + "</h1>");
            res.send();
        });
    });
})

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});
