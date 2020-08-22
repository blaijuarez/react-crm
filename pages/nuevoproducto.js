import Layout from 'components/Layout'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { NUEVO_PRODUCTO, OBTENER_PRODUCTOS } from 'config/queries'

export default function NuevoProducto() {
  // Mutation de Apollo
  const [nuevoProducto] = useMutation(NUEVO_PRODUCTO, {
    update(cache, { data: { nuevoProducto } }) {
      // obtener el objeto de caché
      const { obtenerProductos } = cache.readQuery({ query: OBTENER_PRODUCTOS })
      // reescribir ese objeto
      cache.writeQuery({
        query: OBTENER_PRODUCTOS,
        data: { obtenerProductos: [...obtenerProductos, nuevoProducto] }
      })
    }
  })

  // Routing
  const router = useRouter()

  // Formulario para nueevos productos
  const formik = useFormik({
    initialValues: {
      nombre: '',
      existencia: '',
      precio: ''
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nombre del producto es obligatorio'),
      existencia: Yup.number()
        .required('Escribe la cantidad disponible')
        .positive('No se aceptan números negativos')
        .integer('Solo números enteros'),
      precio: Yup.number()
        .required('El precio es obligatorio')
        .positive('No se aceptan números negativos')
    }),
    onSubmit: async values => {
      try {
        const {
          data: { nuevoProducto: data }
        } = await nuevoProducto({
          variables: {
            input: { ...values }
          }
        })

        // Texto para unidades
        const unidadesTxt = data.existencia === 1 ? 'unidad' : 'unidades'

        // Mostrar alert de confirmación
        Swal.fire(
          '¡Producto creado!',
          `Se regitró ${data.existencia} ${unidadesTxt} de ${data.nombre}`,
          'success'
        )

        // Redireccionar a productos
        router.push('/productos')
      } catch (error) {
        console.log(error)
      }
    }
  })
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">
        Crear Nuevo Producto
      </h1>
      <div className="flex justify-enter mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-mb px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nombre}
              />
            </div>

            {formik.touched.nombre && formik.errors.nombre ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.nombre}</p>
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.existencia}
              />
            </div>

            {formik.touched.existencia && formik.errors.existencia ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.existencia}</p>
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.precio}
              />
            </div>

            {formik.touched.precio && formik.errors.precio ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.precio}</p>
              </div>
            ) : null}

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
              value="Crear producto"
            ></input>
          </form>
        </div>
      </div>
    </Layout>
  )
}
