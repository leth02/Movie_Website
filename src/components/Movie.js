import React, {useEffect} from 'react';
import { Swiper, Navigation, Pagination, Scrollbar } from 'swiper/js/swiper.esm.js';
import 'swiper/css/swiper.css';
import no_poster from '../static/no_poster.jpg';

function Movie(props) {
    useEffect(() => {
        var swiper = new Swiper('.swiper-container', {
            speed: 500,
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
    
    return (

        <div className="swiper-container">

          <h2 className="swiper-container__title">{props.title}</h2>

          <div className="swiper-wrapper">
            {props.movies.map((movie, index) => (
                <div key={movie.id} className="swiper-slide"> 
                    <img width="130" height="200" src = {movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : no_poster} alt="No poster available" />
                    <h3 className="swiper-slide__title">{movie.title}</h3>
                </div>
            ))}
            
          </div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>

        </div>
    );
};

export default Movie;
