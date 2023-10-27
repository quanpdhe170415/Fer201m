import {useState} from "react";

const ChangePassword = ({userParams, changePasswordMode, handleToggleToasr1}) => {
    const [user, setUser] = useState(userParams);
    const [matching, setMatching] = useState(false);
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState();
}