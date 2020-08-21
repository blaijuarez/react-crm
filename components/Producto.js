import Swal from 'sweetalert2'

export default function Producto({ producto }) {
  const { nombre, existencia, precio } = producto

  // Eliminar producto
  const confirmarEliminarProducto = () => {
    Swal.fire({
      title: `Vas a eliminar ${nombre} de tu inventario`,
      text: 'Una vez eliminado no se podrá recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then(async result => {
      if (result.value) {
      }
    })
  }

  return (
    <tr>
      <td className="border px-4 py-2">{nombre}</td>
      <td className="border px-4 py-2">{existencia} unidades</td>
      <td className="border px-4 py-2">{precio} €</td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          onClick={confirmarEliminarProducto}
        >
          Eliminar
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="x-circle w-4 h-4 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          // onClick={() => editarCliente()}
        >
          Editar
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="pencil-alt w-4 h-4 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
      </td>
    </tr>
  )
}
