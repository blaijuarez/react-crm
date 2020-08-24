import PedidoContext from './PedidoContext'
import {
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
  CANTIDAD_PRODUCTOS
} from 'types'

export default function PedidoReducer(state, action) {
  switch (action.type) {
    case SELECCIONAR_CLIENTE:
      return {
        ...state,
        cliente: action.payload
      }
    case SELECCIONAR_PRODUCTO:
      return {
        ...state,
        productos: action.payload
      }
    default:
      return state
  }
}
