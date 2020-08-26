import { useContext, useState, useEffect } from 'react'
import PedidoContext from 'context/pedido/PedidoContext'

export default function ProductoResumen({ producto }) {
  // Context de pedidos
  const pedidoContext = useContext(PedidoContext)
  const { cantidadProductos, actualizarTotal } = pedidoContext

  const [cantidad, setCantidad] = useState(0)

  const actualizarCantidad = () => {
    const nuevoProducto = { ...producto, cantidad: Number(cantidad) }
    cantidadProductos(nuevoProducto)
  }

  useEffect(() => {
    actualizarCantidad()
    actualizarTotal()
  }, [cantidad])

  const { nombre, precio } = producto

  return (
    <div className="md:flex md:justify-between md:items-center mt-5">
      <div className="md:w-2/4 mb-2 md:mb-0">
        <p className="text-sm">{nombre}</p>
        <p>{precio}€</p>
      </div>
      <input
        className="shadow apperance-none border rounder w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
        type="number"
        placeholder="Cantidad"
        onChange={e => setCantidad(e.target.value)}
        value={cantidad}
      />
    </div>
  )
}
