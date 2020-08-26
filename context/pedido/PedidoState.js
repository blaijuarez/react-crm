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
    const productosCantidad = () =>
      productos.map(producto => {
        const productoState = state.productos.find(
          ({ id }) => id === producto.id
        )
        return { ...producto, ...productoState }
      })

    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: state.productos.length ? productosCantidad() : productos
    })
  }

  // modifica las cantidades de los productos
  const cantidadProductos = nuevoProducto => {
    dispatch({
      type: CANTIDAD_PRODUCTOS,
      payload: nuevoProducto
    })
  }

  return (
    <PedidoContext.Provider
      value={{
        productos: state.productos,
        agregarCliente,
        agregarProducto,
        cantidadProductos
      }}
    >
      {children}
    </PedidoContext.Provider>
  )
}
