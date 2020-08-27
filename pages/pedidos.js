import Layout from 'components/Layout'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { OBTENER_PEDIDOS } from 'config/queries'
import Pedido from 'components/Pedido'

export default function Pedidos() {
  const { data, loading } = useQuery(OBTENER_PEDIDOS)

  console.log(data)

  if (loading) return 'Cargando...'

  const { obtenerPedidosVendedor } = data

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>

        <Link href="/nuevopedido">
          <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">
            Nuevo Pedido
          </a>
        </Link>
        {obtenerPedidosVendedor.length ? (
          obtenerPedidosVendedor.map(pedido => (
            <Pedido key={pedido.id} pedido={pedido} />
          ))
        ) : (
          <p className="mt-5 text-center text-2xl">No hay pedidos</p>
        )}
      </Layout>
    </div>
  )
}
