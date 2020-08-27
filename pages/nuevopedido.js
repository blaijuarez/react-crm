import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { useMutation } from '@apollo/client'
import Layout from 'components/Layout'
import AsignarCliente from 'components/pedidos/AsignarCliente'
import AsignarProductos from 'components/pedidos/AsignarProductos'
import ResumenPedido from 'components/pedidos/ResumenPedido'
import Total from 'components/pedidos/Total'
import { NUEVO_PEDIDO } from 'config/queries'

// Context de Pedidos
import PedidoContext from 'context/pedido/PedidoContext'

export default function NuevoPedido() {
  const router = useRouter()

  const [mensaje, setMensaje] = useState(null)

  // utilizar context y usar sus funciones y valores
  const pedidoContext = useContext(PedidoContext)
  const { cliente, productos, total } = pedidoContext

  // Mutation de nuevo pedido
  const [nuevoPedido] = useMutation(NUEVO_PEDIDO)

  const validarPedido = () => {
    return !productos.every(({ cantidad }) => cantidad > 0) ||
      !total ||
      !cliente
      ? 'opacity-50 cursor-not-allowed'
      : ''
  }

  const crearNuevoPedido = async values => {
    const { id } = cliente

    const pedido = productos.map(
      ({ __typename, existencia, ...producto }) => producto
    )

    try {
      const data = await nuevoPedido({
        variables: {
          input: {
            cliente: id,
            total,
            pedido
          }
        }
      })

      // Redireccionar
      router.push('/pedidos')

      // Mostrar alert
      Swal.fire('Correcto!', 'El pedido se registró correctamente', 'success')
    } catch (error) {
      setMensaje(error.message.replace('GraphQL error: ', ''))
      setTimeout(() => {
        setMensaje(null)
      }, 3000)
    }
  }

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{mensaje}</p>
      </div>
    )
  }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido</h1>
      {mensaje && mostrarMensaje()}
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AsignarCliente />
          <AsignarProductos />
          <ResumenPedido />
          <Total />

          <button
            type="button"
            className={`${validarPedido()} bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900`}
            onClick={crearNuevoPedido}
          >
            Registrar Pedido
          </button>
        </div>
      </div>
    </Layout>
  )
}
