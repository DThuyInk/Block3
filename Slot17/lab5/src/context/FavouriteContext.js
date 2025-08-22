import React, { createContext, useReducer, useContext } from "react";

export const FavouriteContext = createContext(null);

const initialState = {
  favourites: [],
};

function favouriteReducer(state, action) {
  switch (action.type) {
    case "ADD_FAVOURITE":
      if (state.favourites.find((d) => d.id === action.payload.id)) return state;
      return {
        ...state,
        favourites: [...state.favourites, action.payload],
      };
    case "REMOVE_FAVOURITE":
      return {
        ...state,
        favourites: state.favourites.filter((d) => d.id !== action.payload),
      };
    case "TOGGLE_FAVOURITE":
      if (state.favourites.find((d) => d.id === action.payload.id)) {
        return {
          ...state,
          favourites: state.favourites.filter((d) => d.id !== action.payload.id),
        };
      } else {
        return {
          ...state,
          favourites: [...state.favourites, action.payload],
        };
      }
    case "SET_FAVOURITES":
      return {
        ...state,
        favourites: action.payload,
      };
    default:
      return state;
  }
}

export const FavouriteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favouriteReducer, initialState);

  // Persist favourites in localStorage
  React.useEffect(() => {
    const savedFavourites = JSON.parse(localStorage.getItem("favourites"));
    if (savedFavourites) {
      dispatch({ type: "SET_FAVOURITES", payload: savedFavourites });
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(state.favourites));
  }, [state.favourites]);

  const addToFavourite = (dish) => {
    dispatch({ type: "ADD_FAVOURITE", payload: dish });
  };

  const removeFromFavourite = (id) => {
    dispatch({ type: "REMOVE_FAVOURITE", payload: id });
  };

  const toggleFavourite = (dish) => {
    dispatch({ type: "TOGGLE_FAVOURITE", payload: dish });
  };

  return (
    <FavouriteContext.Provider value={{
      favourites: state.favourites,
      addToFavourite,
      removeFromFavourite,
      toggleFavourite,
    }}>
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavourite = () => useContext(FavouriteContext);
