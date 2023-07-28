# User Microservice

This is the documentation for A User Microservice

## Set Up

# Environment Variables
```javascript
PORT = 
NODE_ENV = development
DB_HOST = 
DB_PORT = 3306
DB_USER= 
DB_NAME = 
DB_PASSWORD = 
JWT_SECRET = 
APP_VERSION = 
```

# Start The App
```bash
yarn start:dev
npm start:dev
```
# Run the test
```bash
yarn test
npm test
```

## Response Structure 
```json
{
 error: boolean,
 message: string
 data : Array | Object
}
```

## API Documentation
The API is documented with Postman, the documentation has been exported to a JSON file(User Microservice Test.postman_collection.json) which can be found in the root directory of this repository.
The JSON file can be imported into the Postman App

