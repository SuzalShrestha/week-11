// Instantiate router - DO NOT MODIFY
const express = require("express");
const router = express.Router();

/**
 * BASIC PHASE 2, Step A - Instantiate SQLite and database
 *   - Database file: "data_source" environment variable
 *   - Database permissions: read/write records in tables
 */
// Your code here
const DATA_SOURCE = process.env.DATA_SOURCE;
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(DATA_SOURCE, sqlite3.OPEN_READWRITE);
router.use(express.json());

/**
 * BASIC PHASE 2, Step B - List of all trees in the database
 *
 * Protocol: GET
 * Path: /
 * Parameters: None
 * Response: JSON array of objects
 *   - Object properties: height-ft, tree, id
 *   - Ordered by the height_ft from tallest to shortest
 */
// Your code here
router.get("/", (req, res, next) => {
  const sql = "SELECT * FROM trees ORDER BY height_ft DESC";
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      next(err);
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

/**
 * BASIC PHASE 3 - Retrieve one tree with the matching id
 *
 * Path: /:id
 * Protocol: GET
 * Parameter: id
 * Response: JSON Object
 *   - Properties: id, tree, location, height_ft, ground_circumference_ft
 */
// Your code here
router.get("/:id", (req, res, next) => {
  const sql = "SELECT * FROM trees WHERE id = ?";
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      next(err);
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});
/**
 * INTERMEDIATE PHASE 4 - INSERT tree row into the database
 *
 * Path: /trees
 * Protocol: POST
 * Parameters: None
 * Response: JSON Object
 *   - Property: message
 *   - Value: success
 */
// Your code here
router.post("/", (req, res, next) => {
  const sql =
    "INSERT INTO trees (name,location,height_ft,ground_circumference_ft) VALUES (?,?,?,?)";
  const params = [
    req.body.name,
    req.body.location,
    req.body.height,
    req.body.size,
  ];
  db.run(sql, params, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
      next(err);
      return;
    }
    res.json({
      message: "success",
      data: req.body,
      id: this.lastID,
    });
  });
});
/**
 * INTERMEDIATE PHASE 5 - DELETE a tree row from the database
 *
 * Path: /trees/:id
 * Protocol: DELETE
 * Parameter: id
 * Response: JSON Object
 *   - Property: message
 *   - Value: success
 */
// Your code here
router.delete("/:id", (req, res, next) => {
  const sql = "DELETE FROM trees WHERE id = ?";
  const params = [req.params.id];
  db.run(sql, params, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
      next(err);
      return;
    }
    res.json({
      message: "success",
      data: req.body,
    });
  });
});

/**
 * INTERMEDIATE PHASE 6 - UPDATE a tree row in the database
 *
 * Path: /trees/:id
 * Protocol: PUT
 * Parameter: id
 * Response: JSON Object
 *   - Property: message
 *   - Value: success
 */
// Your code here
router.put("/:id", (req, res, next) => {
  const sql =
    "UPDATE trees SET name = ?,location = ?,height_ft = ?,ground_circumference_ft = ? WHERE id = ?";
  const params = [
    req.body.name,
    req.body.location,
    req.body.height,
    req.body.size,
    req.params.id,
  ];
  db.run(sql, params, (err) => {
    if (err) {
      res.status(400).json({ error: "ids don't match" });
      next(err);
      return;
    }
    res.json({
      message: "success",
      data: req.body,
    });
  });
});

// Export class - DO NOT MODIFY
module.exports = router;
