import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContent } from "../App";
import "./style.css";

const Update = () => {
  const { id } = useParams();
  const [account, setAccount] = useState({
    id: id,
    image: "",
    name: "",
    Year: "",
    type: "",
    description: "", // Thêm trường description
    score: 0,
    typeID: "",
  });

  const [idGlobal, setIdGlobal] = useState(id);
  const { setUser } = useContext(UserContent);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:9999/movies/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setAccount(res);
      });
  }, [id]);

  const handleLogin = (event) => {
    event.preventDefault();
    let newStudent = {
      id: account.id,
      image: account.image,
      name: account.name,
      Year: account.Year,
      type: account.type,
      description: account.description, // Thêm trường description
      score: account.score,
      typeID: account.typeID,
    };

    fetch(`http://localhost:9999/movies/${idGlobal}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    })
      .then((res) => res.json())
      .then((res) => {
        setAccount(account);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        window.alert("Cannot update account!");
      });
  };

  return (
    <div className="wrapper">
      <form className="form-signin" onSubmit={handleLogin}>
        <h2 className="form-signin-heading">Update New Movies</h2>
        <input
          type="text"
          value={account.image}
          className="form-control"
          onChange={(e) => {
            setAccount({ ...account, image: e.target.value });
          }}
          placeholder="images"
          required
          autoFocus
        />
        <br></br>

        <input
          type="text"
          value={account.name}
          onChange={(e) => {
            setAccount({ ...account, name: e.target.value });
          }}
          className="form-control"
          placeholder="Name"
          required
        />
        <br></br>

        <input
          type="date"
          value={account.Year}
          className="form-control"
          onChange={(e) => {
            setAccount({ ...account, Year: e.target.value });
          }}
          placeholder="Year"
          required
        />
        <br></br>
        <input
          type="text"
          className="form-control"
          onChange={(e) => {
            setAccount({ ...account, type: e.target.value });
          }}
          value={account.type}
          placeholder="Type of movies"
          required
        />
        <br></br>
        <textarea
          className="form-control"
          onChange={(e) => {
            setAccount({ ...account, description: e.target.value });
          }}
          value={account.description}
          placeholder="Description"
          required
        />
        <br></br>
        <input
          type="number"
          className="form-control"
          onChange={(e) => {
            setAccount({ ...account, typeID: e.target.value });
          }}
          value={account.typeID}
          placeholder="Type ID"
          required
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
