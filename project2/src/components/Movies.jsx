import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";

const Movies = (props) => {
  const [populars, setPopulars] = useState([]);

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
          "popular?language=en-US&page=" +
          props.pageNum,
        options
      );

      if (response.ok) {
        const data = await response.json();
        setPopulars(data.results);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getPopulars(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      {populars.map((item, idx) => {
        return (
          <Card
            key={item.id}
            movieId={item.id}
            title={item.title}
            overview={item.overview}
            imgurl={item.poster_path}
            rating={Math.floor(item.vote_average * 10) / 10}
            releaseDate={item.release_date}
          ></Card>
        );
      })}
    </div>
  );
};

export default Movies;
