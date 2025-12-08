import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header/Header.jsx";
import Footer from "./Footer/Footer.jsx";
import Main from "./Main/Main.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import api from "../utils/api";
import * as auth from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [tooltipInfo, setTooltipInfo] = useState({
    isOpen: false,
    isSuccess: false,
    message: "",
  });
  const navigate = useNavigate();

  // Verificar token al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log("Token inválido:", err);
          localStorage.removeItem("token");
        });
    }
  }, [navigate]);

  // Obtener información del usuario
  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((error) => {
          console.log("Error al obtener la información del usuario:", error);
        });
    }
  }, [loggedIn]);

  // Obtener tarjetas iniciales
  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((error) => {
          console.log("Error al obtener las tarjetas:", error);
        });
    }
  }, [loggedIn]);

  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then(() => {
        setTooltipInfo({
          isOpen: true,
          isSuccess: true,
          message: "¡Correcto! Ya estás registrado.",
        });
        navigate("/signin");
      })
      .catch((err) => {
        console.log("Error en registro:", err);
        setTooltipInfo({
          isOpen: true,
          isSuccess: false,
          message: "Algo salió mal. Por favor, inténtalo de nuevo.",
        });
      });
  };

  const handleLogin = (email, password) => {
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setLoggedIn(true);
          setUserEmail(email);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("Error en login:", err);
        setTooltipInfo({
          isOpen: true,
          isSuccess: false,
          message: "Usuario o contraseña incorrectos.",
        });
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUserEmail("");
    navigate("/signin");
  };

  const closeTooltip = () => {
    setTooltipInfo({ isOpen: false, isSuccess: false, message: "" });
  };

  const handleOpenPopup = (popupName) => {
    setPopup(popupName);
  };

  const handleClosePopup = () => {
    setPopup(null);
  };

  const handleUpdateUser = async ({ name, about }) => {
    try {
      const newData = await api.editProfile(name, about);
      setCurrentUser(newData);
      handleClosePopup();
    } catch (err) {
      console.error("Error al actualizar nombre y descripción:", err);
    }
  };

  const handleUpdateAvatar = async (data) => {
    try {
      const response = await api.updateAvatar(data.avatar);
      setCurrentUser((prevUser) => ({
        ...prevUser,
        avatar: response.avatar,
      }));
      handleClosePopup();
    } catch (err) {
      console.error("Error al actualizar avatar:", err);
    }
  };

  const handleAddCard = async (data) => {
    try {
      const newCard = await api.addCard(data.name, data.link);
      setCards((prevCards) => [newCard, ...prevCards]);
      handleClosePopup();
    } catch (err) {
      console.error("Error al agregar una nueva tarjeta:", err);
    }
  };

  return (
    <div className="page__content">
      <CurrentUserContext.Provider
        value={{
          currentUser,
          handleUpdateUser,
          handleUpdateAvatar,
          handleAddCard,
        }}
      >
        <Header
          email={userEmail}
          onSignOut={handleSignOut}
          loggedIn={loggedIn}
        />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  currentUser={currentUser}
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  onAddCard={handleAddCard}
                  onUpdateUser={handleUpdateUser}
                  onUpdateAvatar={handleUpdateAvatar}
                  onSetCard={setCards}
                  popup={popup}
                  cards={cards}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
        </Routes>

        <Footer />

        <InfoTooltip
          isOpen={tooltipInfo.isOpen}
          onClose={closeTooltip}
          isSuccess={tooltipInfo.isSuccess}
          message={tooltipInfo.message}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
