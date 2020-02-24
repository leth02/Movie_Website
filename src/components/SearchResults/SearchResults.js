import React, { useState, useEffect } from 'react';

import {BrowserRouter as Router, Route, useParams } from 'react-router-dom';

import './SearchResults.scss';
import Header from '../Header/Header';
import Movies from '../Movies/Movies';

const SearchResults = () => {
    let { id } = useParams();

    console.log("movie id is", id);

    const [searchResults, setSearchResults] = useState([]);


    useEffect(() => {
        
        fetch(
            `https://api.themoviedb.org/3/search/multi?api_key=38344a322e81bd125e248f1782dd8aa0&language=en-US&query=${id}&page=1&region=US`)
            .then(response => response.json())
            .then(jsonData => {
                setSearchResults(jsonData.results);

            });
    }, [id]);
    

    return (
        <div className="search-results">
            <Header />

            <main className="search-results-main">
                <header className="search-results-main-header">
                    <h1 className="search-results-main-header__title">Search results for {id} </h1>
                </header>
            </main>
            <Movies movies = {searchResults} title="Search results" />
        </div>


    );

};

export default SearchResults;