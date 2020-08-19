import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router'

const OBTENER_USUARIO = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id
      nombre
      apellido
    }
  }
`

export default function Header() {
  // Router
  const router = useRouter()
  
  // Query Apollo
  const { data, loading, error } = useQuery(OBTENER_USUARIO)

  if (loading) return null
  
  if (!data) {
    return  router.push('/login')
  }

  const { nombre, apellido } = data.obtenerUsuario

  const cerrarSesion = () => {
    sessionStorage.removeItem('token')
    router.push('/login')
  }

  return (
    <div className="flex justify-between mb-6">
      <p className="mr-2">Hola {nombre} {apellido}</p>

      <button
        onClick={cerrarSesion}
        type="button"
        className="bg-blue-800 w-full sm:w-auto font-bold uppecase text-xs text-white rounded py-1 px-2 shadow-md"
      >
        Cerrar sesión
      </button>
    </div>
  )
}