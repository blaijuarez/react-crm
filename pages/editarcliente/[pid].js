import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import { useQuery, useMutation } from '@apollo/client'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { OBTENER_CLIENTE, ACTUALIZAR_CLIENTE } from 'config/queries'

export default function EditarCliente() {
  // Obtener ID vía queryparams
  const router = useRouter()
  const {
    query: { id }
  } = router

  // Consultar cliente
  const { data, loading } = useQuery(OBTENER_CLIENTE, {
    variables: {
      id
    }
  })

  // Actualizar el cliente
  const [actualizarCliente] = useMutation(ACTUALIZAR_CLIENTE)

  // Scheema de validación
  const schemaValidacion = Yup.object({
    nombre: Yup.string().required('El nombre es obligatorio'),
    apellido: Yup.string().required('El apellido es obligatorio'),
    empresa: Yup.string().required('El campo empresa es obligatorio'),
    email: Yup.string()
      .email('El email no es válido')
      .required('El email es obligatorio')
  })

  if (loading) return 'Cargando...'

  const { obtenerCliente } = data

  // Modifica cliente en la BBDD
  const actualizarDatosCliente = async values => {
    const { nombre, apellido, empresa, email, telefono } = values
    try {
      await actualizarCliente({
        variables: {
          id,
          input: { nombre, apellido, empresa, email, telefono }
        }
      })

      // Mostrar alerta
      Swal.fire(
        '¡Actualizado!',
        'El cliente se actualizó correctamente',
        'success'
      )

      // Redireccionar al listado de clientes
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar Cliente</h1>

      <div className="flex justify-enter mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={schemaValidacion}
            enableReinitialize
            initialValues={obtenerCliente}
            onSubmit={actualizarDatosCliente}
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
                      placeholder="Nombre cliente"
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
                      htmlFor="apellido"
                    >
                      Apellido
                    </label>
                    <input
                      className="shadow appareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="apellido"
                      type="text"
                      placeholder="Apellido cliente"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.apellido}
                    />
                  </div>

                  {props.touched.apellido && props.errors.apellido ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.apellido}</p>
                    </div>
                  ) : null}

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="empresa"
                    >
                      Empresa
                    </label>
                    <input
                      className="shadow appareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="empresa"
                      type="text"
                      placeholder="Empresa cliente"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.empresa}
                    />
                  </div>

                  {props.touched.empresa && props.errors.empresa ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.empresa}</p>
                    </div>
                  ) : null}

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="shadow appareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="text"
                      placeholder="Email cliente"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.email}
                    />
                  </div>

                  {props.touched.email && props.errors.email ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.email}</p>
                    </div>
                  ) : null}

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="telefono"
                    >
                      Telefono
                    </label>
                    <input
                      className="shadow appareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="telefono"
                      type="tel"
                      placeholder="Telefono cliente"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.telefono}
                    />
                  </div>

                  {props.touched.telefono && props.errors.telefono ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.telefono}</p>
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
