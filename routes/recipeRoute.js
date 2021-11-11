let express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/recipes", (req, res, next) => {
  if (req.query.search == null || req.query.search.trim() == "") {
    req.query.search = "";
  }
  if (req.query.search != "") {
    let recipeRoute = require("../controllers/recipeController");
    recipeRoute
      .getRecipe(req.query)
      .then((data) => {
        res.locals.recipes = data;
        // console.log(data);
        res.render("recipes");
      })
      .catch((err) => next(err));
  } else {
    let recipeRoute = require("../controllers/recipeController");
    recipeRoute
      .getAll()
      .then((data) => {
        // console.log(data);
        for (let i = 0; i < data.length; i++) {
          data[i].Ingredients = "";
          i++;
        }
        res.locals.allRecipes = data;
        res.render("recipes");
      })
      .catch((err) => next(err));
  }
});
router.get("/recipes/:id", (req, res, next) => {
  let recipeRoute = require("../controllers/recipeController");
  recipeRoute
    .getById(req.params.id)
    .then((recipe) => {
      // console.log(recipe);
      res.locals.featured = recipe;
      res.render("featured");
    })
    .catch((err) => next(err));
});

module.exports = router;
