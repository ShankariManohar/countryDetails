const path = require('path');
const express = require("express");
const axios=require("axios");


const PORT = process.env.PORT || 3002;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from World!" });
});

app.get("/countryList", async(req,res) => {
  try{
    const response = await axios.get("https://restcountries.com/v2/all");
    res.json(response.data);
  }
  catch(err){
    console.log("CountryList"+err);
  }
});


app.get("/search", async(req,res)=>{
  console.log("search");
  try{
    const response = await axios.get("https://restcountries.com/v2/name/"+req.name+"?fullText=true");
    res.json(response.json);
  }
  catch(err){
    console.log("Search"+ err)
  }
})


// All other GET requests not handled before will return our React app
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});