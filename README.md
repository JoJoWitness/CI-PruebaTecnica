# CI-PruebaTecnica

## Requisitos previo ejecutar el proyecto:
  - Tener **Node.js** += 21
  - Tener instalado **PostgreSQL**
  - Tener un administrador de paquetes como **Yarn** o **NPM**
  - Tener instalado **NestJS CLI** de forma global 
      ```bash
      yarn global add @nestjs/cli 
      # o 
      npm install -g @nestjs/cli
      ```

## Para ejecutar el cliente:
  1. Ejecutar para instalar las dependencias: 
  ```bash
    yarn install 
      # o 
    npm install
  ``` 
  2. Ejecutar el comando para correr de forma local el proyecto:
  ```bash
    yarn run dev 
      # o 
    npm run dev
  ``` 

## Para ejecutar el servidor:
  1. Ejecutar para instalar las dependencias: 
  ```bash
    yarn install 
      # o 
    npm install
  ``` 
  2. Crear un archivo .env y rellenarlo segun el .env.template
    2.1- En la parte de **<POSTGRES_USER>** indicar el usuario de postgres
    2.2- En la parte de **<POSTGRES_PASSWORD>** indicar la contraseña del usuario
    2.3- En la parte de **<POSTGRES_SERVER>** indicar donde se esta ejecutando el servidor de postgres, ejemplo "localhost:1234"
    2.4- En la parte de **<DATABASE_NAME>** indicar el nombre de la base de datos (Idealmente se debe de crear una nueva base de datos para el proyecto).
    2.5- Ejemplo de como deberia quedar: "postgres://usuario:123321@localhost:1234/ejemploBD"
  3. Ejecutar siguiente comando para inicializar la base de datos:
    ```bash
    npx prisma migrate dev --name init 
      #o 
    yarn prisma migrate dev --name init 
    ```
  4. Para Trabajar con el JWT, seguir lo indicado en el .env.template **<ANY_RANDOM_STRING>** y escribir cualquier cadena de caracteres (idealmente, usar un string seguro, previamente hasheado)
  5. Finalmente, ejecutar el servidor con el siguiente comando:
   ```bash
    yarn run start:dev 
     # o 
    npm run start:dev
  ```

## Para ejecutar la base de datos:
  1. dijirse a la direaccion ./server/prisma 
  2. ejecutar el siguiente comando: 
  ```bash
  node mockdata.js
  ```
### Como entrar
  - En la **mockdata.js** se encuentra los usarios, la contraseña para todos es "password123"