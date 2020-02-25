import logo from '../../logo.svg';
import movieDBLogo from '../../static/the_movieDB_logo.png'
import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import { FaSearch } from 'react-icons/fa';

const react_logo = logo;
const movieDB_logo = movieDBLogo;

const Header = (props) => {

    const [searchValue, setSearchValue] = useState("");

    const handleSearchInputChanges = (event) => {
        setSearchValue(event.target.value);
    }

    const resetInputField = () => {
        setSearchValue("")
    }

    const callSearchFunction = (event) => {
        event.preventDefault();
        props.search(searchValue);
        resetInputField();
    }


    return (
        <nav>
        <div className = "App-header">

                <Link to={`/`} >
                <img className = "react_logo" src={react_logo} alt="react logo" />
                </Link>

                <form className="search-form">
                    <input className="search-form__input" 
                    value = {searchValue}
                    onChange = {handleSearchInputChanges}
                    type = "text"
                    placeholder="Movie title..."
                    />
                    <Link className="button-link" to={searchValue ? `/search-results/${searchValue}` : `/search-results/no-result`}>
                    <button className="search-form__button" type="submit" value="SEARCH">
                    <FaSearch />
                    </button>
                    </Link>
                </form>
         
            <img className = "movieDB_logo" src={movieDB_logo} alt ="movieDB logo" />

        </div>
        </nav>
    );
};

export default Header;