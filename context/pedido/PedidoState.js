import { useReducer } from 'react'
import PedidoContext from './PedidoContext'
import PedidoReducer from './PedidoReducer'
import {
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
  CANTIDAD_PRODUCTOS
} from 'types'

export default function PedidoState({ children }) {
  // State de Pedidos
  const initialState = {
    cliente: {},
    productos: [],
    total: 0
  }

  const [state, dispatch] = useReducer(PedidoReducer, initialState)

  // Modifica cliente
  const agregarCliente = cliente => {
    dispatch({
      type: SELECCIONAR_CLIENTE,
      payload: cliente
    })
  }

  const agregarProducto = productos => {
    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: productos
    })
  }

  return (
    <PedidoContext.Provider
      value={{
        productos: state.productos,
        agregarCliente,
        agregarProducto
      }}
    >
      {children}
    </PedidoContext.Provider>
  )
}
