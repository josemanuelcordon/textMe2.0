# Documentación TextMe

## Índice

- [Documentación TextMe](#documentación-textme)
  - [Índice](#índice)
  - [1. Análisis del Problema](#1-análisis-del-problema)
    - [1.1. Introducción](#11-introducción)
    - [1.2. Objetivos](#12-objetivos)
    - [1.3. Funciones y Rendimientos Deseados](#13-funciones-y-rendimientos-deseados)
    - [1.4. Planteamiento y Evaluación de Diversas Soluciones](#14-planteamiento-y-evaluación-de-diversas-soluciones)
    - [1.5. Justificación de la Solución Elegida](#15-justificación-de-la-solución-elegida)
    - [1.6. Modelado de la Solución](#16-modelado-de-la-solución)
      - [1.6.1. Recursos Humanos](#161-recursos-humanos)
      - [1.6.2. Recursos Hardware](#162-recursos-hardware)
      - [1.6.3. Recursos Software](#163-recursos-software)
    - [1.7. Planificación Temporal](#17-planificación-temporal)
  - [2. Diseño e Implementación del Proyecto](#2-diseño-e-implementación-del-proyecto)
  - [3. Documentación de la Aplicación](#3-documentación-de-la-aplicación)
    - [3.1. Introducción a la Aplicación (Getting Started)](#31-introducción-a-la-aplicación-getting-started)
    - [3.2. Manual de Instalación](#32-manual-de-instalación)
    - [3.3. Manual de Usuario](#33-manual-de-usuario)
  - [4. Conclusiones Finales](#4-conclusiones-finales)
  - [5. Bibliografía](#5-bibliografía)

## 1. Análisis del Problema

### 1.1. Introducción

Este proyecto tiene como objetivo desarrollar una aplicación de mensajería en tiempo real utilizando React en el frontend, Node.js en el backend y Socket.io para la comunicación bidireccional entre el cliente y el servidor. La aplicación permite a los usuarios crear chats individuales y de grupo, enviar y recibir mensajes en tiempo real, con un sistema de
notificaciones, además de la

### 1.2. Objetivos

- Desarrollar una aplicación web de mensajería en tiempo real.
- Implementar comunicación bidireccional en tiempo real usando Socket.io.
- Facilitar la creación y gestión de chats individuales y de grupo.
- Proporcionar notificaciones en tiempo real para los mensajes recibidos.
- Implementar un sistema de carga de archivos para imágenes de perfil de los chats.

### 1.3. Funciones y Rendimientos Deseados

- **Creación de Chats**: Los usuarios pueden crear nuevos chats individuales y de grupo.
- **Mensajería en Tiempo Real**: Envío y recepción de mensajes en tiempo real.
- **Notificaciones**: Notificaciones instantáneas cuando se recibe un mensaje o cuando ocurre algún error o advertencia.
- **Gestión de Chats**: Los chats más recientes se muestran primero en la lista.
- **Carga de Archivos**: Los usuarios pueden subir imágenes de perfil para los chats.
- **Paginación**: Paginación de la lista de amigos y chats.

### 1.4. Planteamiento y Evaluación de Diversas Soluciones

- **WebSockets**: Protocolo estándar para la comunicación en tiempo real.
- **Socket.io**: Biblioteca que facilita la implementación de WebSockets en aplicaciones Node.js y React.
- **Mariadb**: Servidor de bases de datos relacionales.
- **Symfony**: Se barajó en un inició como framework para back-end, pero debido a las limitaciones de las librerías, se descartó al inicio del proyecto.
- **Protocolo SSE/Mercure**: Comunicación unidireccional servidor a cliente. Descartada debido a su complejidad puesto que funciona con un HUB intermedio que es el encargado de retransmitir los cambios que tienen lugar en el servidor.

### 1.5. Justificación de la Solución Elegida

Se eligió Socket.io debido a su integración sencilla con Node.js y React, su capacidad de manejar comunicaciones bidireccionales en tiempo real de manera eficiente, y su amplio soporte y documentación.

### 1.6. Modelado de la Solución

#### 1.6.1. Recursos Humanos

- **Desarrollador Frontend**: Responsable del desarrollo de la interfaz de usuario con React.
- **Desarrollador Backend**: Encargado de implementar la lógica del servidor con Node.js y Socket.io.
- **Diseñador UX/UI**: Diseñador de la experiencia y la interfaz de usuario.

#### 1.6.2. Recursos Hardware

- **Servidores**: Para alojar el backend de Node.js y la base de datos. Se eligió AWS para alojar el servidor web, concretamente EC2.
- **Máquinas de Desarrollo**: Ordenador personal para el desarrollo de la aplicación.

#### 1.6.3. Recursos Software

- **Node.js**: Entorno de ejecución para el backend.
- **React**: Biblioteca de JavaScript para la construcción de interfaces de usuario.
- **Socket.io**: Biblioteca para la comunicación en tiempo real.
- **Base de Datos**: MariaDB para almacenamiento de datos.
- **Herramientas de Desarrollo**: Visual Studio Code, Git, GitHub.

### 1.7. Planificación Temporal

- **Semana 1-2**: Configuración del entorno de desarrollo, elección de tecnologías y planificación.
- **Semana 3-4**: Desarrollo del backend con Node.js y configuración de Socket.io.
- **Semana 5-6**: Desarrollo del frontend con React, integración con Socket.io.
- **Semana 7-8**: Implementación de funcionalidades adicionales (notificaciones, carga de archivos).
- **Semana 9-10**: Pruebas y ajuste de errores.
- **Semana 11-12**: Documentación y preparación para el despliegue.

## 2. Diseño e Implementación del Proyecto

La documentación técnica y la implementación del proyecto se desarrollarán en línea con los criterios específicos de las necesidades del ciclo de desarrollo, detallándose en los anexos correspondientes.

## 3. Documentación de la Aplicación

### 3.1. Introducción a la Aplicación (Getting Started)

La aplicación de mensajería permite a los usuarios comunicarse en tiempo real a través de una interfaz web moderna y amigable, soportando tanto chats individuales como grupales.

### 3.2. Manual de Instalación

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/usuario/repositorio.git
   cd repositorio
   ```

2. Instalar dependencias:

   ```bash
   npm install
   cd client
   npm install
   ```

3. Buildear el cliente:

   ```bash
   npm run build
   ```

4. Iniciar los contenedores que alojaran el servidor y la base de datos.

   ```bash
   sudo docker-compose up --build
   ```

### 3.3. Manual de Usuario

- **Inicio de Sesión**: Ingresar con el nombre de usuario y contraseña.
- **Crear Nuevo Chat**: Seleccionar amigos de la lista y presionar el botón "Crear Chat".
- **Enviar Mensajes**: Escribir el mensaje en el campo de texto y presionar "Enviar".
- **Notificaciones**: Recibir notificaciones en tiempo real de nuevos mensajes.
- **Subir Imagen de Perfil**: Subir una imagen al crear un nuevo chat de grupo.

## 4. Conclusiones Finales

- **Grado de Cumplimiento de los Objetivos Fijados**: El proyecto cumple con los objetivos planteados, ofreciendo una aplicación de mensajería en tiempo real funcional y eficiente.
- **Propuesta de Modificaciones o Ampliaciones Futuras**:
  - Integración con servicios de autenticación externos (ej. OAuth).
  - Mejora en el sistema de notificaciones.
  - Soporte para mensajes multimedia (audio, video).
  - Mejor gestión de chats, además de poder actualizar fotos y descripciones de grupo.

## 5. Bibliografía

- **Bibliografía Web**:
  - Documentación oficial de [React](https://reactjs.org/docs/getting-started.html).
  - Documentación oficial de [Node.js](https://nodejs.org/en/docs/).
  - Documentación oficial de [Socket.io](https://socket.io/docs/).

Con esta documentación, se busca proporcionar una guía completa para el desarrollo, implementación y uso de la aplicación TextMe, de mensajería en tiempo real, asegurando una experiencia de usuario óptima y un funcionamiento eficiente del sistema.
