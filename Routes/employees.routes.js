const express = require("express");
const Employees = require("../Models/employees.model");

const router = express.Router();

router.get("/employees", (request, response) => {
  try {
    Employees.find((err, data) => {
      if (err) {
        return response
          .status(400)
          .send({
            message: "Error while retrieving employees. Please check the data",
          });
      }
      response.status(200).send(data);
    });
  } catch (error) {
    response.status(500).send({
      message: "Internal Server Error",
    });
  }
});

router.get("/employees/:empID", (request, response) => {
  try {
    Employees.findOne({ _id: request.params.empID }, (err, data) => {
      if (err) {
        return response
          .status(400)
          .send({
            message:
              "Error while retrieving an employee. Please check the data",
          });
      }
      response.status(200).send(data);
    });
  } catch (error) {
    response.status(500).send({
      message: "Internal Server Error",
    });
  }
});

router.post("/employees", async (request, response) => {
  try {
    const payload = request.body;
    const newEmployee = new Employees(payload);

    await newEmployee.save((err, data) => {
      if (err) {
        return response
          .status(400)
          .send({
            message: "Error while adding new employee. Please check the data",
          });
      }
      response
        .status(201)
        .send({
          employeeId: data._id,
          message: "Employee has been added successfully.",
        });
    });
  } catch (error) {
    response.status(500).send({
      message: "Internal Server Error",
    });
  }
});

router.put("/employees/:empID", (request, response) => {
  try {
    Employees.findByIdAndUpdate(
      { _id: request.params.empID },
      { $set: request.body },
      (err, data) => {
        if (err) {
          return response
            .status(400)
            .send({
              message:
                "Error while updating an existing user. Please check the data",
            });
        }
        response
          .status(201)
          .send({
            employeeId: data._id,
            message: "Employee details have been updated.",
          });
      }
    );
  } catch (error) {
    response.status(500).send({
      message: "Internal Server Error",
    });
  }
});

router.delete("/employees/:empID", (request, response) => {
  try {
    Employees.deleteOne({ _id: request.params.empID }, (err, data) => {
      if (err) {
        return response
          .status(400)
          .send("Error while deleting an employee. Please check the data");
      }
      response
        .status(200)
        .send({
          message: `Employee with id ${request.params.empID} has been deleted.`,
        });
    });
  } catch (error) {
    response.status(500).send({
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
