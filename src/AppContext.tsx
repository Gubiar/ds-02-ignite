import { createContext, ReactNode } from 'react'
import { useEffect, useState } from 'react';
import { api } from './services/api';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface AppProviderProps {
  children: ReactNode
}

interface AppContextData {
  movies: MovieProps[];
  genres: GenreResponseProps[];
  selectedGenreId: number;
  selectedGenre: GenreResponseProps;
  handleClickButton: (id: number) => void;
}

export const AppContext = createContext<AppContextData>(
  {} as AppContextData
);

export function AppProvider(props: AppProviderProps){

  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {

    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return(
    <AppContext.Provider value={{
      selectedGenreId,
      genres,
      movies,
      selectedGenre,
      handleClickButton
    }}>
      {props.children}
    </AppContext.Provider>
  )
}