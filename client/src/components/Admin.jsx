import { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [empList, setEmpList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [empName, setEmpName] = useState("");
  const [editEmpId, setEditEmpId] = useState("");
  const [editEmpName, setEditEmpName] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [editReviewId, setEditReviewId] = useState("");
  const [editReviewTitle, setEditReviewTitle] = useState("");
  const [selectedReview, setSelectedReview] = useState("");
  const [feedbackData, setFeedbackData] = useState({});

  useEffect(() => {
    getData();
  }, []);

  // get all data
  const getData = async () => {
    let e = await axios.get("http://localhost:4000/emp/all");
    setEmpList(e.data);

    let reviewData = await axios.get("http://localhost:4000/review/all");
    setReviewList(reviewData.data);
  };

  // add employee
  const addEmp = async () => {
    if (!empName) return;

    await axios.post("http://localhost:4000/emp/add", {
      name: empName,
      email: empName + "@mail.com"
    });

    setEmpName("");
    getData();
  };

  const deleteEmp = async (id) => {
    await axios.post("http://localhost:4000/emp/delete", { id });
    getData();
  };

  const editEmp = (e) => {
    setEditEmpId(e._id);
    setEditEmpName(e.name);
  };

  const updateEmp = async () => {
    if (!editEmpId) return;

    await axios.post("http://localhost:4000/emp/update", {
      id: editEmpId,
      name: editEmpName
    });

    setEditEmpId("");
    setEditEmpName("");
    getData();
  };

  const addReview = async (empId) => {
    if (!reviewTitle) return;

    await axios.post("http://localhost:4000/review/add", {
      title: reviewTitle,
      employeeId: empId,
      assigned: []
    });

    setReviewTitle("");
    getData();
  };

  const deleteReview = async (id) => {
    await axios.post("http://localhost:4000/review/delete", { id });
    getData();
  };

  const editReview = (r) => {
    setEditReviewId(r._id);
    setEditReviewTitle(r.title);
  };

  const updateReview = async () => {
    await axios.post("http://localhost:4000/review/update", {
      id: editReviewId,
      title: editReviewTitle
    });

    setEditReviewId("");
    setEditReviewTitle("");
    getData();
  };

  const assignEmp = async (reviewId, empId) => {
    await axios.post("http://localhost:4000/review/assign", {
      id: reviewId,
      empId: empId
    });

    getData();
  };

  const loadFeedback = async (reviewId) => {
    let res = await axios.get(
      "http://localhost:4000/feedback/review/" + reviewId
    );

    setFeedbackData({
      ...feedbackData,
      [reviewId]: res.data
    });

    setSelectedReview(reviewId);
  };

  const getName = (id) => {
    let e = empList.find((x) => x._id === id);
    return e ? e.name : "unknown";
  };

  return (
    <div>
      <h3>Admin</h3>
      <input
        placeholder="Add Employee"
        value={empName}
        onChange={(e) => setEmpName(e.target.value)}
      />
      <button onClick={addEmp}>add</button>
      {empList.map((e) => (
        <div key={e._id}>
          {e.name}
          <button onClick={() => editEmp(e)}>edit</button>
          <button onClick={() => deleteEmp(e._id)}>delete</button>
        </div>
      ))}
      <input
        placeholder="update employee name"
        value={editEmpName}
        onChange={(e) => setEditEmpName(e.target.value)}
      />
      <button onClick={updateEmp}>update</button>
      <hr />
      <input
        placeholder="review title"
        value={reviewTitle}
        onChange={(e) => setReviewTitle(e.target.value)}
      />
      {empList.map((e) => (
        <div key={e._id}>
          {e.name}
          <button onClick={() => addReview(e._id)}>add review</button>
        </div>
      ))}
      <hr />
      {reviewList.map((r) => (
        <div key={r._id} style={{ border: "1px solid black", margin: 10 }}>
          <p>{r.title}</p>
          <p>owner: {getName(r.employeeId)}</p>
          <button onClick={() => editReview(r)}>edit</button>
             <button onClick={() => deleteReview(r._id)}>delete</button>
          <button onClick={() => loadFeedback(r._id)}>feedback</button>
          {empList.map((e) => {
            if (e._id === r.employeeId) return null;
            return (
              <button key={e._id} onClick={() => assignEmp(r._id, e._id)}>
                Assign To: {e.name}
              </button>
            );
          })}

              {selectedReview === r._id && (
            <div>
               {(feedbackData[r._id] || []).map((f) => (
                <p key={f._id}>
                  {f.text} - {f.fromEmp?.name}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}

      <input
        placeholder="update review"
        value={editReviewTitle}
        onChange={(e) => setEditReviewTitle(e.target.value)}
      />
      <button onClick={updateReview}>update</button>

      <br />
      <button onClick={getData}>refresh</button>
    </div>
  );
}

export default Admin;