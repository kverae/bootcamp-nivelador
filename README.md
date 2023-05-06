# bootcamp-nivelador
Proyecto nivelador para el Master Full Stack. La API fue realizada para la colección users vista en clase.

### Para levantar la aplicación es necesario seguir los siguientes pasos:

1. Clonar el proyecto:
```bash
  git clone https://github.com/kverae/bootcamp-nivelador.git
```
2. Ir hasta la carpeta raíz del proyecto:
```bash
  cd bootcamp-nivelador
```
3. Correr el siguiente comando que creará la imagen de mongodb, cargará la colección usuarios y correrá la API:

```bash
  docker compose up
```
* Esto correrá la API en la IP: 0.0.0.0 puerto 8080 y la BD en el container ¨mongodb¨ puerto 27017

### Las APIs disponibles son las siguientes:

1- Listar todos los usuarios de la colección:
```bash
curl --location --request GET '0.0.0.0:8080/all-users'
```
2- Filtrar usuarios por ciertos campos. Por ejemplo: listar todos los usuarios femeninos con estado casadas:
```bash
curl --location --request GET '0.0.0.0:8080/filter-users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "gender": "Female",
    "married_status": true
}'
```
3- Modificar campos de usuarios por id. Por ejemplo: modificar el usuario con ID 001, en caso de no existir usuario con dicho ID será creado (201 Created), en caso de existir los demás campos definidos en el body del request serán modificados (200 OK):
```bash
curl --location --request PUT '0.0.0.0:8080/' \
--header 'Content-Type: application/json' \
--data-raw ' {
        "_id": "001",
        "first_name": "Carlo",
        "last_name": "Acutis",
        "gender": "Male",
        "married_status": false
    }'
```
4- Eliminar usuarios por id. Por ejemplo: eliminar el usuario con ID 001, en caso de no existir usuario con dicho ID no se realizará ninguna acción (204 No Content), en caso de existir será eliminado (200 OK):
```bash
curl --location --request DELETE '0.0.0.0:8080/?id=001'
```

