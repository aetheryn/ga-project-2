import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";

const Movies = (props) => {
  const [displayedMovs, setDisplayedMovs] = useState([]);

  // --- Get a list of all movies --- //

  const getPopulars = async (signal) => {
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
          "movie/popular?language=en-US&page=" +
          props.pageNum,
        options
      );

      if (response.ok) {
        const data = await response.json();
        setDisplayedMovs(data.results);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  // --- Get list of movies based on search bar --- //

  const getSearchedMovie = async (signal) => {
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
          "search/movie?query=" +
          encodeURIComponent(props.searchInput.trim()) +
          "&include_adult=false&language=en-US&page=" +
          props.pageNum,
        options
      );

      if (response.ok) {
        const data = await response.json();
        setDisplayedMovs(data.results);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  // --- Initialise which function to use based on search bar state --- //

  useEffect(() => {
    const controller = new AbortController();

    if (props.searchInput.length == 0) {
      getPopulars(controller.signal);
    } else {
      getSearchedMovie(controller.signal);
    }

    return () => {
      controller.abort();
    };
  });

  return (
    <div className="row">
      {displayedMovs.map((item) => {
        return (
          <div className="col-3">
            <Card
              key={item.id}
              movieId={item.id}
              title={item.title}
              overview={item.overview}
              imgurl={item.poster_path}
              rating={Math.floor(item.vote_average * 10) / 10}
              releaseDate={item.release_date}
            ></Card>
          </div>
        );
      })}
    </div>
  );
};

export default Movies;
