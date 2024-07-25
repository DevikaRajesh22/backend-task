# Backend Task

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in a `.env` file
4. Start the server: `npm run dev`

## Endpoints

### Products

- **GET /api/products**: Retrieve all products
- **GET /api/products/:id**: Retrieve a product by ID
- **POST /api/products**: Create a new product (Protected)
- **PUT /api/products/:id**: Update a product by ID (Protected)
- **DELETE /api/products/:id**: Delete a product by ID (Protected)

### Users

- **POST /api/users/register**: Register a new user
- **POST /api/users/login**: Login user and get JWT
- **GET /api/users/profile**: Get user profile (Protected)

### Weather

- **GET /api/weather**: Fetch weather data (with caching)

## Real-time Features

- WebSocket connection at `ws://localhost:5000`

## Deployment

1. Deploy to cloud platform (AWS, Azure, GCP)
2. Set up CI/CD pipeline (GitHub Actions, GitLab CI)
3. Configure monitoring and alerting

## Monitoring

- Integrate monitoring tools like New Relic, Datadog, or Prometheus
