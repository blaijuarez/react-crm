import Layout from 'components/Layout'
import { useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { NUEVO_PRODUCTO } from 'config/queries'

export default function NuevoProducto() {
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
    onSubmit: async values => {}
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
                type="number"
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
                type="text"
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
