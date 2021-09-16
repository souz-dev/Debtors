import Immutable from 'seamless-immutable'

import * as actions from './debt.actionsTypes'

const initialState = Immutable({
  divida: undefined,
  dividas: []  
});

export default function Reducer(state = initialState , action){
  switch (action.type){
    case actions.DIVIDA_POST_REQUEST:
      return state.merge({dividas: action.payload.data})
    default:
      return state;
  }
}