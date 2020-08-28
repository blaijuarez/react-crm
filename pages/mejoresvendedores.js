import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { MEJORES_VENDEDORES } from 'config/queries'
import Layout from 'components/Layout'

export default function MejoresVendedores() {
  // Query para obtener los mejores vendedores
  const { data, loading, startPolling, stopPolling } = useQuery(
    MEJORES_VENDEDORES
  )

  useEffect(() => {
    startPolling(1000)
    return () => {
      stopPolling()
    }
  }, [startPolling, stopPolling])

  if (loading) return 'Cargando...'

  const { mejoresVendedores } = data

  const vendedorGrafica = mejoresVendedores.map(({ vendedor, total }) => ({
    ...vendedor[0],
    total
  }))

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Mejores Vendedores</h1>

      <ResponsiveContainer width={'99%'} height={550}>
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
      </ResponsiveContainer>
    </Layout>
  )
}
