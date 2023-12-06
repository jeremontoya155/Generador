let v1;
window.addEventListener('resize', function() {
  // Actualizar el tamaño del lector QR en respuesta a cambios de tamaño de la ventana
  const preview = document.getElementById('preview');
  const maxWidth = window.innerWidth < 600 ? 300 : 400;
  preview.style.maxWidth = maxWidth + 'px';
});
document.addEventListener("DOMContentLoaded", function () {
    // Selector de cámaras
    const cameraSelector = document.getElementById('cameraSelector');

    // Configuración e inicialización del lector
    let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });

    // Manejar la lectura del código QR
    scanner.addListener('scan', function (content) {
        console.log('Contenido del código QR:', content);
       
            // Convertir la cadena JSON a un objeto JavaScript
        // Reemplazar comillas simples con comillas dobles
var jsonStringConComillasDobles = content.replace(/'/g, '"');


// Agregar comillas dobles a las claves
var jsonStringConClavesConComillasDobles = jsonStringConComillasDobles.replace(/(\w+)\s*:/g, '"$1":');

// Usar eval para convertir la cadena en un objeto
var objetoDesdeString = eval('(' + jsonStringConClavesConComillasDobles + ')');
      
// Construir el mensaje de alerta
// Construir el mensaje de alerta personalizado
var mensajeAlerta = "PRODUCTO: " + objetoDesdeString.Detalle + "\n PRECIO: $" + objetoDesdeString.Precio;

// Mostrar el SweetAlert con título modificado y texto blanco
Swal.fire({
    title: 'BIENVENIDO',
    text: mensajeAlerta,
    confirmButtonText: 'Regresar',
    background: '#333',
    customClass: {
        title: 'mi-titulo-clase',
        popup: 'mi-popup-clase',
        content: 'mi-contenido-clase',
        confirmButton: 'mi-boton-clase',
        closeButton: 'mi-boton-clase' // Agregado para cambiar el color del botón de cerrar
    }
});



// Mostrar un alert con los valores del código QR en el formato deseado


        // Convertir la cadena JSON a un objeto JavaScript
    
        
        // Parsear el contenido del código QR como JSON
        
    });

    // Obtener cámaras disponibles
    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            // Llenar el selector de cámaras
            cameras.forEach((camera, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.text = camera.name || `Cámara ${index + 1}`;
                cameraSelector.add(option);
            });

            // Actualizar el lector cuando se cambia la cámara
            cameraSelector.addEventListener('change', function () {
                const selectedCamera = cameras[cameraSelector.value];
                scanner.start(selectedCamera);
            });

            // Iniciar el lector con la primera cámara disponible
            scanner.start(cameras[0]);
        } else {
            console.error('No se encontraron cámaras en el dispositivo.');
        }
    }).catch(function (e) {
        console.error(e);
    });
});

function mostrarDialogo() {
  document.getElementById('dialogo').style.display = 'flex';
}

function cerrarDialogo() {
  document.getElementById('dialogo').style.display = 'none';
}