import Layout from 'components/Layout'
import AsignarCliente from 'components/pedidos/AsignarCliente'

export default function NuevoPedido() {
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido</h1>
      <AsignarCliente />
    </Layout>
  )
}
