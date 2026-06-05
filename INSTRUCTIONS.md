# Running the Application

## Prerequisites

Make sure the following are installed on your machine:

- Node.js (v18 or later recommended)
- npm
- Python 3.11+ (or the version required by the project)

## Environment Configuration

Create the required environment files before starting the application.

**Frontend (`.env`):**

```env
VITE_API_BASE_URL=http://localhost:8000
```


## First-Time Setup (macOS/Linux)

If this is your first time running the project, grant execute permissions to the startup script:

```bash
chmod +x dev.sh
```

This only needs to be done once after cloning the repository.

## Start the Application

**macOS / Linux**

```bash
./dev.sh
```

**Windows**

```bash
dev.bat
```

or

```bash
.\dev.bat
```

## What the Script Does

The startup script automatically:

- Starts the FastAPI backend server
- Starts the React + Vite frontend server
- Runs both services simultaneously for local development

## Access the Application

| Service       | URL                           |
|---------------|-------------------------------|
| Frontend      | http://localhost:5173         |
| Backend API   | http://localhost:8000         |
| API Docs      | http://localhost:8000/docs    |

## Stopping the Application

To stop the application, press:

```
CTRL + C
```

in the terminal where the startup script is running.

## Troubleshooting

If you receive a permission error on macOS/Linux:

```
Permission denied: ./dev.sh
```

Run:

```bash
chmod +x dev.sh
```

Then start the application again:

```bash
./dev.sh
```

If the frontend cannot connect to the backend, verify that the frontend env variable is configured correctly:

```env
VITE_API_BASE_URL=http://localhost:8000
```