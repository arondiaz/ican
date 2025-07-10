# 🚀 SERVICIO LIBRE

**Servicio Libre** es un mercado digital donde profesionales como electricistas, gasistas, plomeros, instaladores de aires acondicionados, jardineros y más pueden publicarse en la plataforma. El sistema de login está diseñado exclusivamente para un usuario *Admin*, quien tiene la capacidad de crear, ver, actualizar y eliminar usuarios, así como visualizar métricas. 
El usuario puede filtrar por ciudad y categoría, tambien puede hacer uso de la barra de busqueda que está pensada para buscar por palabras aunque estén mal escritas como
"elec", "gas en ros", "plom"  o simplemente "gasista en casilda". Además haciendo click en el perfil del prestador del servicio ingresas a su perfil donde podes ver más datos y contactarlo.

## Proyecto

- **Nombre:** Servicio Libre
- **Proceso:** Desde la idea inicial hasta la compra del dominio y el despliegue en producción.
- **Visítalo aquí:** [serviciolibre.com.ar](https://www.serviciolibre.com.ar/)

## Tecnologías Utilizadas

| Frontend              | Backend                       |
|-----------------------|-------------------------------|
| Next.js               | Node.js                       |
| TypeScript            | Express                       |
| Tailwind CSS          | Sequelize                     |
| Framer Motion         | MySQL                         |
|                       |                               |



##  Configuración del Proyecto

### Frontend

Crea un archivo llamado `.env.local` en la carpeta `FRONTEND` con los siguientes valores de ejemplo:

JWT_SECRET=palabra-aleatoria

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_PRESET=

Producción / local
NEXT_PUBLIC_API=https://backend.up.railway.app   NEXT_PUBLIC_API=http://localhost:4444




### Backend

Crea un archivo llamado `.env` en la carpeta `BACKEND` con los siguientes valores de ejemplo:

Base de datos MySQL local
DB_HOST=localhost
DB_USER=
DB_PASS=
DB_NAME=
DB_DIALECT=mysql

JWT Secret (debe coincidir con el frontend)
JWT_SECRET=palabra-aleatoria

Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

Conexión Railway DB
DB_URL=mysql://admin:xxxxxxx@caboose.proxy.rlwy.net:17568/railway