import React from "react";
import logo from '../logo.svg';
import movieDBLogo from '../static/the_movieDB_logo.png'

const react_logo = logo;
const movieDB_logo = movieDBLogo;
const Header = (props) => {
    return (
        <header className = "App-header">
            <img className = "react_logo" src={react_logo} alt="react logo" />
            <h3>{ props.text }</h3>
            <img className = "movieDB_logo" src={movieDB_logo} alt ="movieDB logo" />

        </header>
    );
};

export default Header;