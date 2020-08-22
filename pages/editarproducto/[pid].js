import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@apollo/client'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { OBTENER_PRODUCTO, ACTUALIZAR_PRODUCTO } from 'config/queries'
import Layout from 'components/Layout'

export default function EditarProducto() {
  const router = useRouter()
  const {
    query: { id }
  } = router

  // Consultar producto
  const { data, loading } = useQuery(OBTENER_PRODUCTO, {
    variables: {
      id
    }
  })

  // Actualizar el producto
  const [actualizarProducto] = useMutation(ACTUALIZAR_PRODUCTO)

  // Scheema de validación
  const schemaValidacion = Yup.object({
    nombre: Yup.string().required('El nombre del producto es obligatorio'),
    existencia: Yup.number()
      .required('Escribe la cantidad disponible')
      .positive('No se aceptan números negativos')
      .integer('Solo números enteros'),
    precio: Yup.number()
      .required('El precio es obligatorio')
      .positive('No se aceptan números negativos')
  })

  if (loading) return 'Cargando...'

  const { obtenerProducto } = data

  // Modifica producto en la BBDD
  const actualizarDatosProducto = async values => {
    const { nombre, existencia, precio } = values
    try {
      await actualizarProducto({
        variables: {
          id,
          input: { nombre, existencia, precio }
        }
      })

      // Mostrar alerta
      Swal.fire(
        '¡Actualizado!',
        'El producto se actualizó correctamente',
        'success'
      )

      // Redireccionar al listado de productos
      router.push('/productos')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar Producto</h1>

      <div className="flex justify-enter mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={schemaValidacion}
            enableReinitialize
            initialValues={obtenerProducto}
            onSubmit={actualizarDatosProducto}
          >
            {props => {
              return (
                <form
                  className="bg-white shadow-mb px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
                >
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="nombre"
                    >
                      Nombre
                    </label>
                    <input
                      className="shadow appareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="nombre"
                      type="text"
                      placeholder="Nombre del producto"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.nombre}
                    />
                  </div>

                  {props.touched.nombre && props.errors.nombre ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.nombre}</p>
                    </div>
                  ) : null}

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="existencia"
                    >
                      Cantidad disponible
                    </label>
                    <input
                      className="shadow appareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="existencia"
                      type="number"
                      placeholder="Cantidad disponible"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.existencia}
                    />
                  </div>

                  {props.touched.existencia && props.errors.existencia ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.existencia}</p>
                    </div>
                  ) : null}

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="precio"
                    >
                      Precio
                    </label>
                    <input
                      className="shadow appareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="precio"
                      type="number"
                      placeholder="Precio del producto"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.precio}
                    />
                  </div>

                  {props.touched.precio && props.errors.precio ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.precio}</p>
                    </div>
                  ) : null}

                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                    value="Guardar cambios"
                  ></input>
                </form>
              )
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  )
}
