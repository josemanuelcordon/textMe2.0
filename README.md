# textMe2.0

## 1. Dependencias necesarias

Para este proyecto hará falta una máquina con node, npm, docker y docker-compose. Su instalación se deja a cargo del usuario.

## 2. Despliegue de la aplicación

Para desplegar el proyecto haremos lo siguiente:

1. En nuesto servidor, clonaremos nuestro repositorio

```bash
$ git clone https://github.com/josemanuelcordon/textMe2.0.git
cd textMe2.0
```

2. Una vez dentro instalaremos las dependencias del proyecto

```bash
$ npm install
$ cd client
$ npm install
```

3. Buildearemos el cliente

```bash
    npm run build
    cd ..
```

4. Creación de carpetas
   La carpeta /uploads solo debe contener un archivo default.png junto con un .gitkeep

La carpeta /writable/db_data debe estar vacía y con permisos sobre otros usarios, para ello ejecutaremos el siguiente comando:

```bash
$ sudo chmod 777 -R writable/db_data
```

5. Limpiar los contenedores:

```
$ sudo docker-compose down -v
```

6. Lanzar los contenedores:

```bash
$ sudo docker-compose up --build
```
