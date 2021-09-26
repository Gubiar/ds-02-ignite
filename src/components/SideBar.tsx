import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { Button } from '../components/Button';

import '../styles/sidebar.scss';


export function SideBar() {

  const data = useContext(AppContext);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {data.genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => data.handleClickButton(genre.id)}
            selected={data.selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}