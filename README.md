# teebay

## How to run:

- Clone the repository
- `cd` to the root directory (where the `compose.yaml` file lives)
- Run:

```cmd
docker compose up -d
```

- Run initial db migration:

```cmd
docker exec -it server npx prisma migrate dev --name init
```

- The app will run at `http://localhost:8080`
