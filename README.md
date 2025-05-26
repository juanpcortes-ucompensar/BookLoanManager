# BookLoanManager

BookLoanManager es un sistema web diseñado para facilitar la gestión del préstamo de libros en bibliotecas. Este sistema permite a los bibliotecarios administrar de manera eficiente el inventario de libros, llevar un registro de los préstamos y devoluciones, y monitorear la disponibilidad de los títulos en tiempo real.

## 🛠️ Tecnologías Utilizadas

### Backend
- **Java 17**
- **Spring Boot** - Framework principal
- **Spring Data JPA** - Gestión de datos
- **MySQL** - Base de datos (ajustar según tu BD)
- **Maven** - Gestión de dependencias

### Frontend
- **React 18**
- **Node.js 18.10.0**
- **npm** - Gestión de paquetes

## 📋 Prerrequisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Java 17** o superior
- **Node.js 18.10.0** o superior
- **npm** (incluido con Node.js)
- **MySQL** (o la base de datos que uses)
- **Git**

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/BookLoanManager.git
cd BookLoanManager
```

### 2. Configuración del Backend (Spring Boot)

#### Navegar al directorio del backend
```bash
cd backend
```

#### Configurar la Base de Datos
1. Crear una base de datos MySQL llamada `bookloan_db` (o el nombre que prefieras)
2. Editar el archivo `src/main/resources/application.properties`:

```properties
# Configuración de la base de datos
spring.datasource.url=jdbc:mysql://localhost:3306/bookloan_db
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Configuración JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Puerto del servidor
server.port=8080
```

#### Instalar dependencias y compilar
```bash
./mvnw clean install
```

### 3. Configuración del Frontend (React)

#### Navegar al directorio del frontend
```bash
cd ../frontend
```

#### Instalar dependencias
```bash
npm install
```

#### Configurar variables de entorno (opcional)
Crear un archivo `.env` en la raíz del frontend:
```env
REACT_APP_API_URL=http://localhost:8080/api
```

## 🏃‍♂️ Ejecución del Proyecto

### Ejecutar el Backend
```bash
cd backend
./mvnw spring-boot:run
```

El backend estará disponible en: `http://localhost:8080`

### Ejecutar el Frontend
En una nueva terminal:
```bash
cd frontend
npm start
```

El frontend estará disponible en: `http://localhost:3000`

## 📁 Estructura del Proyecto

```
BookLoanManager/
├── bookloanspring/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   ├── pom.xml
│   └── README.md
├── frontend-react/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── public/
│   ├── package.json
│   └── README.md
└── README.md
```

## 🔧 Scripts Disponibles

### Backend
```bash
# Compilar el proyecto
./mvnw compile

# Ejecutar tests
./mvnw test

# Crear archivo JAR
./mvnw package

# Limpiar archivos generados
./mvnw clean
```

### Frontend
```bash
# Iniciar servidor de desarrollo
npm start

# Crear build de producción
npm run build

# Ejecutar tests
npm test

# Analizar bundle
npm run analyze
```

## 🌐 Endpoints de la API

### Libros
- `GET /api/books` - Obtener todos los libros
- `GET /api/books/{id}` - Obtener libro por ID
- `POST /api/books` - Crear nuevo libro
- `PUT /api/books/{id}` - Actualizar libro
- `DELETE /api/books/{id}` - Eliminar libro

### Préstamos
- `GET /api/loans` - Obtener todos los préstamos
- `POST /api/loans` - Crear nuevo préstamo
- `PUT /api/loans/{id}/return` - Registrar devolución

## 🧪 Testing

### Backend
```bash
cd backend
./mvnw test
```

### Frontend
```bash
cd frontend
npm test
```

## 📦 Construcción para Producción

### Backend
```bash
cd backend
./mvnw clean package
```
El archivo JAR se generará en `target/bookloanmanager-*.jar`

### Frontend
```bash
cd frontend
npm run build
```
Los archivos de producción se generarán en la carpeta `build/`

## 🚀 Despliegue

### Backend
```bash
java -jar target/bookloanmanager-*.jar
```

### Frontend
Servir los archivos estáticos de la carpeta `build/` con cualquier servidor web (nginx, Apache, etc.)

## 🐛 Solución de Problemas

### Error de conexión a la base de datos
- Verificar que MySQL esté ejecutándose
- Comprobar las credenciales en `application.properties`
- Asegurar que la base de datos existe

### Error "Port already in use"
- Backend: Cambiar el puerto en `application.properties`
- Frontend: Usar `PORT=3001 npm start` para cambiar el puerto

### Problemas con Node.js
- Verificar la versión con `node --version`
- Limpiar caché: `npm cache clean --force`
- Eliminar `node_modules` y ejecutar `npm install`

## 👥 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir un Pull Request

---

⭐ ¡Si te gusta este proyecto, dale una estrella en GitHub!