
var carritoVisible = false;


if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    
    
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }

   
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

   
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}

function pagarClicked() {
    
    var productosComprados = [];

    
    var carritoItems = document.querySelectorAll('.carrito-item');

   
    var totalCompra = 0;

    
    carritoItems.forEach(function(item) {
        var titulo = item.querySelector('.carrito-item-titulo').innerText;
        var cantidad = item.querySelector('.carrito-item-cantidad').value;
        var precio = item.querySelector('.carrito-item-precio').innerText;

        productosComprados.push({
            titulo: titulo,
            cantidad: cantidad,
            precio: precio
        });

       
        var precioNumerico = parseFloat(precio.replace('$', '').replace(',', ''));
        totalCompra += precioNumerico * cantidad;
    });

   
    var contenidoHTML = '<html><head><title>¡GRACIAS POR TU COMPRA!</title></head><body><h1>TICKET DE COMPRA</h1><ul>';

    productosComprados.forEach(function(producto) {
        contenidoHTML += '<li><strong>' + producto.titulo + '</strong>: Cantidad: ' + producto.cantidad + ', Precio: ' + producto.precio + '</li>';
    });

    contenidoHTML += '</ul><h2>Total de la compra: $' + totalCompra.toFixed(2) + '</h2></body><script>window.onbeforeunload = function() { window.opener.location.reload(); }</script></html>';

    
    var nuevaVentana = window.open();
    nuevaVentana.document.write(contenidoHTML);

    
    nuevaVentana.onbeforeunload = function() {
        document.querySelector('.carrito-items').innerHTML = '';
        actualizarTotalCarrito();
    };

    
    document.querySelector('.carrito-items').innerHTML = '';
    actualizarTotalCarrito();
}


function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}


function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items =document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}


function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

   
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0;i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

    
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    
    actualizarTotalCarrito();
}

function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}

function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}


function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
   
    actualizarTotalCarrito();

    
    ocultarCarrito();
}

function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
    
        var items =document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}

function actualizarTotalCarrito(){
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var subtotal = 0;

    for(var i = 0; i < carritoItems.length; i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];

        var precio = parseFloat(precioElemento.innerText.replace('$','').replace(',',''));
        var cantidad = parseInt(cantidadItem.value);
        var subtotalItem = precio * cantidad;
        
        subtotal += subtotalItem;
    }

    
    var iva = subtotal * 0.16;

   
    var total = subtotal;

    
    document.querySelector('.carrito-subtotal').innerText = '$' + (subtotal * 0.84).toFixed(2);
    document.querySelector('.carrito-iva').innerText = '$' + iva.toFixed(2);
    document.querySelector('.carrito-precio-total').innerText = '$' + total.toFixed(2);
}










