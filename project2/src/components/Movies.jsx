import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";

const Movies = (props) => {
  const [populars, setPopulars] = useState([]);

  const formatRatings = (array) => {
    const results = [...array];

    for (let i = 0; i < results.length; i++) {
      const newRating = Math.floor(results[i].vote_average * 10) / 10;
      results[i].vote_average = newRating;
    }

    return results;
  };

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
        const formattedData = formatRatings(data.results);
        setPopulars(formattedData);
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
  });

  return (
    <div>
      {populars.map((item, idx) => {
        return (
          <Card
            key={item.id}
            title={item.title}
            imgurl={item.poster_path}
            rating={item.vote_average}
          ></Card>
        );
      })}
    </div>
  );
};

export default Movies;
