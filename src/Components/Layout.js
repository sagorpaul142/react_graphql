import React from 'react';
import {Link} from "react-router-dom";

const Layout = ({children}) => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <Link to={"/"} className="navbar-brand">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to={'/posts'} className="nav-link active" aria-current="page">Post</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/users"} className="nav-link">Users</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container">
                {children}
            </div>
        </>
    );
};

export default Layout;
