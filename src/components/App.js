//import logo from './logo.svg';
import React, { useReducer, useEffect } from 'react';
import "../App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";

const nowPlayingURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=38344a322e81bd125e248f1782dd8aa0&language=en-US&page=1';
const popularURL = 'https://api.themoviedb.org/3/movie/popular?api_key=38344a322e81bd125e248f1782dd8aa0&language=en-US&page=1';
const upcomingURL = 'https://api.themoviedb.org/3/movie/upcoming?api_key=38344a322e81bd125e248f1782dd8aa0&language=en-US&page=1';

const initialState = {
  loading: false,
  fetchLoading: true,
  nowPlayingMovies: [],
  popularMovies: [],
  upcomingMovies: [],
  searchResult: [],
  errorMessage: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };

    case "SEARCH_SUCCESS":
      return {
        ...state,
        loading: false,
        searchResult: action.payload,
        errorMessage: null
      };
    
    case "SEARCH_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
        searchResult: []
      };
    
    case "FETCH_MOVIE_REQUEST":
      return {
        ...state,
        fetchLoading: true,
        errorMessage: null,
      };

    case "GET_NOWPLAYING_MOVIES":
      return {
        ...state,
        searchResult: [],
        loading: false,
        fetchLoading: false,
        nowPlayingMovies: action.payload
      };

    case "GET_POPULAR_MOVIES":
      return {
        ...state,
        searchResult: [],
        loading: false,
       
        popularMovies: action.payload
      };
    
    case "GET_UPCOMING_MOVIES":
      return {
        ...state,
        searchResult: [],
        loading: false,
        
        upcomingMovies: action.payload
      };

    default:
      return state;
  }
};


const App = () => {
  const [state, dispatch] = useReducer(reducer,initialState);

  function getMovies(URL, type) {
    dispatch({
      type: 'FETCH_MOVIE_REQUEST'
    });

    fetch(URL)
    .then(response => response.json())
    .then(jsonData => {
      dispatch({
        type: type,
        payload: jsonData.results
      });
    });
  }; 

  useEffect(() => {
    getMovies(upcomingURL, 'GET_UPCOMING_MOVIES');
    getMovies(nowPlayingURL, 'GET_NOWPLAYING_MOVIES');
    getMovies(popularURL, 'GET_POPULAR_MOVIES');
  }, []);

  
  const movies_search_component = () => {

    if (loading && !errorMessage) {
      return <span>...</span>
    }

    else if (errorMessage) {
      return <h3 className="errorMessage">{errorMessage}</h3>
    }

    else {
      if (searchResult.length > 0) {
        return <Movie movies = {searchResult} />;
      };
    };
  };
 
  const search = searchValue => {

    dispatch({
      type: 'SEARCH_REQUEST'
    });

    fetch(`https://api.themoviedb.org/3/search/multi?api_key=38344a322e81bd125e248f1782dd8aa0&query=${searchValue}`)
      .then(response => response.json())
      .then(data => {
        if (data.errors) {
          dispatch({
            type: "SEARCH_FAILURE",
            error: "Please provide a non-empty movie name"
          });
          
        } else {
          if (data.total_results > 0) {
          dispatch({
            type: "SEARCH_SUCCESS",
            payload: data.results
          });
          } else {
            dispatch({
              type: "SEARCH_FAILURE",
              error: `There is no movie named ${searchValue}`
            });
          };
        }
    });
  };

  const { loading, fetchLoading, nowPlayingMovies, popularMovies, upcomingMovies, searchResult, errorMessage } = state;

  return (  
    <div className="App">
      <div className="m-container">
        <Header text="Movie Website" />

        <Search search={search} />

        <p className="App-intro">WELCOME TO THIS MOVIE WEBSITE <br/> Find your favorite movies </p>

        <div className="Movie-listing">
          {movies_search_component()}

          {fetchLoading && !errorMessage ? <span>...</span> : errorMessage ? <h3> {errorMessage}</h3> : <Movie movies = {nowPlayingMovies} title = "Now Playing" />}

          {fetchLoading && !errorMessage ? <span>...</span> : errorMessage ? <h3> {errorMessage}</h3> : <Movie movies = {popularMovies} title = "Popular" />}

          {fetchLoading && !errorMessage ? <span>...</span> : errorMessage ? <h3> {errorMessage}</h3> : <Movie movies = {upcomingMovies} title = "Upcoming" />}
   
        </div>
       
      </div>
    </div>  
  );

};


export default App;
