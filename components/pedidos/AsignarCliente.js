import { useState, useEffect } from 'react'
import Select from 'react-select'

// Select options
const clientes = [
  { id: 1, nombre: 'Blai Juárez' },
  { id: 2, nombre: 'Lara TJ' },
  { id: 3, nombre: 'Vanessa JA' }
]

export default function AsignarCliente() {
  const [cliente, setCliente] = useState([])

  useEffect(() => {
    console.log(cliente)
  }, [cliente])

  return (
    <Select
      isMulti={true}
      options={clientes}
      getOptionValue={opt => opt.id}
      getOptionLabel={opt => opt.nombre}
      onChange={setCliente}
      placeholder="Busca o selecciona el cliente"
      noOptionsMessage={() => 'No hay resultados'}
    />
  )
}
