import React, { useState, useEffect } from 'react';

import {BrowserRouter as Router, Route, useParams } from 'react-router-dom';

import './SearchResults.scss';
import Header from '../Header/Header';
import Movies from '../Movies/Movies';

const SearchResults = () => {
    let { id } = useParams();

    console.log("movie id is", id);

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);

        fetch(
            `https://api.themoviedb.org/3/search/multi?api_key=38344a322e81bd125e248f1782dd8aa0&language=en-US&query=${id}&page=1&region=US`)
            .then(response => response.json())
            .then(jsonData => {
                setSearchResults(jsonData.results);
                console.log(searchResults);
                setLoading(false);

            });
    }, [id]);
    
    if (id == "no-result") {
        // setLoading(false);  this line causes infinite re-render
        console.log("empty input");
        return (
            <div className="search-result">
                <Header />
                <div className="empty-input"> <span>Please enter a movie title</span></div>
            </div>
        )
    }
    else if (searchResults.length == 0 && loading == false){
        return (
            <div className="search-results">
                <Header />
                <div className="invalid-input">There is no movie titled "{id}"</div>
            </div>
        )
    }
    else if (loading == true) {
        return (
            <div className="search-results">
                <Header />
                <div className="loading">Loading ...</div>
            </div>
        )
    }
    else {
    return (
        <div className="search-results">
            <Header />

            <main className="search-results-main">
                <header className="search-results-main-header">
                    <h1 className="search-results-main-header__title">Search results for <span>{id} </span></h1>
                </header>
            </main>
            <Movies movies = {searchResults} title="Search results" />
        </div>


    );}

};

export default SearchResults;