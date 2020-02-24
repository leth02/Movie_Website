import React, {useEffect} from 'react';
import { Swiper, Navigation, Pagination, Scrollbar } from 'swiper/js/swiper.esm.js';
import 'swiper/css/swiper.css';
import no_poster from '../../static/no_poster.jpg';
import {BrowserRouter as Router, Route, Link, useParams } from 'react-router-dom';
import './Movies.scss';

Swiper.use([Navigation, Pagination, Scrollbar]);

function Movies(props) {
    useEffect(() => {
        var swiper = new Swiper('.swiper-container', {
            speed: 1200,
            slidesPerView: 7,
            slidesPerGroup: 7,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            // ...
            });
    });
    
    function media_type(movie) {
        console.log(movie.id);
        if (movie.media_type) {
            if (movie.media_type == "movie") {
                return <h3 className="swiper-slide__title">{movie.title}</h3>
            } else if (movie.media_type == "tv") {
                return <h3 className="swiper-slide__title">{movie.name}</h3>
            };
        } else {
            return <h3 className="swiper-slide__title">{movie.title}</h3>;
        };
    };

    const getMovieSwiper = () => {
        
    };

    return (

        <div className="swiper-container">

          <h2 className="swiper-container__title">{props.title}</h2>
        
        
          <div className="swiper-wrapper">
            {props.movies.map((movie, index) => (
                
                <div key={movie.id} className="swiper-slide"> 
                <Link className="swiper-slide__detail-link" to={`/details/movie/${movie.id}`} key={movie.id}>
                    <img className="swiper-slide__detail-link__image" width="130" height="200" src = {movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : no_poster} alt="No poster available" />
                    <h3 className="swiper-slide__detail-link__title">{movie.title}</h3>  
                </Link>
                </div>

            ))}
            
          </div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>

        </div>
    );
};

export default Movies;
