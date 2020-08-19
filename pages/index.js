import { gql, useQuery } from '@apollo/client'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import Link from 'next/link'

const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`

export default function Index() {
  // Router
  const router = useRouter()

  // Consulta Apollo
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO)

  if(loading) return ('Cargando...')
  
  if (!data.obtenerClientesVendedor) {
    router.push('/login')
    return null
  }

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
        <Link href="/nuevocliente">
          <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">Nuevo cliente</a>
        </Link>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Empresa</th>
              <th className="w-1/5 py-2">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            { data.obtenerClientesVendedor.map(({id, nombre, apellido, empresa, email}) => (
              <tr key={id}>
                <td className="border px-4 py-2">{nombre} {apellido}</td>
                <td className="border px-4 py-2">{empresa}</td>
                <td className="border px-4 py-2">{email}</td>
              </tr>
            )) }
          </tbody>
        </table>
      </Layout>
    </div>
  )
}
