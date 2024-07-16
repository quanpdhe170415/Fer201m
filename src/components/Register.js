import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContent } from "../App";
import "./style.css";

const Register = () => {
    const [account, setAccount] = useState([]);
    const { setUser } = useContext(UserContent);
    const emailRef = useRef();
    const nameRef = useRef();
    const passRef = useRef();
    const repassRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9999/users", { method: "GET" })
            .then((res) => res.json())
            .then((res) => {
                setAccount(res);
            });
    }, []);

    const validateEmail = (email) => {
        const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return REGEX_EMAIL.test(email);
    };

    const validatePassword = (password) => {
        const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        return REGEX_PASSWORD.test(password);
    };

    const handleSignUp = (event) => {
        event.preventDefault();
        const username = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passRef.current.value;
        const repassword = repassRef.current.value;
        const id = account.length + 1;

        if (!username || !email || !password || !repassword) {
            window.alert("Please enter all input");
            return;
        }

        if (!validateEmail(email)) {
            window.alert("Please enter a valid email address");
            return;
        }

        if (!validatePassword(password)) {
            window.alert("Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number");
            return;
        }

        if (password !== repassword) {
            window.alert("Confirm password different from password");
            return;
        }

        const emailExists = account.some((account) => account.email.toLowerCase() === email.toLowerCase());
        if (emailExists) {
            window.alert("Email is already registered");
            return;
        }

        const newAccount = {
            id,
            name: username,
            email,
            password,
            role: "CUSTOMER"
        };

        fetch("http://localhost:9999/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAccount),
        })
            .then((res) => res.json())
            .then((res) => {
                setUser(res);
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
                window.alert("Cannot create new account!");
            });
    };

    return (
        <div className="wrapper">
            <form className="form-signin" onSubmit={handleSignUp}>
                <h2 className="form-signin-heading">Please Sign Up</h2>
                <input type="text" ref={nameRef} className="form-control" name="username" placeholder="Your Name" required autoFocus />
                <input type="text" ref={emailRef} className="form-control" name="username" placeholder="Email Address" required />
                <input type="password" ref={passRef} className="form-control" name="password" placeholder="Password" required />
                <input type="password" ref={repassRef} className="form-control" name="cfpassword" placeholder="Confirm Password" required />
                <label className="checkbox">
                    <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe" /> Remember me
                </label>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
