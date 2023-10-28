import React from "react";
import "./Footer.css";
import { Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="footer-copyright text-center py-3">
                            <p>&copy; 2022 - MovieRatingApp_MVC-Developer: KHANHLINH - QUOCKHANH - NGUYENKHANH</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

