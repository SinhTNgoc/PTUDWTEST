let controller = {};
let models = require("../models");
let Recipe = models.Recipe;
let Sequelize = require("sequelize");
let Op = Sequelize.Op;
controller.getAll = () => {
  return new Promise((resolve, reject) => {
    Recipe.findAll({
      include: [{ model: models.Ingredient }],
    })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => reject(new Error(err)));
  });
};
controller.getRecipe = (query) => {
  return new Promise((resolve, reject) => {
    let options = {
      attributes: [
        "id",
        "title",
        "smallImagePath",
        "bigImagePath",
        "summary",
        "description",
      ],
      where: {},
    };
    if (query.search != "") {
      // title LIKE '%query.search%' OR description LIKE '%query.search%'
      options.where = {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${query.search}%`,
            },
          },
          {
            description: { [Op.iLike]: `%${query.search}%` },
          },
        ],
      };
    }
    Recipe.findAll(options)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => reject(new Error(error)));
  });
};
controller.getById = (id) => {
  return new Promise((resolve, reject) => {
    Recipe.findOne({
      where: { id: id },
      include: [
        { model: models.Ingredient },
        {
          model: models.Direction,
        },
      ],
      order: [[models.Direction, "order", "ASC"]],
    })
      .then((result) => {
        resolve(result);
        res.render(featured);
      })
      .catch((error) => reject(new Error(error)));
  });
};
module.exports = controller;
