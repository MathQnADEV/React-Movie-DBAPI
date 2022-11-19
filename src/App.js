import "./App.css";
import { getMovieList, searchMovies } from "./api";
import { useEffect, useState } from "react";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result)
    })
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
          /* <div>{movie.title}</div>
          <div>{movie.poster_path}</div>
          <div>{movie.release_date}</div>
          <div>{movie.vote_average}</div> */
        <div className="Movie-wrapper" key={i}>
            <div className="Movie-tittle">{movie.title}</div>
            <img className="Movie-image" src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} />
            <div className="Movie-date">release: {movie.release_date}</div>
            <div className="Movie-rate">{movie.vote_average}</div>
          </div>
      )
    })
  }

  const search = async(q) => {
    if(q.length > 3){
      const query =  await searchMovies(q)
       setPopularMovies(query.results)
      // console.log({query: query})
    }
  };

  console.log({ popularMovies: popularMovies });

  return (
    <div className="App">
      <header className="App-header">
        <h1>MathQnADEV MOVIE MANIA</h1>
        <input
          placeholder="cari film kesayangan...."
          type="text"
          className="Movie-search"
          onChange={({ target }) => search(target.value)}
        />
        <div className="Movie-container">
           {/* <div className="Movie-wrapper">
            <div className="Movie-tittle">CONTOH PERTAMA</div>
            <img className="Movie-image" src="" />
            <div className="Movie-date">11-12-2022</div>
            <div className="Movie-rate">8.9</div>
          </div> */}
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
};

export default App;
