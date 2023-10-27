import {NavLink, useNavigate} from "react-router-dom";
import {useContext, useRef} from "react";
import {MoviesContext} from "../../App";

const Header = () => {
    const navigate = useNavigate();
    const {
        movies,
        setMovies,
        currentPath,
        setCurrentPath,
        token,
        setToken,
        removeToken,
        categories
    } = useContext(MoviesContext);
    const searchField = useRef();
    const handleSearch = () => {
        const value = searchField.current.value;
        const localMovies = JSON.parse(localStorage.getItem("movies"));
        const result = localMovies.filter((movie) => movie.title.toLowerCase().includes(value.toLowerCase()));
        setMovies(result);
        if (result.length == 0) {
            navigate('');
            window.alert('Not found');
        }
    }
    const handleLogout = () => {
        removeToken();
        setToken(null);
        navigate(-1);
    }
    return (
        <nav className="fixed-top navbar navbar-expand-lg navbar-dark bg-dark"
             style={{height: '60px', padding: '0.5rem'}}>
            <NavLink className='navbar-brand' to='/'>
                <img
                    src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fsununi.edu.vn%2Ftong-hop-nhung-web-xem-phim-tieng-anh-ielts-cho-phu-de-chat-luong-2020%2F&psig=AOvVaw2mPZnZKEIk5SkiuQcIjBZJ&ust=1698454877726000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKCAytGDlYIDFQAAAAAdAAAAABAD'
                    alt='' style={{width: '8rem'}}/>
            </NavLink>
            <button className='navbar-toggler' type='button' data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                    <li className='nav-item text-dark'>
                        <NavLink to="/"
                                 className={`nav-link ${({isActive, isPending}) =>
                                     isPending ? " pending" : isActive ? "active" : ""}`}
                                 onClick={() => {
                                     setCurrentPath('')
                                 }}
                        >
                            Trang Chủ
                        </NavLink>
                    </li>
                    <li className="nav-item dropdown">
                        <button className='nav-link btn border-0 dropdown-toggle'
                                id='navbarDropdown'
                                data-bs-toggle='dropdown'
                                aria-expanded='false'
                        >
                            Thể Loại
                        </button>

                        <ul className="dropdown-menu px-2" aria-labelledby="navbarDropdown">
                            <div className="row">
                                {
                                    categories.map(e => {
                                        return (
                                            <li key={e.id} className='col'>
                                                <NavLink to={`${e.url}`}
                                                         className="dropdown-item dropdown-item-warning">{e.title}</NavLink>
                                            </li>
                                        )
                                    })
                                }
                            </div>


                        </ul>
                    </li>
                    <li className="nav-item d-none d-md-block">
                        <NavLink to="/phimle"
                                 className={`nav-link ${({isActive, isPending}) =>
                                     isPending ? " pending" : isActive ? "active" : ""}`}
                                 onClick={() => {
                                     setCurrentPath('phimle')
                                 }}
                        >
                            Phim Lẻ
                        </NavLink>
                    </li>
                    <li className="nav-item d-none d-md-block">
                        <NavLink to="/phimbo"
                                 className={`nav-link ${({isActive, isPending}) =>
                                     isPending ? " pending" : isActive ? "active" : ""}`}
                                 onClick={() => {
                                     setCurrentPath('phimbo')
                                 }}

                        >
                            Phim Bộ
                        </NavLink>
                    </li>

                    <li className="nav-item d-none d-md-block">
                        <NavLink to="/phimchieurap"
                                 className={`nav-link ${({isActive, isPending}) =>
                                     isPending ? " pending" : isActive ? "active" : ""}`}
                                 onClick={() => {
                                     setCurrentPath('phimbo')
                                 }}

                        >
                            Phim Chiếu Rạp
                        </NavLink>
                    </li>

                </ul>
                <div className="d-lg-flex align-items-center">
                    <form className="d-flex h-75 ">
                        <input className="form-control me-2 " ref={searchField} type="search" placeholder="Search"
                               aria-label="Search"/>
                        <button className="btn btn-warning" type="button" onClick={handleSearch}>Search</button>
                    </form>

                    {
                        token != null && (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink to="/profile"
                                             className={`nav-link ${({isActive, isPending}) =>
                                                 isPending ? " pending" : isActive ? "active" : ""}`}
                                    >
                                        Hi: {token.fullName}
                                    </NavLink>
                                </li>
                                {
                                    token.role == 'Admin' && (
                                        <li className="nav-item">
                                            <NavLink to="/dashboard"
                                                     className={`nav-link ${({isActive, isPending}) =>
                                                         isPending ? " pending" : isActive ? "active" : ""}`}
                                            >
                                                Dashboard
                                            </NavLink>
                                        </li>
                                    )
                                }
                                <li className="nav-item">
                                    <NavLink
                                        to='#!'
                                        className={`nav-link ${({isActive, isPending}) =>
                                            isPending ? " pending" : isActive ? "active" : ""}`}
                                        onClick={handleLogout}
                                    >
                                        Đăng Xuất
                                    </NavLink>

                                </li>

                            </ul>
                        )
                    }
                    {
                        token == null && (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink to="/login"
                                             className={`nav-link ${({isActive, isPending}) =>
                                                 isPending ? " pending" : isActive ? "active" : ""}`}
                                    >
                                        Đăng Nhập
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/register"
                                             className={`nav-link ${({isActive, isPending}) =>
                                                 isPending ? " pending" : isActive ? "active" : ""}`}
                                    >
                                        Đăng Ký
                                    </NavLink>
                                </li>

                            </ul>
                        )
                    }

                </div>
            </div>
        </nav>
    );
}

export default Header;