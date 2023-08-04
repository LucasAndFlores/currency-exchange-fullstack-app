# Currency Exchange App
This project is created to store currency transactions and generate statistics derived from these transactions. Additionally, it provides access to a range of currencies sourced from Fixer.io. Before you begin, please ensure you have Docker, Docker Compose, and Node.js installed on your local machine.

## Backend
### Local Setup - Development Environment

Follow these steps to set up your environment:

Create a file with the same structure as `.env.dev` and name it `.env`. Populate the environment variables `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB` as needed. You can choose suitable values. Next, concatenate these environment variables following the `DATABASE_URL` template.

Create a login on [Fixer.io](https://fixer.io/) and generate an access key. Copy this access key and paste it into the environment variable named `EXTERNAL_API_TOKEN`.

Access the [documentation](https://fixer.io/documentation) and copy the provided Base URL. Paste this Base URL into the environment variable named `EXTERNAL_API_URL`.

After setting up all the environment variables, execute this command to launch the database: 
```bash
docker-compose up -d postgres-db-dev
```

As we are utilizing Prisma, follow these steps to initialize the client and migrate our tables, run: 
```bash
docker-compose run currency-exchange-api yarn prisma:prepare
```

A Prisma prompt will appear:
```bash
? Enter a name for the new migration: › 
```
You can choose any suitable name for the migration.

After running the command, the prompt will display: 
```bash
Done ...
```

Once the preparation is complete, proceed to start the backend. Use the following command:
```bash
docker-compose up --build currency-exchange-api 
```

Additionally, you can run the backend in detached mode by executing:

```bash
docker-compose up -d --build currency-exchange-api
```

### Tests
Before running the tests, ensure that you have installed all the required dependencies.

Navigate to the `backend` directory.

Run the following command to install dependencies: 
```bash
yarn install --frozen-lockfile --include=dev
```

#### Unit Tests

Execute the following command to run the unit tests:

```bash
yarn unit-tests
```

#### Integration Tests
If you previously ran the command `docker-compose up -d postgres-db-dev`, now execute `docker stop postgres-db-dev` to halt the container.

Copy your environment variables `EXTERNAL_API_TOKEN` and `EXTERNAL_API_URL` into the `.env.test` file.

Run a separate Docker container containing the PostgreSQL image. This step prevents any interference with the development database. Use the following command:

```bash
docker run --name postgres_db --network host --env-file ./.env.test -d postgres
```

With the PostgreSQL container up and running, you're now ready to prepare Prisma for testing. Execute the following command:

```bash
yarn prisma:prepare:integration-tests
```

A Prisma prompt will appear:
```bash
? Enter a name for the new migration: › 
```
You can choose any suitable name for the migration.

After running the command, the prompt will display: 
```bash
Done ...
```

Once the Prisma setup is complete, proceed to execute the integration tests using the following command:
```bash
yarn test
```

To avoid conflicts when running `docker-compose` again, you can remove the container using this command:
```bash
docker rm -f postgres_db
```

### Endpoints
This project utilizes [Swagger](https://swagger.io/) for comprehensive route documentation and specifications. When running the project locally, you can access the documentation at `http://localhost:5000/api/docs`. If you haven't modified the api port, all the examples provided within the documentation will function correctly.

