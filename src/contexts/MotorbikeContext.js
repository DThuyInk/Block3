import React, { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const MotorbikeContext = createContext();

const motorbikeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MOTORBIKES':
      return {
        ...state,
        motorbikes: action.payload,
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
        motorbikes: state.motorbikes.map(motorbike =>
          motorbike.id === action.payload.id
            ? { ...motorbike, stock: action.payload.stock }
            : motorbike
        )
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    
    default:
      return state;
  }
};

const initialState = {
  motorbikes: [],
  loading: true,
  error: null
};

export const MotorbikeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(motorbikeReducer, initialState);

  const fetchMotorbikes = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.get('http://localhost:3001/Motorbikes');
      dispatch({ type: 'SET_MOTORBIKES', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const updateMotorbikeStock = async (id, newStock) => {
    try {
      await axios.patch(`http://localhost:3001/Motorbikes/${id}`, { stock: newStock });
      dispatch({ type: 'UPDATE_STOCK', payload: { id, stock: newStock } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  useEffect(() => {
    fetchMotorbikes();
  }, []);

  return (
    <MotorbikeContext.Provider value={{
      motorbikes: state.motorbikes,
      loading: state.loading,
      error: state.error,
      fetchMotorbikes,
      updateMotorbikeStock
    }}>
      {children}
    </MotorbikeContext.Provider>
  );
};

MotorbikeProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useMotorbikes = () => {
  const context = useContext(MotorbikeContext);
  if (!context) {
    throw new Error('useMotorbikes must be used within a MotorbikeProvider');
  }
  return context;
};
