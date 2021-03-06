import { gql } from '@apollo/client'

export const NUEVO_CLIENTE = gql`
  mutation nuevoCliente($input: ClienteInput) {
    nuevoCliente(input: $input) {
      id
      nombre
      empresa
      email
      vendedor
    }
  }
`
export const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`
export const OBTENER_USUARIO = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id
      nombre
      apellido
    }
  }
`
export const AUTENTICAR_USUARIO = gql`
  mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`
export const CUENTA_NUEVA = gql`
  mutation nuevoUsuario($input: UsuarioInput) {
    nuevoUsuario(input: $input) {
      id
      nombre
      apellido
    }
  }
`
export const ELIMINAR_CLIENTE = gql`
  mutation eliminarCliente($id: ID!) {
    eliminarCliente(id: $id)
  }
`
export const OBTENER_CLIENTE = gql`
  query obtenerCliente($id: ID!) {
    obtenerCliente(id: $id) {
      nombre
      email
      apellido
      empresa
      email
      telefono
    }
  }
`
export const ACTUALIZAR_CLIENTE = gql`
  mutation actualizarCliente($id: ID!, $input: ClienteInput) {
    actualizarCliente(id: $id, input: $input) {
      nombre
      email
    }
  }
`
export const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      precio
      existencia
    }
  }
`
export const OBTENER_PRODUCTO = gql`
  query obtenerProducto($id: ID!) {
    obtenerProducto(id: $id) {
      nombre
      existencia
      precio
    }
  }
`
export const ELIMINAR_PRODUCTO = gql`
  mutation eliminarProducto($id: ID!) {
    eliminarProducto(id: $id)
  }
`
export const NUEVO_PRODUCTO = gql`
  mutation nuevoProducto($input: ProductoInput) {
    nuevoProducto(input: $input) {
      id
      nombre
      existencia
      precio
    }
  }
`
export const ACTUALIZAR_PRODUCTO = gql`
  mutation actualizarProducto($id: ID!, $input: ProductoInput) {
    actualizarProducto(id: $id, input: $input) {
      nombre
      existencia
      precio
    }
  }
`
export const NUEVO_PEDIDO = gql`
  mutation nuevoPedido($input: PedidoInput) {
    nuevoPedido(input: $input) {
      id
    }
  }
`
export const OBTENER_PEDIDOS = gql`
  query obtenerPedidosVendedor {
    obtenerPedidosVendedor {
      id
      pedido {
        id
        cantidad
        nombre
      }
      cliente {
        id
        nombre
        apellido
        email
        telefono
      }
      vendedor
      total
      estado
    }
  }
`
export const ACTUALIZAR_PEDIDO = gql`
  mutation actualizarPedido($id: ID!, $input: PedidoInput) {
    actualizarPedido(id: $id, input: $input) {
      estado
    }
  }
`
export const ELIMINAR_PEDIDO = gql`
  mutation eliminarPedido($id: ID!) {
    eliminarPedido(id: $id)
  }
`
export const MEJORES_VENDEDORES = gql`
  query mejoresVendedores {
    mejoresVendedores {
      vendedor {
        nombre
        email
      }
      total
    }
  }
`
export const MEJORES_CLIENTES = gql`
  query mejoresClientes {
    mejoresClientes {
      cliente {
        nombre
        empresa
      }
      total
    }
  }
`
