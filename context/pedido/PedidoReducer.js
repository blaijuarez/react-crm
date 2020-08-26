import PedidoContext from './PedidoContext'
import {
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
  CANTIDAD_PRODUCTOS,
  ACTUALIZAR_TOTAL
} from 'types'
import { ACTUALIZAR_CLIENTE } from 'config/queries'

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
    case CANTIDAD_PRODUCTOS:
      return {
        ...state,
        productos: state.productos.map(producto =>
          producto.id === action.payload.id ? action.payload : producto
        )
      }
    case ACTUALIZAR_TOTAL:
      return {
        ...state,
        total: state.productos.reduce(
          (acc, { precio, cantidad }) => acc + precio * cantidad,
          0
        )
      }

    default:
      return state
  }
}
