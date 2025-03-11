# DrawSync - Excalidraw Clone with WebSockets

DrawSync is a real-time collaborative whiteboard application based on Excalidraw. It enables multiple users to join the same room and collaborate on a shared project with real-time editing features.

## Features
- Create a room and invite multiple users.
- Real-time collaborative drawing and editing.
- WebSocket-based communication for seamless updates.
- TurboRepo monorepo structure for optimized development.

---

## Running Locally

### Prerequisites
- **Node.js** (LTS version recommended)
- **pnpm** (Package manager) - Install via:
  ```sh
  npm install -g pnpm
  ```
- **Redis** (Required for queue management)
- **.env configuration** (Create `.env` files as required)

### Steps to Run Without Docker
1. **Clone the repository:**
   ```sh
   git clone https://github.com/Maniteja0126/DrawSync.git
   cd DrawSync
   ```
2. **Install dependencies:**
   ```sh
   pnpm install
   ```
3. **Set up environment variables:**
   - Ensure you have the required `.env` files for frontend, backend, and WebSocket services.
   - Add a Redis connection URL in the backend environment files.
4. **Start the application:**
   ```sh
   pnpm run dev
   ```
5. The services will be available at:
   - Frontend: `http://localhost:3000`
   - HTTP Backend: `http://localhost:3001`
   - WebSocket Backend: `ws://localhost:8080`

---

## Running with Docker

### Prerequisites
- **Docker** (Latest version recommended)
- **Docker Compose**

### Steps to Run With Docker
1. **Clone the repository:**
   ```sh
   git clone https://github.com/Maniteja0126/DrawSync.git
   cd DrawSync
   ```
2. **Set up environment variables:**
   - Create and configure the required `.env` files.
   - Ensure Redis URL is set for queue management.
3. **Build and run the services:**
   ```sh
   docker-compose up --build
   ```
4. The services will be accessible at:
   - Frontend: `http://localhost:3000`
   - HTTP Backend: `http://localhost:3001`
   - WebSocket Backend: `ws://localhost:8080`

---

## Folder Structure
```
DrawSync/
├── apps/
│   ├── frontend/         # Next.js frontend
│   ├── http-backend/     # Express-based backend API
│   ├── ws-backend/       # WebSocket backend service
│
├── packages/
│   ├── db/              # Prisma schema for PostgreSQL
│
├── docker/
│   ├── dockerfile.frontend
│   ├── dockerfile.http-backend
│   ├── dockerfile.ws-backend
│
├── docker-compose.yml    # Root-level Docker Compose config
├── .env.example          # Example environment variables
└── README.md             # Project documentation
```

---

## Contributing
If you'd like to contribute, please fork the repository and create a pull request. Make sure to test your changes locally before submitting a PR.



