import { app } from "./app.js"

//Ejemplo de importacion de dotenv para leer variables de entorno (datos) que están en el archivo
//.env
import dotenv from 'dotenv';
dotenv.config();

//En siguientes clases este archivo se ocupará de inicializar nuestro servidor
//Actualmente solo muestra un log en la termininal con un string y otro con el objeto importado
//desde el archivo app (para demostras la correcta conexión entre ambos archivos)
console.log('Aplicación inicializada');


console.log(app);

//Mostramos el puerto que se encuentra en el archivo .env
console.log("Dato leido desde al archivo .env: ", process.env.PORT);