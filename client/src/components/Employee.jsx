import React, { useState } from "react";
import axios from "axios";

function Employee() {
  const [employeeId, setEmployeeId] = useState("");
  const [reviews, setReviews] = useState([]);
  const [feedbackByReviewId, setFeedbackByReviewId] = useState({});

  const loadAssignedReviews = async () => {
    if (!employeeId.trim()) return;
    const response = await axios.get(`http://localhost:4000/review/my/${employeeId}`);
    setReviews(response.data);
  };

  const submitFeedback = async (reviewId) => {
    const message = feedbackByReviewId[reviewId] || "";
    if (!message.trim()) return;

    await axios.post("http://localhost:4000/feedback/add", {
      reviewId,
      fromEmp: employeeId,
      text: message
    });

    setFeedbackByReviewId((currentMap) => ({
      ...currentMap,
      [reviewId]: ""
    }));
  };

  return (
    <div>
      <h3>Employee View</h3>

      <input
        placeholder="enter your Name"
        value={employeeId}
        onChange={(event) => setEmployeeId(event.target.value)}
      />
      <button onClick={loadAssignedReviews}>load assigned reviews</button>

      {reviews.map((review) => (
        <div key={review._id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
          <p>{review.title}</p>

          <input
            placeholder="write your feedback"
            value={feedbackByReviewId[review._id] || ""}
            onChange={(event) =>
              setFeedbackByReviewId((currentMap) => ({
                ...currentMap,
                [review._id]: event.target.value
              }))
            }
          />
          <button onClick={() => submitFeedback(review._id)}>submit feedback</button>
        </div>
      ))}
    </div>
  );
}

export default Employee;
