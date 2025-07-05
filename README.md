# REST API con Autenticación JWT

Una API REST completa con autenticación JWT, roles de usuario y gestión de productos.

## Características

- ✅ Autenticación con JWT (access token + refresh token)
- ✅ Roles de usuario (user, admin)
- ✅ CRUD completo de productos
- ✅ Validaciones de datos
- ✅ Manejo de errores robusto
- ✅ Middleware de autenticación y autorización
- ✅ Base de datos MongoDB con Mongoose

## Instalación

1. Clona el repositorio
2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Copia el archivo de variables de entorno:
   ```bash
   cp env.example .env
   ```

4. Configura las variables en el archivo `.env`:
   - `MONGO_URI`: URL de tu base de datos MongoDB
   - `JWT_SECRET`: Clave secreta para JWT
   - `JWT_REFRESH_SECRET`: Clave secreta para refresh tokens

5. Inicia el servidor:
   ```bash
   npm run dev
   ```

## Endpoints

### Autenticación

- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/refresh` - Renovar token

### Productos

- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener un producto
- `POST /api/products` - Crear producto (solo admin)
- `PUT /api/products/:id` - Actualizar producto (solo admin)
- `DELETE /api/products/:id` - Eliminar producto (solo admin)

## Uso

### Registro de usuario
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "usuario1", "password": "123456"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "usuario1", "password": "123456"}'
```

### Crear producto (requiere token de admin)
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{"name": "Producto 1", "price": 100, "description": "Descripción"}'
```

## Estructura del proyecto

```
├── server.js              # Punto de entrada
├── app.js                 # Configuración de Express
├── controllers/           # Controladores
│   ├── auth.controllers.js
│   └── product.controller.js
├── models/               # Modelos de MongoDB
│   ├── user.model.js
│   └── product.model.js
├── routes/               # Rutas
│   ├── auth.routes.js
│   └── product.routes.js
├── middlewares/          # Middlewares
│   ├── auth.middleware.js
│   └── role.middleware.js
└── utils/               # Utilidades
    └── token.util.js
```

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- dotenv 