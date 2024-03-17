import React, { useContext, useState, useEffect } from "react";
import moviesContext from "../context/movies-context";
import Card from "./Card";

const RecMovs = () => {
  const recContext = useContext(moviesContext);
  const [recMovies, setRecMovies] = useState([]);

  const getRecommendations = async (id) => {
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
        import.meta.env.VITE_PUBLIC_SERVER +
          id +
          "/recommendations?language=en-US&page=1",
        options
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.results);
        setRecMovies((prevState) => {
          return [...prevState, data.results];
        });
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    for (let i = 2; i < recContext.watched.length; i++) {
      getRecommendations(recContext.watched[i]);
      console.log(`useEffect renders count ${i}`);
    }
  }, []);

  return (
    <div className="row">
      {recMovies.map((array) => {
        return array.slice(0, 10).map((item) => {
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
        });
      })}
    </div>
  );
};

export default RecMovs;
