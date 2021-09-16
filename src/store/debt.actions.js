import * as Actions from './debt.actionsTypes'

export function DividaPostRequest(payload) {
  return {
    type: Actions.DIVIDA_POST_REQUEST,
    payload,
  };
}