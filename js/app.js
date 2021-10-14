const carrito = document.getElementById("carrito");
const productos = document.getElementById("lista-productos");
const listaproductos = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

cargarEventListeners();

function cargarEventListeners() {
  productos.addEventListener("click", comprarProducto);
  carrito.addEventListener("click", eliminarProducto);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

function comprarProducto(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const producto = e.target.parentElement.parentElement;
        leerDatosProducto(producto);
    }
}

function leerDatosProducto(producto){
    const infoproducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h4').textContent,
        precio: producto.querySelector('.precio span').textContent,
        id: producto.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoproducto);
}

function insertarCarrito(producto) {
    const row = document.createElement('tr');
    row.innerHTML = `
       <td>
           <img src="${producto.imagen}" width=100> 
       </td> 
       <td>${producto.titulo}</td>
       <td>${producto.precio}</td>
       <td>
        <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
       </td>
    `;
    listaproductos.appendChild(row);
    guardarproductoLocalStorage(producto);
}

function eliminarProducto(e) {
    e.preventDefault();

    let producto,
        productoId;
    
    if(e.target.classList.contains('borrar-producto')) {
        e.target.parentElement.parentElement.remove();
        producto = e.target.parentElement.parentElement;
        productoId = producto.querySelector('a').getAttribute('data-id');
    }
    eliminarProductoLocalStorage(productoId)
}

function vaciarCarrito(){
    while(listaproductos.firstChild){
        listaproductos.removeChild(listaproductos.firstChild);
    }
    vaciarLocalStorage();

    return false;
}

function guardarproductoLocalStorage(producto) {
    let productos;

    productos = obtenerproductosLocalStorage();
    productos.push(producto);

    localStorage.setItem('productos', JSON.stringify(productos));
}

function obtenerproductosLocalStorage() {
    let productosLS;

    if(localStorage.getItem('productos') === null) {
        productosLS = [];
    }else {
        productosLS = JSON.parse(localStorage.getItem('productos'));
    }
    return productosLS;
}

function leerLocalStorage() {
    let productosLS;

    productosLS = obtenerproductosLocalStorage();

    productosLS.forEach(function(producto){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
            </td>
        `;
        listaproductos.appendChild(row);
    });
}

function eliminarProductoLocalStorage(producto) {
    let productosLS;
    productosLS = obtenerproductosLocalStorage();

    productosLS.forEach(function(productoLS, index){
        if(productoLS.id === producto) {
            productosLS.splice(index, 1);
        }
    });

    localStorage.setItem('productos', JSON.stringify(productosLS));
}

function vaciarLocalStorage() {
    localStorage.clear();
}




