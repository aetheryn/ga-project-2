import React, { useState, useContext, useEffect } from "react";
import moviesContext from "../context/movies-context";
import Card from "./Card";

const ToWatchMovies = () => {
  const toWatchContext = useContext(moviesContext);
  const [toWatchMovies, setToWatchMovies] = useState([]);

  // --- Get details of a movie in To-Watch list --- //

  const getToWatchMovie = async (id) => {
    console.log(`Getting ${id}'s movie data.`);
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_PUBLIC_KEY}`,
        },
      };

      const response = await fetch(
        import.meta.env.VITE_PUBLIC_SERVER + "movie/" + id + "?language=en-US",
        options
      );

      if (response.ok) {
        const data = await response.json();
        setToWatchMovies((prevState) => {
          return [...prevState, { data }];
        });
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  // --- Initialise above function upon mount for each movie ID --- //

  useEffect(() => {
    for (let i = 2; i < toWatchContext.toWatch.length; i++) {
      getToWatchMovie(toWatchContext.toWatch[i]);
    }
  }, []);

  return (
    <div className="row">
      {toWatchMovies.map((item) => {
        return (
          <div className="col-3">
            <Card
              key={item.data.id}
              movieId={item.data.id}
              title={item.data.title}
              overview={item.data.overview}
              imgurl={item.data.poster_path}
              rating={Math.floor(item.data.vote_average * 10) / 10}
              releaseDate={item.data.release_date}
            ></Card>
          </div>
        );
      })}
    </div>
  );
};

export default ToWatchMovies;
