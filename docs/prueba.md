Prueba Técnica React base (sin frameworks):

 

Desarrolla una aplicación SPA para web en react 100% responsive, en donde en la pantalla principal me muestra los diferentes productos que se encuentran consumiendo el servicio (GET - https://apim-dev-proxy.sodhc.co/test-jasson/api/category) cada producto debe estar en un componente de Card, donde veamos :

Primera imágen Producto (mediaUrls)
Nombre Producto (displayName)
Precio Producto (prices)
Se debe implementar un navBar para poder buscar los productos, se deben sugerir al digital la búsqueda, los siguientes valores:
Silla, Escalera y Banco

 

Cuando se haga clic se abra el detalle del producto mostrando datos importantes del mismo y todas las imágenes en un componente de slider.

En la card, debemos tener un botón para agregar al carrito, con la cantidad de unidades a comprar.

 

Adicionalmente, debe tener un componente de cart, en donde se van alojando todos los productos que se desean comprar, cuando se finalice el carrito, se debe generar un archivo .json con los siguientes datos de compra: fechaCompra, sku, cantidad, valor total, subtotal, impuestos (todos tienen un iva del 19%)

 

(La adición, eliminación y cantidades se debe manejar mediante un hook o Redux al igual que el estado del carro)

 

El consumo del servicio debe tener control de errores por si llega a fallar por alguna razón.

 

Deseables:
* pruebas de carga y estrés en el consumo del servicio
* Pruebas unitarias sobre el consumo del servicio

 

En la validación de la prueba, se tendrán en cuenta las buenas prácticas de desarrollo, aplicación de principios SOLID y el uso de patrones de diseño.


Se valorará la claridad, mantenibilidad y escalabilidad del código entregado.