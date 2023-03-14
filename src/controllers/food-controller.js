const { Ingredient } = require("../models");
exports.getTable = async (req, res, next) => {
  const { foodId } = req.params;
  try {
    const table = await Ingredient.findAll({
      where: { foodId: +foodId },
    });
    res.status(200).json({ table });
  } catch (err) {
    next(err);
  }
};
