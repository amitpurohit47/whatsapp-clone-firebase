import React, { createContext,useContext,useReducer } from 'react';

export const StateContext = createContext(); // the data layer where the state lives

export const StateProvider = ({reducer,initialState,children}) => (
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
);
// setup the state mechanism

export const useStateValue = () => useContext(StateContext); // pull data from state