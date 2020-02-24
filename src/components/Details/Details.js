import React, { useState, useEffect, useRef } from 'react';
import "./Details.scss";
import Movies from '../Movies/Movies';
import Header from '../Header/Header';
import { useParams } from 'react-router-dom';

const imageURL = 'https://image.tmdb.org/t/p/original';
const defaultURL = 'https://api.themoviedb.org/3/movie/';
const APIkey = '?api_key=38344a322e81bd125e248f1782dd8aa0&language=en-US';

const Details = () => {
    let { id } = useParams();

    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState([]);
    const [genres, setGenres] = useState([]);
    

    useEffect(() => {
        fetch(`${defaultURL}${id}${APIkey}&language=en-US`)
            .then(response => response.json())
            .then(jsonData => {
                setMovie(jsonData)
                let list_of_genres = jsonData.genres;
                setGenres(list_of_genres.map(genre => {
                    return genre.name;
                }));

                
            })

        console.log(`${defaultURL}${id}/credits${APIkey}`);
        fetch(`${defaultURL}${id}/credits${APIkey}`)
            .then(response => response.json())
            .then (jsonData => {
                let temp = jsonData.cast.slice(0,5);
                setCredits(temp);
                
            })

    }, [id]);

    const google = (cast) => {
        return `https://www.google.com/search?q=${cast}`
    }

    const getCredits = () => {
        if (credits.length != 0) {
            console.log(credits, "wtf");
            return (
            <div className="cast-listing">
                <span className="starring">Starring: </span>
                <span className="list-items">
                    <a href={google(credits[0].name)}>{credits[0].name}, </a>
                    <a href={google(credits[1].name)}>{credits[1].name}, </a>
                    <a href={google(credits[2].name)}>{credits[2].name}, </a>
                    <a href={google(credits[3].name)}>{credits[3].name}</a>
                </span>
            </div>
        );}
        else {return <div>nulll</div>}
        
    }

    console.log(id);
    console.log(genres);
    console.log(credits);


    return (
        <div className="Details">
        <Header />
        <div className="item-details">
            <header className="item-details__header"
            style={{
                backgroundColor: `rgb(255, 255, 255)`,
                backgroundImage:  `linear-gradient(0deg, rgb(0, 0, 0) 5%, rgba(0, 0, 0, 0.45) 92%), url(${movie ? `${imageURL}${movie.backdrop_path ? movie.backdrop_path : movie.poster_path}` : null})`,
                
                backgroundSize: `cover`,
                backgroundPosition: `center center`,
                width: `100%`,
                height: `100vh`,
                backgroundRepeat: `no-repeat`,
            }}>
            
            <div className="item-details__header__movie-title">
            {movie ? movie.title : 'loading'}
            </div>

            <div className="item-details__header__movie-overview">
            {movie ? movie.overview : 'loading'}
            </div>
            {
            <div className="item-details__header__movie-credits">
            {credits ? getCredits() : 'loading'}
            </div> }

            {/*             <div className="item-details__header__movie-genres">
            {genres ? genres : 'loading'}
            </div> */}

            </header>

            <main>
            </main>
        </div>
        </div>
    );
};

export default Details;