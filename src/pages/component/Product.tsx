import React from "react";
import { useState, useEffect } from "react";

type Props = {};

const ProductPage = (props: Props) => {
  const [movies, setMovies] = useState([{}]);
  useEffect(() => {
    setMovies([
      {
        name: "Billions",
        genre: "Drama",
        starring: "Damian Lewis, Paul Giamatt",
      },
      {
        name: "Sarafina",
        genre: "drama",
        starring: "Leleti Khumalo",
      },
    ]);
  }, []);
  return (
    <div className="App">
      {/* const {movies} = movies */}
      {movies.map((movie: any, index) => {
        return (
          <div className="movies">
            <h2>{movie.name}</h2>
            <h3>{movie.genre}</h3>
            <h4>{movie.starring}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default ProductPage;
