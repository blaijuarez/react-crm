import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { OBTENER_PRODUCTO } from 'config/queries'
import Layout from 'components/Layout'

export default function EditarProducto({ producto }) {
  const router = useRouter()
  const {
    query: { id }
  } = router

  console.log(id)

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar Producto</h1>
    </Layout>
  )
}
