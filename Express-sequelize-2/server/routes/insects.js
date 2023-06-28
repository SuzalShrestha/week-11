// Instantiate router - DO NOT MODIFY
const express = require("express");
const router = express.Router();

/**
 * INTERMEDIATE BONUS PHASE 2 (OPTIONAL) - Code routes for the insects
 *   by mirroring the functionality of the trees
 */
// Your code here
const { Insect, Tree } = require("../db/models");
const { Op } = require("sequelize");
router.get("/", async (req, res, next) => {
  let insects = [];

  // Your code here
  const data = await Insect.findAll({
    attributes: [
      "id",
      "name",
      "description",
      "fact",
      "territory",
      "millimeters",
    ],
    order: [["millimeters", "ASC"]],
  });
  insects = data.map((item) => item.dataValues);

  res.json(insects);
});
router.get("/:id", async (req, res, next) => {
  let insect;

  try {
    // Your code here
    const data = await Insect.findByPk(req.params.id);
    data ? (insect = data.dataValues) : (insect = null);

    if (insect) {
      res.json(insect);
    } else {
      next({
        name: "Error",
        message: "Insect not found",
      });
    }
  } catch (err) {
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  let insect;

  try {
    // Your code here
    const data = await Insect.create({
      name: req.body.name,
      description: req.body.description,
      fact: req.body.fact,
      territory: req.body.territory,
      millimeters: req.body.millimeters,
    });
    data ? (insect = data.dataValues) : (insect = null);

    if (insect) {
      res.status(201).json(insect);
    } else {
      next({
        name: "Error",
        message: "Insect not created",
      });
    }
  } catch (err) {
    next(err);
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    // Your code here
    const { id, name, description, fact, territory, millimeters } = req.body;
    const insect = await Insect.findByPk(req.params.id);
    if (req.params.id != id) {
      next({
        status: "error",
        message: `Could not update insect`,
        details: `${req.params.id} does not match ${id}`,
      });
    } else {
      if (!insect) {
        next({
          status: "not-found",
          message: `Could not update insect ${req.params.id}`,
          details: "Insect not found",
        });
      }
      await Insect.update(
        {
          name: name,
          description: description,
          fact: fact,
          territory: territory,
          millimeters: millimeters,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.json({
        status: "success",
        message: "Successfully updated insect",
        data: insect,
      });
    }
  } catch (err) {
    next({
      status: "error",
      message: "Could not update new insect",
      details: err.errors
        ? err.errors.map((item) => item.message).join(", ")
        : err.message,
    });
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    // Your code here
    const data = await Insect.findByPk(req.params.id);
    if (data) {
      await data.destroy();
    } else {
      next({
        status: "not-found",
        message: `Could not remove insect ${req.params.id}`,
        details: "Insect not found",
      });
    }

    res.json({
      status: "success",
      message: `Successfully removed insect ${req.params.id}`,
    });
  } catch (err) {
    next({
      status: "error",
      message: `Could not remove insect ${req.params.id}`,
      details: err.errors
        ? err.errors.map((item) => item.message).join(", ")
        : err.message,
    });
  }
});
router.get("/search/:name", async (req, res, next) => {
  let insect;
  try {
    // Your code here
    const data = await Insect.findAll({
      where: {
        name: {
          [Op.like]: `%${req.params.name}%`,
        },
      },
    });
    insect = data.map((item) => item.dataValues);

    if (insect) {
      res.json(insect);
    } else {
      next({
        name: "Error",
        message: "Insect not found",
      });
    }
  } catch (err) {
    next(err);
  }
});
// Export class - DO NOT MODIFY
module.exports = router;
