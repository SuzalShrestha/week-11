// Instantiate router - DO NOT MODIFY
const express = require("express");
const router = express.Router();

// Import model(s)
const {
  Classroom,
  Supply,
  StudentClassroom,
  Student,
} = require("../db/models");
const { Op } = require("sequelize");
const sequelize = require("sequelize");

// List of classrooms
router.get("/", async (req, res, next) => {
  let errorResult = { errors: [], count: 0, pageCount: 0 };

  // Phase 6B: Classroom Search Filters
  /*
        name filter:
            If the name query parameter exists, set the name query
                filter to find a similar match to the name query parameter.
            For example, if name query parameter is 'Ms.', then the
                query should match with classrooms whose name includes 'Ms.'

        studentLimit filter:
            If the studentLimit query parameter includes a comma
                And if the studentLimit query parameter is two numbers separated
                    by a comma, set the studentLimit query filter to be between
                    the first number (min) and the second number (max)
                But if the studentLimit query parameter is NOT two integers
                    separated by a comma, or if min is greater than max, add an
                    error message of 'Student Limit should be two integers:
                    min,max' to errorResult.errors
            If the studentLimit query parameter has no commas
                And if the studentLimit query parameter is a single integer, set
                    the studentLimit query parameter to equal the number
                But if the studentLimit query parameter is NOT an integer, add
                    an error message of 'Student Limit should be a integer' to
                    errorResult.errors 
    */
  const where = {};

  // Your code here
  if (req.query.name) {
    where.name = {
      [Op.like]: `%${req.query.name}%`,
    };
  }
  if (req.query.studentLimit) {
    if (req.query.studentLimit.includes(",")) {
      const [min, max] = req.query.studentLimit.split(",");
      if (min && max && !isNaN(min) && !isNaN(max)) {
        where.studentLimit = {
          [Op.between]: [min, max],
        };
      } else {
        errorResult.errors.push(
          "Student Limit should be two integers: min,max"
        );
      }
    } else {
      if (!isNaN(req.query.studentLimit)) {
        where.studentLimit = req.query.studentLimit;
      } else {
        errorResult.errors.push("Student Limit should be a integer");
      }
    }
  }

  const classrooms = await Classroom.findAll({
    attributes: [
      "id",
      "name",
      "studentLimit",
      "createdAt",
      "updatedAt",
      [
        sequelize.fn("AVG", sequelize.col("StudentClassrooms.grade")),
        "averageGrade",
      ],
      [
        sequelize.fn("COUNT", sequelize.col("StudentClassrooms.id")),
        "numStudents",
      ],
    ],
    where,
    //agreegate function
    include: [
      {
        model: StudentClassroom,
        attributes: [],
      },
    ],
    group: ["Classroom.id"],
    // Phase 1B: Order the Classroom search results
    order: [["name", "ASC"]],
    raw: true,
  });
  res.json(classrooms);
});

// Single classroom
router.get("/:id", async (req, res, next) => {
  let classroom = await Classroom.findByPk(req.params.id, {
    attributes: ["name", "studentLimit"],
    // Phase 7:
    // Include classroom supplies and order supplies by category then
    // name (both in ascending order)
    // Include students of the classroom and order students by lastName
    // then firstName (both in ascending order)
    // (Optional): No need to include the StudentClassrooms
    // Your code here
    raw: true,
  });

  if (!classroom) {
    res.status(404);
    res.send({ message: "Classroom Not Found" });
  }

  // Phase 5: Supply and Student counts, Overloaded classroom
  // Phase 5A: Find the number of supplies the classroom has and set it as
  // a property of supplyCount on the response
  // Phase 5B: Find the number of students in the classroom and set it as
  // a property of studentCount on the response
  // Phase 5C: Calculate if the classroom is overloaded by comparing the
  // studentLimit of the classroom to the number of students in the
  // classroom
  // Optional Phase 5D: Calculate the average grade of the classroom
  // Your code here
  classroom.supplyCount = await Supply.count({
    where: {
      classroomId: req.params.id,
    },
    raw: true,
  });
  classroom.studentCount = await StudentClassroom.count({
    where: {
      classroomId: req.params.id,
    },
    raw: true,
  });
  classroom.overloaded = classroom.studentCount > classroom.studentLimit;
  classroom.averageGrade = await StudentClassroom.findOne({
    attributes: [[sequelize.fn("AVG", sequelize.col("grade")), "averageGrade"]],
    where: {
      classroomId: req.params.id,
    },
  });
  classroom.supplies = await Supply.findAll({
    attributes: ["name", "category"],
    where: {
      classroomId: req.params.id,
    },
    order: [
      ["category", "ASC"],
      ["name", "ASC"],
    ],
    raw: true,
  });
  const students = await StudentClassroom.findAll({
    include: [
      {
        model: Student,
        attributes: ["firstName", "lastName"],
      },
      {
        model: Classroom,
        attributes: [],
        where: {
          id: req.params.id,
        },
      },
    ],
    attributes: [],
  });
  classroom.students = students.map((student) => student.Student);

  res.json(classroom);
});

// Export class - DO NOT MODIFY
module.exports = router;
