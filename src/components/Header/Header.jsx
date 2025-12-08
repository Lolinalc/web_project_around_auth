import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.png";

export default function Header({ email, onSignOut, loggedIn }) {
  const location = useLocation();

  return (
    <header className="header page__section">
      <img src={logo} alt="Around the U.S logo" className="logo header__logo" />
      <div className="header__auth">
        {loggedIn ? (
          <>
            <span className="header__email">{email}</span>
            <button onClick={onSignOut} className="header__button">
              Cerrar sesión
            </button>
          </>
        ) : location.pathname === "/signin" ? (
          <Link to="/signup" className="header__link">
            Regístrate
          </Link>
        ) : (
          <Link to="/signin" className="header__link">
            Inicia sesión
          </Link>
        )}
      </div>
      <div className="header__line"></div>
    </header>
  );
}
