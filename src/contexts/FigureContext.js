import React, { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const FigureContext = createContext();

const figureReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIGURES':
      return {
        ...state,
        figures: action.payload,
        loading: false
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    
    case 'UPDATE_STOCK':
      return {
        ...state,
        figures: state.figures.map(figure =>
          figure.id === action.payload.id
            ? { ...figure, stock: action.payload.stock }
            : figure
        )
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    
    case 'ADD_FAVOURITE':
      // Chỉ lưu id, không lưu object Figure
      if (state.favourites.includes(action.payload)) return state;
      return {
        ...state,
        favourites: [...state.favourites, action.payload]
      };
    case 'REMOVE_FAVOURITE':
      return {
        ...state,
        favourites: state.favourites.filter(id => id !== action.payload)
      };
    default:
      return state;
  }
};

const initialState = {
  figures: [],
  loading: true,
  error: null,
  favourites: [] // chỉ lưu id
};

export const FigureProvider = ({ children }) => {
  const [state, dispatch] = useReducer(figureReducer, initialState);

  const fetchFigures = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.get('http://localhost:3001/Figures');
      dispatch({ type: 'SET_FIGURES', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const updateFigureStock = async (id, newStock) => {
    try {
      await axios.patch(`http://localhost:3001/Figures/${id}`, { stock: newStock });
      dispatch({ type: 'UPDATE_STOCK', payload: { id, stock: newStock } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  useEffect(() => {
    fetchFigures();
  }, []);

  // Thêm/xóa favourites
  const addFavourite = (figure) => {
    dispatch({ type: 'ADD_FAVOURITE', payload: figure.id });
  };
  const removeFavourite = (id) => {
    dispatch({ type: 'REMOVE_FAVOURITE', payload: id });
  };

  return (
    <FigureContext.Provider value={{
      figures: state.figures,
      loading: state.loading,
      error: state.error,
      favourites: state.favourites,
      fetchFigures,
      updateFigureStock,
      addFavourite,
      removeFavourite
    }}>
      {children}
    </FigureContext.Provider>
  );
};

FigureProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useFigures = () => {
  const context = useContext(FigureContext);
  if (!context) {
    throw new Error('useFigures must be used within a FigureProvider');
  }
  return context;
};
