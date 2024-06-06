#!/bin/bash

# Crear la carpeta writable/db_data si no existe
mkdir -p writable/db_data

# Dar permisos 777 recursivamente a la carpeta db_data
chmod -R 777 writable/db_data

# Imprimir mensaje de confirmación
echo "Carpeta writable/db_data creada y permisos 777 asignados."

sudo docker-compose down -v

sudo docker-compose up --build