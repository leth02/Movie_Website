//import logo from './logo.svg';
import React, { useReducer, useEffect } from 'react';
import "../App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";
import { Swiper, Navigation, Pagination, Scrollbar } from 'swiper/js/swiper.esm.js';
import 'swiper/css/swiper.css';

Swiper.use([Navigation, Pagination, Scrollbar]);

const API_nowplaying_url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=38344a322e81bd125e248f1782dd8aa0&language=en-US&page=1';
const API_popular_url = 'https://api.themoviedb.org/3/movie/popular?api_key=38344a322e81bd125e248f1782dd8aa0&language=en-US&page=1';
const API_upcoming_url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=38344a322e81bd125e248f1782dd8aa0&language=en-US&page=1';
const initialState = {
  loading: true,
  movies_nowplaying: [],
  movies_popular: [],
  movies_upcoming: [],
  movies_search: [],
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
        movies_search: action.payload,
        errorMessage: null
      };
    
    case "SEARCH_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
        movies_search: []
      };

    case "GET_MOVIES_NOWPLAYING":
      return {
        ...state,
        movies_search: [],
        loading: false,
        
        movies_nowplaying: action.payload
      };

    case "GET_MOVIES_POPULAR":
      return {
        ...state,
        movies_search: [],
        loading: false,
       
        movies_popular: action.payload
      };
    
    case "GET_MOVIES_UPCOMING":
      return {
        ...state,
        movies_search: [],
        loading: false,
        
        movies_upcoming: action.payload
      };

    default:
      return state;
  }
};


const App = () => {
  const [state, dispatch] = useReducer(reducer,initialState);

  useEffect(() => {
    fetch(API_upcoming_url)
        .then(response => response.json())
        .then(data => {
            dispatch({
              type: 'GET_MOVIES_UPCOMING',
              payload: data.results
            });
        });
  }, []);

  useEffect(() => {
      fetch(API_nowplaying_url)
        .then(response => response.json())
        .then(data => {

            dispatch({
              type: 'GET_MOVIES_NOWPLAYING',
              payload: data.results
            });
        }); 
  }, []);

  useEffect(() => {
    fetch(API_popular_url)
        .then(response => response.json())
        .then(data => {
            dispatch({
              type: 'GET_MOVIES_POPULAR',
              payload: data.results
            });
        });
  }, []);

  const movies_search_component = () => {

    if (errorMessage != null) {
      return <h3 className="errorMessage">{errorMessage}</h3>
    }

    else {
      if (movies_search.length > 0) {
        return <Movie movies = {movies_search} />;
      };
    };
  };
 
  const search = searchValue => {
    console.log("searchvalue", searchValue);
    dispatch({
      type: 'SEARCH_REQUEST'
    });

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=38344a322e81bd125e248f1782dd8aa0&query=${searchValue}`)
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

  const { loading, movies_nowplaying, movies_popular, movies_upcoming, movies_search, errorMessage } = state;
  
  
  return (  
    <div className="App">
      <div className="m-container">
        <Header text="Movie Website" />

        <Search search={search} />

        <p className="App-intro">WELCOME TO THIS MOVIE WEBSITE <br/> Find your favorite movies </p>

        {movies_search_component()}

        <Movie movies = {movies_nowplaying} title = "Now Playing" />

        <Movie movies = {movies_upcoming} title = "Upcoming" />

        <Movie movies = {movies_popular} title = "Popular" />

        
        
      </div>
    </div>
  
  );

};


export default App;
