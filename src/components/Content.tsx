import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { MovieCard } from '../components/MovieCard';

import '../styles/content.scss';

export function Content() {

  const data = useContext(AppContext);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {data.selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {data.movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}