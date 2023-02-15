## Invoices API

### Requirements

- Docker
- Docker Compose
- Node >= 14

### Run project

```
$ cd client
$ yarn
$ docker build -t "client" .
$ cd ../server
$ yarn
$ docker build -t "server"
$ cd ..
$ docker-compose up -d --build
$ cd server
$ yarn seed
```

### TODO:

___Frontend >>>___

1. Consume `POST /invoices` in the Front end in order to create an invoice (note: this functionality works, just needs a UI to connect to).
2. Use env var to store API base url
3. Reuse Modal for both Add and Edit feature
4. Refactor Table component (break down into smaller pieces)
5. Rethink folder structure (co-locate related code)
6. Write tests
7. Clean up unnecessary comments and console logs

___Backend >>>___

1. Better-report errors
2. Wrap server with swagger to auto generate swagger docs when changes are made
3. Write tests
4. Share reusable logic (e.g in PUT and CREATE methods)
5. Use dotenv across the Backend
6. Add request rate limit
7. Log request ID
8. Sanitize request payloads
9. Make Services less aware of their consumer
10. Add pagination
11. Clean up unnecessary comments and console logs
