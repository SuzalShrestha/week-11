// Instantiate router - DO NOT MODIFY
const express = require("express");
const router = express.Router();

// Import model(s)
const { Student, StudentClassroom, Classroom } = require("../db/models");
const { Op } = require("sequelize");

// List
router.get("/", async (req, res, next) => {
  let errorResult = { errors: [], count: 0, pageCount: 0 };

  // Phase 2A: Use query params for page & size
  // Your code here
  let { page, size } = req.query;
  //default values of page 1 and size 10
  if (page === undefined) page = 1;
  if (size === undefined) size = 10;
  //if page is not number then use default value
  if (isNaN(page)) page = 1;
  if (isNaN(size)) size = 10;

  // Phase 2B: Calculate limit and offset
  // Phase 2B (optional): Special case to return all students (page=0, size=0)
  // Phase 2B: Add an error message to errorResult.errors of
  // 'Requires valid page and size params' when page or size is invalid
  // Your code here
  //check if page and size are valid
  if (page == 0 && size == 0) {
    let newResult = {};
    let rows = await Student.findAll({
      attributes: ["id", "firstName", "lastName", "leftHanded"],
      order: [
        ["firstName", "ASC"],
        ["lastName", "ASC"],
      ],
      limit: 1000,
      offset: 0,
    });
    newResult.rows = rows;
    newResult.page = 1;
    console.log(newResult);
    res.json(newResult);
    return;
  }
  //added additional check for page and size
  if (page < 0 || size < 0 || isNaN(page) || isNaN(size)) {
    errorResult.errors.push({ message: "Requires valid page and size params" });
  }
  const limit = size;
  const offset = (page - 1) * size;

  // Phase 4: Student Search Filters
  /*
        firstName filter:
            If the firstName query parameter exists, set the firstName query
                filter to find a similar match to the firstName query parameter.
            For example, if firstName query parameter is 'C', then the
                query should match with students whose firstName is 'Cam' or
                'Royce'.

        lastName filter: (similar to firstName)
            If the lastName query parameter exists, set the lastName query
                filter to find a similar match to the lastName query parameter.
            For example, if lastName query parameter is 'Al', then the
                query should match with students whose lastName has 'Alfonsi' or
                'Palazzo'.

        lefty filter:
            If the lefty query parameter is a string of 'true' or 'false', set
                the leftHanded query filter to a boolean of true or false
            If the lefty query parameter is neither of those, add an error
                message of 'Lefty should be either true or false' to
                errorResult.errors
    */
  const where = {};

  // Your code here
  if (req.query.firstName) {
    where.firstName = {
      [Op.like]: `%${req.query.firstName}%`,
    };
  }
  if (req.query.lastName) {
    where.lastName = {
      [Op.like]: `%${req.query.lastName}%`,
    };
  }
  if (req.query.lefty === "true") {
    where.leftHanded = true;
  } else if (req.query.lefty === "false") {
    where.leftHanded = false;
  } else if (req.query.lefty !== undefined) {
    errorResult.errors.push({
      message: "Lefty should be either true or false",
    });
  }

  // Phase 2C: Handle invalid params with "Bad Request" response
  if (errorResult.errors.length > 0) {
    // Phase 3C: Include total student count in the response even if params were
    // invalid
    /*
            If there are elements in the errorResult.errors array, then
            return a "Bad Request" response with the errorResult as the body
            of the response.

            Ex:
                errorResult = {
                    errors: [{ message: 'Grade should be a number' }],
                    count: 267,
                    pageCount: 0
                }
        */
    // Your code here
    errorResult.count = await Student.count();
    errorResult.pageCount = Math.ceil(errorResult.count / size);
    res.status(400).json(errorResult);
    return;
  }
  let result = {};

  // Phase 3A: Include total number of results returned from the query without
  // limits and offsets as a property of count on the result
  // Note: This should be a new query
  const count = await Student.count({
    where,
  });
  result.count = count;

  result.rows = await Student.findAll({
    attributes: ["id", "firstName", "lastName", "leftHanded"],
    where,
    include: [
      {
        model: Classroom,
        attributes: ["id", "name"],
        through: {
          attributes: ["grade"],
        },
      },
    ],
    // Phase 1A: Order the Students search results
    order: [
      [Classroom, StudentClassroom, "grade", "DESC"],
      ["firstName", "ASC"],
      ["lastName", "ASC"],
    ],
    limit: limit,
    offset: offset,
  });

  // Phase 2E: Include the page number as a key of page in the response data
  // In the special case (page=0, size=0) that returns all students, set
  // page to 1
  /*
            Response should be formatted to look like this:
            {
                rows: [{ id... }] // query results,
                page: 1
            }
        */
  // Your code here
  if (page == 0) result.page = 1;

  // Phase 3B:
  // Include the total number of available pages for this query as a key
  // of pageCount in the response data
  // In the special case (page=0, size=0) that returns all students, set
  // pageCount to 1
  /*
            Response should be formatted to look like this:
            {
                count: 17 // total number of query results without pagination
                rows: [{ id... }] // query results,
                page: 2, // current page of this query
                pageCount: 10 // total number of available pages for this query
            }
        */
  // Your code here
  result.pageCount = Math.ceil(result.count / size);
  res.json(result);
});

// Export class - DO NOT MODIFY
module.exports = router;
