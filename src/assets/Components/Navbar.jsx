import { Link } from "react-router-dom";
import { useContext } from "react";
import FavoriteContext from '../../context/Context';
import logo from '../../assets/star-wars-logo.svg'


const Navbar = () => {
  const { favorite, favoriteaction } = useContext(FavoriteContext);

  const handleRemoveFavorite = (uid) => {
    favoriteaction({ type: 'Delete', payload: { uid } });
  };

  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid col-9">
          <Link to="/" className="navbar-brand">
            <img src= {logo} width={150}/>
          </Link>
          <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Favorites ({favorite.length})
            </button>
            <ul className="dropdown-menu">
              {favorite.length === 0 ? 
                <li className="ps-3">No Favorites</li>
                :
                favorite.map((favorite) => (
                  <li key={favorite.uid}>
                    <a className="dropdown-item" href="#">{favorite.name}
                      <i className="fa-solid fa-trash-can ms-3" onClick={() => handleRemoveFavorite(favorite.uid)}></i>
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;