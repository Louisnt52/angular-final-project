# Angular Final Project

Proyecto desarrollado con **Angular v20.3.10**, utilizando **JSON Server** como backend simulado y **Bootstrap 5.3.8** para estilos y componentes UI. El proyecto incluye funcionalidades de login, gestión de productos y usuarios, así como formularios reactivos y pruebas unitarias con Jasmine/Karma.

---

## Tecnologías utilizadas

- **Angular**: v20.3.10  
- **JSON Server**: para simular API REST  
- **Bootstrap**: v5.3.8  
- **RxJS**: manejo de observables  
- **Jasmine / Karma**: para pruebas unitarias  
- **TypeScript**: v5.x  

---

## Instalación del proyecto

1. Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd angular-final-project
```
2. Instalar dependencias de Angular:
```bash
npm install
```
3. Instalar JSON Server
```bash
npm install -g json-server
```
Levantar el servidor JSON
El proyecto utiliza un archivo users.json dentro de public. Contiene usuarios de ejemplo.
1. Ir a la carpeta donde se encuentra users.json:
```bash
cd public
```
Iniciar JSON Server:
```bash
json-server --watch db.json --port 3000
```
Esto levantará un servidor REST en http://localhost:3000.
Endpoints disponibles:
/users → usuarios

Levantar la aplicación Angular
Ejecutar el proyecto:
```bash
ng serve
```
Abrir en el navegador:
http://localhost:4200

La primera vista será el Login. Ingresar credenciales desde public.json.

Formularios
Formularios Reactivos:
Productos (Reactive Forms, Product Add)
Usuarios (User Create)
Validaciones incluidas: campos requeridos, longitud mínima, select para roles.

Tests Unitarios

El proyecto incluye pruebas con Jasmine y Karma.
Ejecutar tests
```bash
ng test
```
Esto abrirá Karma en el navegador.
Ejecuta todos los tests .spec.ts de los componente