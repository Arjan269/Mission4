
# Mission4

## Overview

Mission4 is a full-stack web application consisting of a Node.js/Express backend and a Vite/React frontend. The project is containerized using Docker and orchestrated with Docker Compose for easy development and deployment.

## Project Structure

```
Mission4/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── index.js
│   ├── package.json
│   ├── controllers/
│   ├── helpers/
│   ├── middleware/
│   ├── prompts/
│   ├── routes/
│   └── services/
└── frontend/
	 ├── Dockerfile
	 ├── index.html
	 ├── package.json
	 ├── vite.config.js
	 ├── public/
	 └── src/
```

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

### Running the Application

1. **Clone the repository:**
	```sh
	git clone <repo-url>
	cd Mission4
	```

2. **Start the application with Docker Compose:**
	```sh
	docker-compose up --build
	```

3. **Access the frontend:**
	- Open your browser and go to [http://localhost:5173](http://localhost:5173) (or the port specified in your Docker/Vite config).

4. **Backend API:**
	- The backend will be running on [http://localhost:3000](http://localhost:3000) (or the port specified in your Docker/Express config).

### Stopping the Application

To stop the application, press `Ctrl+C` in the terminal and run:
```sh
docker-compose down
```

## Backend

- **Framework:** Node.js, Express
- **Key folders:**
  - `controllers/`: Route logic
  - `helpers/`: Utility functions
  - `middleware/`: Express middleware (e.g., error handling)
  - `prompts/`: Prompt templates or logic
  - `routes/`: API route definitions
  - `services/`: Business logic/services

## Frontend

- **Framework:** React (Vite)
- **Key files/folders:**
  - `src/`: React components and styles
  - `public/`: Static assets
  - `vite.config.js`: Vite configuration

## Development

You can run the backend and frontend separately for development:

### Backend
```sh
cd backend
npm install
npm run dev
```

### Frontend
```sh
cd frontend
npm install
npm run dev
```

## License

This project is licensed under the MIT License.
