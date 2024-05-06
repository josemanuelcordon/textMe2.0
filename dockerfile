# Usa una imagen de Node.js como base
FROM node

# Establece el directorio de trabajo en /usr/src/app
WORKDIR /usr/src/app

# Copia los archivos del proyecto al contenedor
COPY . .

# Instala las dependencias del proyecto
RUN npm install

# Expone el puerto 3000 para que pueda ser accesible desde fuera del contenedor
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]