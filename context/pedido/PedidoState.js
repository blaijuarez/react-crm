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
    cliente: [],
    productos: [],
    total: 0
  }

  const [state, dispatch] = useReducer(PedidoReducer, initialState)

  const holaMundo = () => {
    console.log('Hola desde PedidoState')
  }

  return (
    <PedidoContext.Provider
      value={{
        holaMundo
      }}
    >
      {children}
    </PedidoContext.Provider>
  )
}
