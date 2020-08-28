import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'
import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { MEJORES_CLIENTES } from 'config/queries'
import Layout from 'components/Layout'

export default function MejoresClientes(params) {
  // Query para obtener los mejores clientes
  const { data, loading, startPolling, stopPolling } = useQuery(
    MEJORES_CLIENTES
  )

  useEffect(() => {
    startPolling(1000)
    return () => {
      stopPolling()
    }
  }, [startPolling, stopPolling])

  if (loading) return 'Cargando...'

  const { mejoresClientes } = data

  const clientesGrafica = mejoresClientes.map(({ cliente, total }) => ({
    ...cliente[0],
    total
  }))

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Mejores Clientes</h1>

      <div className="ml-5">
        <BarChart
          className="mt-10"
          width={600}
          height={500}
          data={clientesGrafica}
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
      </div>
    </Layout>
  )
}
