

import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContent } from "../App";
import "./style.css";

const Update = () => {
  const { id } = useParams()
  const [account, setAccount] = useState({
    id: id,
      image: '',
      name: '',
      Year: '',
      type: '',
      score: 0,
      typeID: ''
  }
);
  
  const [idGlobal, setIdGlobal] = useState(id);
  // const [name, setName] = useState('');

  // khi chạy đến đây và submit nó sẽ lấy dữ liệu rồi add vào
  const { setUser } = useContext(UserContent);

  const navigate = useNavigate();
  // vì value là của object account, mà account thì nằm trong useEffect
  useEffect(() => {
    fetch(`http://localhost:9999/movies/${id}`,
      { method: "GET" }
    )
      .then((res) => res.json())
      .then((res) => {
        setAccount(res);
      });
  }, [id]);
  const handleLogin = (event) => {
    event.preventDefault();
    let id = account.length + 1;
    let newStudent = {
      id: id,
      image: account.image,
      name: account.name,
      Year: account.Year,
      type: account.type,
      score: 0,
      typeID: account.typeID
    };
    console.log(newStudent);
    console.log('day là id '+idGlobal);
    // setAccount([...account, newStudent]);

    fetch(`http://localhost:9999/movies/${idGlobal}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    })
      .then((res) => res.json())
      .then((res) => {
        setAccount(account); // set user ở đây sau khi lấy được thông tin từ server
        navigate("/:id");
      })
      .catch((error) => {
        console.log(error);
        window.alert("Cannot update account!");
      });
  };

  
  return (
    <div className="wrapper">
      <form className="form-signin"> image: '',
    
        <h2 className="form-signin-heading">Update New Movies</h2>
        <input type="text" value={account.image} className="form-control" onChange={(e) => {setAccount({...account,image:e.target.value})}} placeholder="images" required="" autofocus="" />
        <input type="text" defaultValue={account.name} onChange={(e) => {setAccount({...account,name:e.target.value})}} className="form-control"  placeholder="Name" required="" autofocus="" />
        <input type="number" value={account.Year} className="form-control" onChange={(e) => {setAccount({...account,Year:e.target.value})}} placeholder="Year" required="" autofocus="" />
        <input type="text" className="form-control" onChange={(e) => {setAccount({...account,type:e.target.value})}} value={account.type} placeholder="Type of movies" required="" autofocus="" />
        <input type="number" className="form-control" onChange={(e) => {setAccount({...account,typeID:e.target.value})}} value={account.typeID} placeholder="Type" required="" autofocus="" />
        <button className="btn btn-lg btn-primary btn-block" onClick={handleLogin} type="submit">Update</button>
      </form>
    </div>
  );
};
export default Update

