import React, { useState, useEffect, useContext } from "react";
import moviesContext from "../context/movies-context";
import Card from "./Card";

const WatchedMovies = () => {
  const watchedContext = useContext(moviesContext);
  const [watchedMovies, setWatchedMovies] = useState([]);

  const getWatchedMovie = async (id) => {
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
        import.meta.env.VITE_PUBLIC_SERVER + id + "?language=en-US",
        options
      );

      if (response.ok) {
        const data = await response.json();
        setWatchedMovies((prevState) => {
          return [...prevState, { data }];
        });
        console.log("Ok");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    console.log(watchedContext.watched);
    for (let i = 2; i < watchedContext.watched.length; i++) {
      getWatchedMovie(watchedContext.watched[i]);
      console.log(`useEffect renders count ${i}`);
    }
  }, [watchedContext.watched]);

  return (
    <div className="row">
      {watchedMovies.map((item) => {
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

export default WatchedMovies;
