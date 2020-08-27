import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'
import { useQuery } from '@apollo/client'
import { MEJORES_VENDEDORES } from 'config/queries'
import Layout from 'components/Layout'

export default function MejoresVendedores(params) {
  // Query para obtener los mejores vendedores
  const {
    data: { mejoresVendedores },
    loading
  } = useQuery(MEJORES_VENDEDORES)

  if (loading) return 'Cargando...'

  const vendedorGrafica = mejoresVendedores.map(({ vendedor, total }) => ({
    ...vendedor[0],
    total
  }))

  return (
    <Layout>
      <h1>MejoresVendedores</h1>
      <BarChart
        className="mt-10"
        width={600}
        height={500}
        data={vendedorGrafica}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="nombre" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#3182CE" />
      </BarChart>
    </Layout>
  )
}
