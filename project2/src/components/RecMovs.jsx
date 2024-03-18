import React, { useContext, useState, useEffect } from "react";
import moviesContext from "../context/movies-context";
import Card from "./Card";

const RecMovs = (props) => {
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
          "movie/" +
          id +
          "/recommendations?language=en-US&page=1",
        options
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.results);

        const tempArray = recMovies.map((movie) => movie.id);

        let count = 0;

        for (let i = 0; i < data.results.length; i++) {
          if (count === 10) {
            break;
          }
          if (!tempArray.includes(data.results[i].id)) {
            setRecMovies((prevState) => [...prevState, data.results[i]]);
            count += 1;
          }
        }
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    setRecMovies([]);
    for (let i = 2; i < recContext.watched.length; i++) {
      getRecommendations(recContext.watched[i]);
      console.log(`useEffect renders count ${i}`);
    }
  }, []);

  return (
    <div className="row">
      {recMovies.map((item) => {
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
              recMovies={recMovies}
              isOnRecPage={props.isOnRecPage}
            ></Card>
          </div>
        );
      })}
    </div>
  );
};

export default RecMovs;
