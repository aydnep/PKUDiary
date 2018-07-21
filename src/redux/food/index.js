import { Map } from 'immutable';

const initialState = Map({

});

export default (state = initialState, action) => {
  switch (action.type) {
  default: return state;
  }
};

const addFood = food => ({ type: 'ADD_FOOD', payload: food });

export const actions = {
  addFood,
};
