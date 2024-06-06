# Usa una imagen de Node.js como base
FROM node

# Instala OpenSSL
RUN apt-get update && apt-get install -y openssl

# Establece el directorio de trabajo en /usr/src/app
WORKDIR /usr/src/app

# Copia los archivos del proyecto al contenedor
COPY . .

# Instala las dependencias del proyecto
RUN npm install

# Genera certificados SSL después de crear el directorio
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/private.key \
    -out /etc/ssl/private/certificate.crt \
    -subj "/C=ES/ST=Andalucía/L=Granada/O=IESHLanz/OU=WEB/CN=textMe"

# Expone los puertos 80 y 443
EXPOSE 80 443

# Comando para ejecutar la aplicación
CMD npm start 
