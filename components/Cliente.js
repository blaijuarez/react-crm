import Swal from 'sweetalert2'
import { useMutation } from '@apollo/client'
import { ELIMINAR_CLIENTE } from 'config/queries'

export default function Cliente({ cliente }) {
  const { id, nombre, apellido, empresa, email } = cliente

  // Mutation eliminar cliente
  const [ eliminarCliente ] = useMutation(ELIMINAR_CLIENTE)
  
  // Eliminar cliente
  const confirmarEliminarCliente = (id, nombre, apellido) => {
    Swal.fire({
      title: `¿Quieres eliminar a ${nombre} ${apellido}?`,
      text: 'Una vez eliminado no se podrá recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then(async (result) => {
      if (result.value) {
        try {
          // Eliminar de la BBDD por ID
          const { data } = await eliminarCliente({ 
            variables: { id }
          });

          // Mostrar alerta
          Swal.fire(
            '¡Eliminado!',
            data.eliminarCliente,
            'success'
          )
        } catch (error) {
          
        }
      }
    })
  }

  return (
    <tr>
      <td className="border px-4 py-2">{nombre} {apellido}</td>
      <td className="border px-4 py-2">{empresa}</td>
      <td className="border px-4 py-2">{email}</td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          onClick={() => confirmarEliminarCliente(id, nombre, apellido)}
        >
          Eliminar
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="x-circle w-4 h-4 ml-2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </td>
    </tr>
  )
}