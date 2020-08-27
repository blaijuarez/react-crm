import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { ACTUALIZAR_PEDIDO } from 'config/queries'

export default function Pedido({ pedido }) {
  const {
    id,
    total,
    cliente,
    cliente: { nombre, apellido, email, telefono },
    estado,
    pedido: pedidoInfo
  } = pedido

  const ESTADO = {
    COMPLETADO: 'COMPLETADO',
    PENDIENTE: 'PENDIENTE',
    CANCELADO: 'CANCELADO'
  }

  // Mutation para cambiar el estado del pedido
  const [actualizarPedido] = useMutation(ACTUALIZAR_PEDIDO)

  const [estadoPedido, setEstadoPedido] = useState(estado)
  const [clase, setClase] = useState('')

  useEffect(() => {
    if (estadoPedido) {
      setEstadoPedido(estadoPedido)
    }
    clasePedido()
  }, [estadoPedido])

  // Modifica el color del pedido según el estado
  const clasePedido = () => {
    switch (estadoPedido) {
      case ESTADO.COMPLETADO:
        setClase('border-green-500')
        break
      case ESTADO.PENDIENTE:
        setClase('border-yellow-500')
        break
      default:
        setClase('border-red-800')
        break
    }
  }

  const cambiarEstadoPedido = async nuevoEstado => {
    try {
      const { data } = await actualizarPedido({
        variables: {
          id,
          input: {
            estado: nuevoEstado,
            cliente: cliente.id
          }
        }
      })
      console.log(data)
      setEstadoPedido(nuevoEstado)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className={`${clase} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}
    >
      <div>
        <p className="font-bold text-gray-800">
          Cliente: {nombre} {apellido}
        </p>

        {email && (
          <p className="flex items-center my-2">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="mail w-4 h-4 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {email}
          </p>
        )}

        {telefono && (
          <p className="flex items-center my-2">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="phone w-4 h-4 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            {telefono}
          </p>
        )}

        <h2 className="text-gray-800 font-bold mt-10">Estado Pedido:</h2>
        <select
          value={estadoPedido}
          className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
          onChange={({ target }) => cambiarEstadoPedido(target.value)}
        >
          <option value={ESTADO.COMPLETADO}>{ESTADO.COMPLETADO}</option>
          <option value={ESTADO.PENDIENTE}>{ESTADO.PENDIENTE}</option>
          <option value={ESTADO.CANCELADO}>{ESTADO.CANCELADO}</option>
        </select>
      </div>
      <div>
        <h2 className="ext-gray-800 font-bold-mt-2">Resumen del pedido</h2>
        {pedidoInfo.map(({ id, nombre, cantidad }) => (
          <div key={id} className="mt-4">
            <p className="text-sm text-gray-600">Producto: {nombre}</p>
            <p className="text-sm text-gray-600">Cantidad: {cantidad}</p>
          </div>
        ))}
        <p className="text-gray-800 mt-3 font-bold">
          Total a Pagar:
          <span className="font-light ml-2">{total}€</span>
          <button className="flex items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight uppercase text-xs text-bold">
            Eliminar Pedido
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="x-circle w-4 h-4 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </p>
      </div>
    </div>
  )
}
