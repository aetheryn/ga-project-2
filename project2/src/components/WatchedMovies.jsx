import React, { useState, useEffect } from "react";

const WatchedMovies = (props) => {
  const [watchedMovies, setWatchedMovies] = useState([]);

  const formatRatings = (obj) => {
    const results = { ...obj };
    const newRating = Math.floor(results.vote_average * 10) / 10;
    results.vote_average = newRating;
    return results;
  };

  const getWatchedMovieDetails = async (signal, index) => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_PUBLIC_KEY}`,
        },
        signal,
      };

      const response = await fetch(
        import.meta.env.VITE_PUBLIC_SERVER +
          props.watched[index] +
          "?language=en-US",
        options
      );

      if (response.ok) {
        const data = await response.json();
        const formattedData = formatRatings(data);
        setWatchedMovies((prevState) => {
          [...prevState, { formattedData }];
        });
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    for (let i = 0; i < props.watched.length; i++) {
      getWatchedMovieDetails(controller.signal, i);
    }

    console.log(watchedMovies);

    return () => {
      controller.abort();
    };
  });

  return (
    <div>
      {watchedMovies.map((item) => {
        return (
          <Card
            key={props.watched[index]}
            movieId={props.watched[index]}
            title={item.title}
            overview={item.overview}
            imgurl={item.poster_path}
            rating={item.vote_average}
            releaseDate={item.release_date}
          ></Card>
        );
      })}
    </div>
  );
};

export default WatchedMovies;
