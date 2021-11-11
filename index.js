let express = require("express");
let app = express();

//Static file
app.use(express.static(__dirname + "/public"));

//use view engine handlebars
let expressHbs = require("express-handlebars");
let helper = require("./controllers/helper");
let hbs = expressHbs.create({
  extname: "hbs",
  defaultLayout: "layout",
  layoutsDir: __dirname + "/views/layouts",
  partialsDir: __dirname + "/views/partials",
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
  },
  helpers: {
    Condition: helper.Condition,
   
  },
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");



// Create DB
app.get("/sync", (req, res) => {
  let models = require("./models");
  models.sequelize.sync().then(() => {
    res.send("Database sync completed !");
  });
}); 
//Define your roots here
app.use("/",require("./routes/recipeRoute"));
app.use("/recipes", require("./routes/recipeRoute"));
app.use("/recipes/:id", require("./routes/recipeRoute"));

// app.get("/recipes",(req, res) => {
//   res.render("recipes");
// })
// app.get("/recipes:/id",(req, res) => {
//   res.render("featured");
// })
// app.get("/featured",(req, res) => {
//   res.render("featured");
// })



// Set Server port
app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log(`Server is running at port ${app.get("port")}`);
});
