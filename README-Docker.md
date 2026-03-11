# 🐳 Docker Setup for Car.io

This guide will help you run the Car.io application using Docker and Docker Compose.

## Prerequisites

- Docker Desktop installed and running
- Docker Compose (included with Docker Desktop)

## Quick Start

1. **Clone and navigate to the project:**
   ```bash
   cd c:/Users/julio/Windsurf/Car.io
   ```

2. **Start all services:**
   ```bash
   docker-compose up -d
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

## Services Overview

### 🗄️ MongoDB Database
- **Container:** `car-builder-mongodb`
- **Port:** 27017
- **Credentials:** 
  - Username: `admin`
  - Password: `password123`
  - Database: `car-builder`

### 🔧 Backend API
- **Container:** `car-builder-backend`
- **Port:** 5000
- **Environment:** Production
- **Health Check:** Every 30 seconds

### 🌐 Frontend (Nginx)
- **Container:** `car-builder-frontend`
- **Port:** 3000
- **Static file serving with gzip compression**
- **API proxy to backend**

## Docker Compose Commands

### Start Services
```bash
# Start in detached mode
docker-compose up -d

# Start with logs
docker-compose up
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb
```

### Rebuild Services
```bash
# Rebuild and restart
docker-compose up --build -d

# Rebuild specific service
docker-compose up --build backend -d
```

## Development with Docker

### Hot Reload for Backend
For development with hot reload, modify the `docker-compose.yml`:

```yaml
backend:
  # ... existing config
  volumes:
    - ./:/app
    - /app/node_modules
  command: npm run dev
```

### Access Container Shells
```bash
# Backend container
docker-compose exec backend sh

# MongoDB container
docker-compose exec mongodb mongosh

# Frontend container
docker-compose exec frontend sh
```

## Environment Variables

The application uses these environment variables (configured in docker-compose.yml):

```yaml
environment:
  NODE_ENV: production
  PORT: 5000
  MONGODB_URI: mongodb://admin:password123@mongodb:27017/car-builder?authSource=admin
  JWT_SECRET: your-super-secret-jwt-key-change-this-in-production-docker
  FRONTEND_URL: http://localhost:3000
```

## Production Considerations

### Security
- Change default passwords in `docker-compose.yml`
- Update JWT_SECRET to a secure random string
- Use environment file for sensitive data

### Persistence
- MongoDB data persists in Docker volume `mongodb_data`
- Uploads are mounted to `./uploads` directory

### Scaling
```bash
# Scale backend services
docker-compose up -d --scale backend=3
```

## Troubleshooting

### Port Conflicts
If ports are already in use, modify the `ports` section in `docker-compose.yml`:
```yaml
ports:
  - "3001:80"  # Change frontend to 3001
  - "5001:5000" # Change backend to 5001
```

### Database Connection Issues
```bash
# Check MongoDB logs
docker-compose logs mongodb

# Connect to MongoDB directly
docker-compose exec mongodb mongosh -u admin -p password123 --authenticationDatabase admin
```

### Rebuild from Scratch
```bash
# Stop and remove all containers and volumes
docker-compose down -v

# Remove images
docker system prune -a

# Rebuild
docker-compose up --build
```

## Monitoring

### Health Checks
- Backend health: http://localhost:5000/api/health
- Frontend health: http://localhost:3000/health

### Resource Usage
```bash
# View container stats
docker stats

# View disk usage
docker system df
```

## Backup and Restore

### Backup Database
```bash
docker-compose exec mongodb mongodump --out /backup
docker cp car-builder-mongodb:/backup ./backup
```

### Restore Database
```bash
docker cp ./backup car-builder-mongodb:/backup
docker-compose exec mongodb mongorestore /backup
```

## Next Steps

1. **Customize Environment:** Update passwords and secrets
2. **Configure Domain:** Update nginx.conf for your domain
3. **SSL Certificate:** Add HTTPS configuration
4. **Monitoring:** Set up logging and monitoring tools

## Support

If you encounter issues:

1. Check container logs: `docker-compose logs`
2. Verify Docker Desktop is running
3. Ensure ports are not blocked by firewall
4. Check Docker Desktop resource allocation
