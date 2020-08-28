import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { OBTENER_USUARIO } from 'config/queries'

export default function Header() {
  // Router
  const router = useRouter()

  // Query Apollo
  const { data, loading } = useQuery(OBTENER_USUARIO)

  if (loading) return null

  if (!data.obtenerUsuario) {
    router.push('/login')
    return null
  }

  const { nombre, apellido } = data.obtenerUsuario

  const cerrarSesion = () => {
    sessionStorage.removeItem('token')
    router.push('/login')
  }

  return (
    <div className="sm:flex sm:justify-between mb-6">
      <p className="mr-2 mb-5 lg:mb-0">
        Hola {nombre} {apellido}
      </p>

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
