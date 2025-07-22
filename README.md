# 🍜 UDON Asian Food - Sistema de Reservas

Sistema completo de reservas online para la cadena de restaurantes UDON Asian Food. Incluye portal para clientes y panel de administración para cada restaurante.

## 🏪 Restaurantes

- **UDON CC ALISIOS**
- **UDON CC MERIDIANO** 
- **UDON RUIZ DE ALDA**

## ✨ Características

### Portal de Clientes
- Selección de restaurante
- Formulario de reserva intuitivo
- Gestión de disponibilidad de mesas en tiempo real
- Confirmación inmediata de reservas
- Diseño responsive y profesional

### Panel de Administración
- Acceso separado por restaurante
- Gestión completa de reservas
- Estados de reserva (confirmada, completada, cancelada)
- Vista de ocupación de mesas
- Estadísticas en tiempo real
- Filtros por fecha y estado

## 🚀 Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   cd "Aplicación UDON RESERVAS"
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el servidor**
   ```bash
   npm start
   ```
   
   Para desarrollo con auto-reload:
   ```bash
   npm run dev
   ```

4. **Acceder a la aplicación**
   - Portal de clientes: http://localhost:3000
   - Panel de administración: http://localhost:3000/admin

## 🔐 Credenciales de Administrador

### UDON CC ALISIOS
- **Usuario:** admin_alisios
- **Contraseña:** alisios2025

### UDON CC MERIDIANO
- **Usuario:** admin_meridiano
- **Contraseña:** meridiano2025

### UDON RUIZ DE ALDA
- **Usuario:** admin_ruizalda
- **Contraseña:** ruizalda2025

## 📱 Uso del Sistema

### Para Clientes
1. Acceder a http://localhost:3000
2. Seleccionar el restaurante deseado
3. Completar el formulario de reserva
4. Recibir confirmación inmediata

### Para Administradores
1. Acceder a http://localhost:3000/admin
2. Seleccionar restaurante e iniciar sesión
3. Gestionar reservas desde el panel de control
4. Monitorear estado de mesas y estadísticas

## 🛠️ Tecnologías Utilizadas

- **Backend:** Node.js + Express
- **Autenticación:** JWT + bcrypt
- **Frontend:** HTML5 + CSS3 + JavaScript vanilla
- **Base de datos:** En memoria (fácil migración a MongoDB/MySQL)

## 📊 Funcionalidades del Sistema

### Gestión de Reservas
- ✅ Crear nuevas reservas
- ✅ Verificar disponibilidad de mesas
- ✅ Confirmar/cancelar/completar reservas
- ✅ Eliminar reservas
- ✅ Filtros por fecha y estado

### Gestión de Mesas
- ✅ Inventario automático de mesas por restaurante
- ✅ Control de capacidad (2-6 personas)
- ✅ Estado en tiempo real (disponible/ocupada)
- ✅ Liberación automática al cancelar

### Seguridad
- ✅ Autenticación por restaurante
- ✅ Tokens JWT para sesiones
- ✅ Contraseñas encriptadas
- ✅ Validación de datos

## 🎨 Diseño

- **Colores corporativos:** Rojo UDON (#d4002a) como color principal
- **Responsive:** Adaptado para móviles y escritorio
- **UX/UI:** Interfaz intuitiva y profesional
- **Accesibilidad:** Formularios accesibles y navegación clara

## 🔧 Configuración

### Variables de Entorno (.env)
```
JWT_SECRET=udon_reservas_secret_key_2025
PORT=3000
NODE_ENV=development
```

### Estructura del Proyecto
```
Aplicación UDON RESERVAS/
├── server.js              # Servidor principal
├── package.json           # Dependencias
├── .env                   # Variables de entorno
└── public/                # Frontend
    ├── index.html         # Portal de clientes
    ├── admin.html         # Panel de administración
    └── style.css          # Estilos compartidos
```

## 🚀 Despliegue en Producción

Para producción, se recomienda:

1. **Base de datos real:** Migrar de memoria a MongoDB/MySQL
2. **Variables de entorno:** Configurar JWT_SECRET seguro
3. **HTTPS:** Configurar certificados SSL
4. **Monitoreo:** Implementar logs y métricas
5. **Backup:** Sistema de respaldo de datos

## 📞 Integración con IA

El sistema está preparado para integrarse con:
- **Agentes de IA telefónicos:** APIs REST para crear/consultar reservas
- **WhatsApp Business:** Webhook para recibir solicitudes
- **Chatbots:** Interfaz API para automatización

### Endpoints API disponibles:
- `GET /api/restaurants` - Lista de restaurantes
- `GET /api/restaurants/:id/tables` - Mesas disponibles
- `POST /api/reservations` - Crear reserva
- `GET /api/admin/reservations` - Listar reservas (auth)
- `PUT /api/admin/reservations/:id` - Actualizar reserva (auth)

## 🆘 Soporte

Para soporte técnico o preguntas sobre el sistema, contactar con el equipo de desarrollo.

---

**© 2025 UDON Asian Food - Sistema de Reservas**  
Visita: [www.udon.es](https://www.udon.es)
