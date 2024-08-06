import React, { useEffect, useState } from "react";
import "./Contact.css";
const Contact = () => {
  const [info, setInfo] = useState({
    fullName: "",
    email: "",
    dob: "",
    qualification: "",
  });
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("formValues")) || []
  );
  const [isEdit, setEdit] = useState(false);
  const [errors, setErros] = useState({
    fullName: "",
    email: "",
    dob: "",
    qualification: "",
  });
  //   const fetchData = () => {
  //     const userInfo = JSON.parse(localStorage.getItem("formValues")) || [];
  //     debugger;
  //     setList(userInfo);
  //   };

  useEffect(() => {
    // fetchData();

    localStorage.setItem("formValues", JSON.stringify(list));
  }, [list]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = (index) => {
    debugger;
    const newList = [...list];
    const res = newList.splice(index, 1);
    setList(newList);
  };

  const handleEditMode = (i) => {
    const formdata = list.find((item, index) => index == i);
    debugger;
    setInfo({
      fullName: formdata.fullName,
      email: formdata.email,
      dob: formdata.dob,
      qualification: formdata.qualification,
    });

    setEdit(true);
  };
  console.log(list);
  console.log(isEdit);
  const handleSubmit = (e) => {
    if (isEdit) {
      const res = list.map((item) =>
        item.email === info.email
          ? {
              fullName: info.fullName,
              email: info.email,
              dob: info.dob,
              qualification: info.qualification,
            }
          : item
      );
      setList(res);
      setInfo({
        fullName: "",
        email: "",
        dob: "",
        qualification: "",
      });
      localStorage.setItem("formData", list);
    } else {
      e.preventDefault();

      setList([...list, info]);
      setInfo({
        fullName: "",
        email: "",
        dob: "",
        qualification: "",
      });
      localStorage.setItem("formData", list);
    }
    setEdit(false);
  };
  console.log(list);
  return (
    <div>
      <div>
        <h1>Contact Form</h1>
        <div className="parent">
          <form onSubmit={handleSubmit} className="form">
            <div className="formData">
              <label>Full Name:</label>
              <input
                type="text"
                value={info.fullName}
                name="fullName"
                onChange={handleFormChange}
              />
            </div>
            <div className="formData">
              <label>Email:</label>
              <input
                type="email"
                value={info.email}
                name="email"
                disabled={isEdit}
                onChange={handleFormChange}
              />
            </div>
            <div className="formData">
              <label>Date Of Birth:</label>
              <input
                type="date"
                value={info.dob}
                name="dob"
                onChange={handleFormChange}
              />
            </div>
            <div className="formData">
              <label>Qualification:</label>
              <input
                type="text"
                value={info.qualification}
                name="qualification"
                onChange={handleFormChange}
              />
            </div>
          </form>
          <button onClick={handleSubmit} className="submit">
            Submit
          </button>
        </div>
      </div>
      <h1 style={{ margin: "12px" }}>Contact Information:</h1>
      <div className="contactInfo">
        {list.length === 0 ? (
          <h3>No Contact List Available</h3>
        ) : (
          //   list.map((item, index) => (
          //     <div key={index} className="card">
          //       <section>
          //         <article>Name: {item?.fullName}</article>
          //         <article>Email: {item?.email}</article>
          //         <article>DOB:{item?.dob}</article>
          //         <article>Qualification:{item?.qualification}</article>
          //       </section>
          //       <button onClick={() => handleDelete(index)}>Remove</button>
          //       <button onClick={() => handleEditMode(index)}>Edit</button>
          //     </div>
          //   ))
          <table id="customers">
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>DOB</th>
                <th>Qualification</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((rowData, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{rowData.fullName}</td>
                  <td>{rowData.email}</td>
                  <td>{rowData.dob}</td>
                  <td>{rowData.qualification}</td>
                  <td>
                    <button onClick={() => handleDelete(index)}>Remove</button>
                    <button onClick={() => handleEditMode(index)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Contact;
