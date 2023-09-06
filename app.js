const express = require("express")
const app = express();
// const bodyparser = require("body-parser")
const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ContactDance');

}
const port = 80;
const path = require("path");
// Express specfic stuff
app.use("/static", express.static("static"));
app.use(express.urlencoded());
const newSchema = new mongoose.Schema({
   name: String,
   phone: String,
   email: String,
   age: String,
   query: String
 });
const contact1 = mongoose.model('contact1', newSchema);

// const myData = new contact1(req.body);
// console.log(myData)

// Pug specific stuff
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.get("/", (req, res)=>{
   res.status(200).render("home.pug")
})

app.get("/contact", (req, res)=>{
   res.status(200).render("contact.pug")
})
app.post("/contact", (req, res)=>{
   const myData = new contact1(req.body);
   myData.save().then(()=>{
      res.send("Your data has been stored succesfully")
   }).catch(()=>{
      res.status(404).send("Your data has not been saved")   })
})

app.listen(port, () => {
   console.log(`This page started succesfully on port ${port}`)
})