import { useEffect, useState, useContext } from 'react'
import Select from 'react-select'
import { useQuery } from '@apollo/client'
import PedidoContext from 'context/pedido/PedidoContext'
import { OBTENER_PRODUCTOS } from 'config/queries'

export default function AsignarProducto() {
  // State local del componente
  const [productos, setProductos] = useState([])

  // Context de pedidos
  const pedidoContext = useContext(PedidoContext)
  const { agregarProducto } = pedidoContext

  // Consulta a la BBDD
  const { data, loading } = useQuery(OBTENER_PRODUCTOS)

  useEffect(() => {
    agregarProducto(productos)
  }, [productos])

  if (loading) return null

  const { obtenerProductos } = data

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        2.- Selecciona o busca los productos
      </p>
      <Select
        className="mt-3"
        options={obtenerProductos}
        isMulti={true}
        getOptionValue={opt => opt.id}
        getOptionLabel={opt => `${opt.nombre} - ${opt.existencia} Disponibles`}
        onChange={setProductos}
        placeholder="Busca o selecciona el producto"
        noOptionsMessage={() => 'No hay resultados'}
      />
    </>
  )
}
