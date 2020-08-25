export default function ProductoResumen({ producto }) {
  const { nombre, precio } = producto

  return (
    <div className="md:flex md:justify-between md:items-center mt-5">
      <div className="md:w-2/4 mb-2 md:mb-0">
        <p className="text-sm">{nombre}</p>
        <p>{precio}€</p>
      </div>
      <input
        className="shadow apperance-none border rounder w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
        type="number"
        placeholder="Cantidd"
      />
    </div>
  )
}
