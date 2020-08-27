import { useReducer } from 'react'
import PedidoContext from './PedidoContext'
import PedidoReducer from './PedidoReducer'
import {
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
  CANTIDAD_PRODUCTOS,
  ACTUALIZAR_TOTAL
} from 'types'
import { ACTUALIZAR_CLIENTE } from 'config/queries'

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
    if (!productos) return {}
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

  // Actualiza el total del producto
  const actualizarTotal = () => {
    dispatch({
      type: ACTUALIZAR_TOTAL
    })
  }

  return (
    <PedidoContext.Provider
      value={{
        cliente: state.cliente,
        productos: state.productos,
        total: state.total,
        agregarCliente,
        agregarProducto,
        cantidadProductos,
        actualizarTotal
      }}
    >
      {children}
    </PedidoContext.Provider>
  )
}
