# teebay

## How to run:

- Clone the repository
- `cd` to the root directory (where the `compose.yaml` file lives)
- Run:

```bash
docker compose up -d
```

- Run initial db migration:

```bash
docker exec -it server npx prisma migrate dev --name init
```

- The app will run at `http://localhost:8080`
