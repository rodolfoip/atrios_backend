# atrios_backend

## Project setup
```
npm install
```

### Compiles for development
```
npm run dev
```

### Compiles for production
```
npm run start
```

### Run tests
```
npm run test:staged
npm run test:unit
npm run test:integration
npm run test:ci
```

## Local Environment Configuration

To run the project locally, you need to set up environment variables. Create a `.env` file in the root of the project with the following content:

```
MONGO_URL=mongodb://127.0.0.1:27017/atrios-node-api
TOKEN_SECRET=secret
PORT=5858
```

You can change these values as needed for your local setup.

The project uses the [dotenv](https://www.npmjs.com/package/dotenv) package to load these variables automatically.
