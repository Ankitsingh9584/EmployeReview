import express from "express";
import Emp from "../Models/employee.js";

const router = express.Router();

router.get("/all", async (req, res) => {
  const employees = await Emp.find();
  res.send(employees);
});

router.post("/add", async (req, res) => {
  const employee = new Emp(req.body);
  await employee.save();
  res.send(employee);
});

router.post("/update", async (req, res) => {
  const { id, name, email } = req.body;
  const employee = await Emp.findById(id);

  if (!employee) {
    return res.status(404).send({ msg: "employee not found" });
  }

  if (name) {
    employee.name = name;
  }
  if (email) {
    employee.email = email;
  }

  await employee.save();
  res.send(employee);
});

router.post("/delete", async (req, res) => {
  const { id } = req.body;
  await Emp.findByIdAndDelete(id);
  res.send({ msg: "employee deleted" });
});

export default router;