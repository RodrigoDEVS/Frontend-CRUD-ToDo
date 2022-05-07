# Proyecto Frontend CRUD de Tareas ToDo 

Proyecto frontend en ReactJS de un CRUD de tareas ToDo, consumiendo un backend realizado con Spring Boot.

## Mejoras Implementadas

En el proyecto se pueden evidenciar los siguientes cambios realizados con el fin de mejorar la aplicación:

### Aspecto Visual

Se instaló la dependencia react-bootstrap, se agregaron propiedades a algunos elementos para estilizarlos, se modificaron los formularios y las tablas para adaptar los estilos de react-bootstrap.

### Implementación de Rutas

Se realizó la instalación de la dependencia react-router-dom

se crea el componente con las rutas iniciales para la aplicación.

se crea la Landing Page y se implementa dentro del App.js para que al cargar la aplicación arranque desde esta.

### Refactorización y Funcionalidad

Se limpió App.js y se configuró la ruta inicial "/" para que la aplicación inicie desde la Landing Page.

Se agregó el contexto para la conexión con la api, se implementó el uso de este contexto en todas las peticiones dentro de un template string

Se agrega el checkbox junto con su función onChange para manejar el evento del checked y cambiar el estado de completed de true a false y viceversa, de igual manera en el mismo campo se dejó el texto Si y No para comfirmar los cambios.

## Video de Implementación

https://youtu.be/KqbABpmuy5c

