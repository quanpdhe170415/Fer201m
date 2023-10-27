import logo from './logo.svg';
import './App.css';
import {createContext, useEffect, useState} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";

export const MoviesContext = createContext();

function setTokens(userToken) {
    sessionStorage.setItem("token", JSON.stringify(userToken));
}

function getToken() {
    const tokenString = sessionStorage.setItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken;
}

const removeToken = () => {
    sessionStorage.removeItem("token");
}
const getCategory = (datas = [{id: 0, title: '', url: ''}], id) => {
    return datas.find(e => e.id == id).title;
}

function App() {
    let location = useLocation();
    const [movies, setMovies] = useState([]);
    const [categories, setCategories] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [currentPath, setCurrentPath] = useState("");
    const [comments, setComments] = useState(JSON.parse(localStorage.getItem("comments")));
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location]);

    useEffect(() => {
        const localMovies = JSON.parse(localStorage.getItem("movies"));
        setMovies(localMovies);
    }, []);

    useEffect(() => {
        const localAccounts = JSON.parse(localStorage.getItem("accounts"));
        setAccounts(localAccounts);
    }, []);

    useEffect(() => {
        // localStorage.setItem('comments', JSON.stringify(Comments))
        const localComments = JSON.parse(localStorage.getItem('comments'))
        setComments(localComments)
    }, [])

    useEffect(() => {
        // localStorage.setItem('categories', JSON.stringify(Categories))
        const localCategories = JSON.parse(localStorage.getItem('categories'))
        setCategories(localCategories)
    }, [])

    const [token, setToken] = useState(getToken());

    return (
        <MoviesContext.Provider value={{
            movies, setMovies,
            currentPath, setCurrentPath,
            token, setToken, setTokens, removeToken,
            accounts, setAccounts,
            categories, setCategories,
            comments, setComments,
            getCategory,
            location, navigate
        }}>
            <>
                <Routes>
                    {/*<Route path='/*' element={<Main />}></Routes>*/}
                    {/*<Route path='/dashboard/*' element={<Das />}></Routes>*/}
                </Routes>
            </>
        </MoviesContext.Provider>
    );
}

export default App;
