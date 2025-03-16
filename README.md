# Finance Manager

Finance Manager is a web application designed to help users manage their personal finances. It allows users to track their transactions, set budgets, and view financial summaries.

## Features

- **Transaction Management**: Add, update, delete, and view transactions.
- **Budget Management**: Set and manage budgets for different categories.
- **Financial Summary**: View a summary of total income, expenses, and balance.
- **Responsive Design**: Works on both desktop and mobile devices.

## Technologies Used

- **Backend**: FastAPI, SQLAlchemy, SQLite
- **Frontend**: Next.js, React, Tailwind CSS
- **Containerization**: Docker
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/Sahil1709/finance-manager.git
    cd finance-manager
    ```

2. Create a `.env` file in the root directory and add the following environment variables:

    ```env
    DATABASE_URL=mysql+pymysql://root:my-secret-pw@mysql:3306/finance
    FRONTEND_URL=http://localhost:3000
    MYSQL_ROOT_PASSWORD=<>
    MYSQL_DATABASE=finance
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
    ```

3. Build and run the application using Docker Compose:

    ```sh
    docker-compose up --build
    ```

4. The application should now be running at `http://localhost:3000`.

## API Endpoints

### Transactions

- **Create Transaction**: `POST /transactions/`
- **Read Transactions**: `GET /transactions/?userid={userid}`
- **Read Transaction**: `GET /transactions/{transaction_id}/`
- **Update Transaction**: `PUT /transactions/{transaction_id}/`
- **Delete Transaction**: `DELETE /transactions/{transaction_id}/`

### Budgets

- **Create Budget**: `POST /budgets/`
- **Read Budgets**: `GET /budgets/?userid={userid}`
- **Read Budget**: `GET /budgets/{budget_id}/`
- **Update Budget**: `PUT /budgets/{budget_id}/`
- **Delete Budget**: `DELETE /budgets/{budget_id}/`

### Summary

- **Get Summary**: `GET /summary/{userid}/`

### Health Check

- **Health Check**: `GET /health/`

## Running Tests

### Backend Tests

1. Navigate to the `backend` directory:

    ```sh
    cd backend
    ```

2. Run the tests using pytest:

    ```sh
    pytest
    ```

### Frontend Tests

1. Navigate to the `frontend` directory:

    ```sh
    cd frontend
    ```

2. Run the tests using Jest:

    ```sh
    npm test
    ```

# Test rc workflow

## Acknowledgements

- [FastAPI](https://fastapi.tiangolo.com/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Docker](https://www.docker.com/)
- [GitHub Actions](https://github.com/features/actions)