import express from "express";
import Review from "../Models/review.js";
import emp from "../Models/employee.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/add", async (req, res) => {
  const review = new Review(req.body);
  await review.save();
  res.send(review);
});

router.get("/all", async (req, res) => {
  const reviews = await Review.find();
  res.send(reviews);
});

router.post("/assign", async (req, res) => {
  const { id, empId } = req.body;
  const review = await Review.findById(id);
  if (!review) {
    return res.status(404).send({ msg: "review not found" });
  }
  const alreadyAssigned = review.assigned.includes(empId);
  if (!alreadyAssigned) {
    review.assigned.push(empId);
  }

  await review.save();
  res.send(review);
});

router.get("/my/:empId", async (req, res) => {
  try {
    let empName= await emp.findOne({ name: req.params.empId }).select("name _id");
  console.log("name",empName)
    if (!empName) {
      return res.status(404).send({ msg: "employee not found" });
    }
    const reviews = await Review.find({
      assigned: {$in: [empName._id]}
    });
    console.log("hvhfhf",reviews)
    res.send(reviews);
  } catch (err) {
    res.status(500).send({ msg: "server error", error: err.message   });
  }
});
router.post("/update", async (req, res) => {
  const { id, title } = req.body;
  const review = await Review.findById(id);
  if (!review) {
    return res.status(404).send({ msg: "review not found" });
  }
  review.title = title;
  await review.save();
res.send(review);
});

router.post("/delete", async (req, res) => {
  const { id } = req.body;
  await Review.findByIdAndDelete(id);
  res.send({ msg: "review deleted" });
});

export default router;