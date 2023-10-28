
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContent } from "../App";
import "./style.css";
const Login = () => {
	const [account, setAccount] = useState([]);

	// nó ở trên cùng một trang nên cứ import cho nhau thôi
	const { setUser } = useContext(UserContent);
	const emailRef = useRef();

	const nameRef = useRef();
	const navigate = useNavigate();
	useEffect(() => {
		fetch("http://localhost:9999/users",
			{ method: "GET" }
		)
			.then((res) => res.json())
			.then((res) => {
				setAccount(res);
			});
	}, []);

	const handleLogin = () => {
		const username = nameRef.current.value;
		const email = emailRef.current.value;
		if (!username || !email) {
			return window.alert("Please enter all input");
		}
		const some = account.find(
			(item) => item?.email === username && item?.password === email
		);
		if (!some) {
			console.log(account);
			console.log(username);
			return window.alert("Username or email is not correct");
		}
		setUser({ ...some }); // dải ra đối tươngj some
		navigate("/:id"); // thanh cong điều hướng đến đây
	};
	return (
		<div className="wrapper">
			<form className="form-signin">
				<h2 className="form-signin-heading">Please login</h2>
				<input type="text" className="form-control" ref={nameRef} name="username" placeholder="Email Address" required="" autofocus="" />
				<input type="password" ref={emailRef} className="form-control" name="password" placeholder="Password" required="" />
				<label className="checkbox">
					<input type="checkbox" /> Remember me
				</label>
				<button className="btn btn-lg btn-primary btn-block" onClick={handleLogin} type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
