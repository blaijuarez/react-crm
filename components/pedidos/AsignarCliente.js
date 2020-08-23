import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useQuery } from '@apollo/client'
import { OBTENER_CLIENTES_USUARIO } from 'config/queries'

export default function AsignarCliente() {
  const [cliente, setCliente] = useState([])

  // Consultar BBDD
  const { data, loading } = useQuery(OBTENER_CLIENTES_USUARIO)

  useEffect(() => {
    console.log(cliente)
  }, [cliente])

  if (loading) return null

  const { obtenerClientesVendedor } = data

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        1.- Asigna un cliente al pedido
      </p>
      <Select
        className="mt-3"
        options={obtenerClientesVendedor}
        getOptionValue={opt => opt.id}
        getOptionLabel={opt => opt.nombre}
        onChange={setCliente}
        placeholder="Busca o selecciona el cliente"
        noOptionsMessage={() => 'No hay resultados'}
      />
    </>
  )
}
