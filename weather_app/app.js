const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");

})

app.post("/",function(req,res){
    const cityName = req.body.cityName;
    const query = cityName;
    const apiKey = "413a8501498b4332ebce56aa8371b5b8";
    const celsius = "metric";

const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+celsius;
https.get(url,function(response){
    response.on("data",function(data){
       const weatherAppData= JSON.parse(data);
       console.log(weatherAppData);
          const temp = weatherAppData.main.temp;
          const weatherDescription = weatherAppData.weather[0].description;
          const icon = (weatherAppData.weather[0].icon);
          const appIcon = ("https://openweathermap.org/img/wn/"+icon+"@4x.png");
          
          
          res.write("<h1>The temperature in " +cityName+ " is "+ temp + "degree celsius</h1>");
          res.write("<p>The weather is "+ weatherDescription + "<p>");
          res.write("<img src=" + appIcon +">");
          res.send();
      })
   })
 })


app.listen(process.env.PORT || 3000,function(){
    console.log("the server is up and running");
})


