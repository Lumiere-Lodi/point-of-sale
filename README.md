![MUNCH POS - API](assets/munchposlogo.png)
# MUNCH POS - API

Api application for Munch point of sale. 

## Run in localhost 

### Run TypeScript Application (Heavy Bundle)

NB: Make sure PostgreSQL is running. 

- To set up PostgreSQL run: `docker-compose -f docker-compose.postgres.yml up -d`
    - default detabase name: `munchpos`
    - default username: `munchpos`
    - default password: `munchpos`
    - You can find DB light frontend Adminer on `http://localhost:8080/`

- install dependencies: `npm install`
- Start the app on http://localhost:5000/ using: `npm run start`
- Start the app on http://localhost:5000/ on watch mode (nodemon): `npm run dev`
- Run unit tests : `npm run test`

### Run Javascript Application (Light Bundle)
- build application: `npm run build`
- Start the app on http://localhost:5000/ using: `npm run serve`
- build application && Start the app on http://localhost:5000/ using: `npm run build:serve`

## Run in Docker 
- build the image locally: `./build-image.sh`
- deploy the application on http://localhost:5000/: `./deploy-backend.sh`
- You can find DB light frontend Adminer on `http://localhost:8080/`

## Important Environment variables
- DB_PORT: application listening port
- DB_NAME: postgreSQL database name
- DB_HOST: postgreSQL database host
- DB_USERNAME: postgreSQL database username
- DB_PASSWORD: postgreSQL database password
- DB_DIALECT: the database you are using (postgreSQL in our case)
- HASH_SALT: salt used for hash the password (the longer the password the longer the encryption)
- MUNCHPOS_CORE_INSTANCES: number instances for the backend when deployed in docker. This is important for scaling up or down. 

## ENDPOINTS

### Registering a new user
- Endpoint : `POST http://localhost:5000/pos/user/v1.0/sync/register`
- Require Authentication Token: `NO`
- Request body :
```json
{
    "name": "lumiere",
    "email": "lumieremondo@gmail.com", 
    "password": "test1"
}
```

### Login 
- Endpoint : `POST http://localhost:5000/pos/user/v1.0/sync/login`
- Require Authentication Token: `NO`
- Return: `Auth Token lasting 30min`
- Request body :
```json
{
    "email": "lumieremondo@gmail.com", 
    "password": "test1"
}
```

### New Product 
- Endpoint : `POST http://localhost:5000/pos/product/v1.0/sync/addProduct`
- Require Authentication Token: `YES`
- Request body :
```json
{
    "name": "bob", 
    "price": 22, 
    "description": "orange fruit",
    "quantity": 50
}
```
### Update existing Product 
- Endpoint : `PUT http://localhost:5000/pos/product/v1.0/sync/update/83e7d131-8c10-4cf3-9b92-b6728ba715ac`
- Require Authentication Token: `YES`
- Request body :
```json
{
    "name": "bob", 
    "price": 100, 
    "description": "orange fruit",
    "quantity": 50
}
```

### Delete existing Product 
- Endpoint : `DELETE http://localhost:5000/pos/product/v1.0/sync/delete/83e7d131-8c10-4cf3-9b92-b6728ba715ac`
- Require Authentication Token: `YES`
- Request body :

### Get all Product 
- Endpoint : `GET http://localhost:5000/pos/product/v1.0/sync/all`
- Require Authentication Token: `YES`
- Request body :

### Create upsell 
- Endpoint : `POST http://localhost:5000/pos/upsell/v1.0/sync/addUpsell`
- Require Authentication Token: `YES`
- Request body :
```json
{
    "product": "e42e2450-b6e2-4ab7-b471-469a849d6178", 
    "upsell": "57d7494f-431b-4f18-8c8f-edcf64a18015"
}
```

### Delete upsell 
- Endpoint : `DELTE http://localhost:5000/pos/upsell/v1.0/sync/delete/e4a9e203-8f68-461c-9194-831df2babda9/57d7494f-431b-4f18-8c8f-edcf64a18015`
- Require Authentication Token: `YES`
- Request body :

### Get a specific upsell 
- Endpoint : `POST http://localhost:5000/pos/upsell/v1.0/sync/retrieve/e4a9e203-8f68-461c-9194-831df2babda9`
- Require Authentication Token: `YES`
- Request body :

### Add a transaction 
- Endpoint : `POST http://localhost:5000/pos/transaction/v1.0/sync/createTransaction`
- Require Authentication Token: `YES`
- Request body :
```json
{
    "product": [
        {
            "product_id": "e4a9e203-8f68-461c-9194-831df2babda9",
            "quantity": 3,
            "upsell_product": [
                "c5e13869-0421-46bd-a3bb-bc0164c3d728",
                "27fc50e0-5d16-4be2-a50f-511a2b7c4280"
            ]
        },
        {
            "product_id": "57d7494f-431b-4f18-8c8f-edcf64a18015",
            "quantity": 3,
            "upsell_product": [
                "90090259-f0b7-4df9-8f01-17298d7443ee",
                "27fc50e0-5d16-4be2-a50f-511a2b7c4280"
            ]
        }
    ],
    "totalAmount": 8500
}
```

### Get a specific transaction 
- Endpoint : `POST http://127.0.0.1:5000/pos/transaction/v1.0/sync/transaction/ecf34c00-6c61-4cea-b3d4-d628171b4ea5`
- Require Authentication Token: `YES`
- Request body :
