## SERVICIO LIBRE

Servicio Libre es un mercado de servicios, donde electricistas, gasistas, plomeros, instalador de aires acondicionados, jardineros, etc. Podrán publicarse en la página, es Login está pensado sólo para un usuario Admin, donde tiene la capacidad de crear, ver, actualizar y eliminar usuarios y algunas métricas.

El proyecto se llama Servicio Libre, realicé el proceso completo desde la idea hasta la compra del dominio y ser hosteado.
 
Por si quieren visitarlo: https://www.serviciolibre.com.ar/

El login está pensando para un usuario admin.

Frontend : Next.js, TypeScript, Tailwind, Framer Motion
Backend : Node.js,  Express, Sequelize, MYSQL, Cloudinary


## Configuración

-- LOS VALUES SON DE EJEMPLO -- 

En la carpeta frontend debe haber un archivo llamado ".env.local"


JWT_SECRET=palabra-aleatoria

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_PRESET=

NEXT_PUBLIC_API=https://backend.up.railway.app
#  NEXT_PUBLIC_API=http://localhost:4444




En la carpeta backend debe haber un archivo ".env"

# localhost mysql DB
DB_HOST=localhost
DB_USER=
DB_PASS=
DB_NAME=
DB_DIALECT=mysql

# jwt secret 
JWT_SECRET=palabra-aleatoria (la misma que en el frontend)


# cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=


# railway db connect

DB_URL=mysql://admin:xxxxxxx@caboose.proxy.rlwy.net:17568/railway
