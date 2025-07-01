---
sidebar_position: 2
---

# 🔍 API Status Check

Monitor the health and status of your Mileston Business API services with our comprehensive API status check endpoint.

## Overview

The API status check endpoint provides real-time information about the health and performance of your Mileston Business API services. This endpoint is useful for:

- **Health monitoring** - Check if services are running properly
- **System monitoring** - Monitor memory usage and uptime
- **Debugging** - Get detailed service information for troubleshooting

## Endpoint Details

### Base URL
```
GET /status
```

### Service Availability

All Mileston services provide a `/status` endpoint for health monitoring:

- **User Service**: `https://user-service.mileston.co/status` (Production)
- **Checkout Service**: `https://checkout-service.mileston.co/status` (Production)
- **Developer Service**: `https://developer-service.mileston.co/status` (Production)
- **Invoice Service**: `https://invoice-service.mileston.co/status` (Production)
- **Payment Service**: `https://payment-service.mileston.co/status` (Production)
- **Recurring Service**: `https://recurring-service.mileston.co/status` (Production)

## Response Format

The endpoint returns a JSON object with the following structure:

```json
{
  "status": "healthy",
  "service": "user-service",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "development",
  "version": "1.0.0",
  "uptime": 3600,
  "memory": {
    "used": 45,
    "total": 67
  }
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | Service health status (`healthy` or `unhealthy`) |
| `service` | string | Service identifier (e.g., `user-service`, `checkout-service`) |
| `timestamp` | string | ISO 8601 timestamp of the check |
| `environment` | string | Current environment (`development`, `production`, etc.) |
| `version` | string | Service version number |
| `uptime` | number | Process uptime in seconds |
| `memory.used` | number | Memory usage in MB |
| `memory.total` | number | Total allocated memory in MB |

## Usage Examples

### Basic Health Check

```bash
# Check User Service
curl -X GET https://user-service.mileston.co/status

# Check Checkout Service
curl -X GET https://checkout-service.mileston.co/status

# Check Payment Service
curl -X GET https://payment-service.mileston.co/status
```

### Using JavaScript/Fetch

```javascript
const services = [
  'https://user-service.mileston.co/status',
  'https://checkout-service.mileston.co/status',
  'https://developer-service.mileston.co/status',
  'https://invoice-service.mileston.co/status',
  'https://payment-service.mileston.co/status',
  'https://recurring-service.mileston.co/status'
];

async function checkAllServices() {
  const results = await Promise.allSettled(
    services.map(url => fetch(url).then(res => res.json()))
  );
  
  results.forEach((result, index) => {
    const serviceName = services[index].split('/')[2];
    if (result.status === 'fulfilled') {
      const data = result.value;
      console.log(`✅ ${serviceName}: ${data.status}`);
      console.log(`   Uptime: ${data.uptime} seconds`);
      console.log(`   Memory: ${data.memory.used}MB / ${data.memory.total}MB`);
    } else {
      console.log(`❌ ${serviceName}: Failed to check`);
    }
  });
}
```

### Using Node.js

```javascript
const axios = require('axios');

const services = [
  { name: 'User Service', url: 'https://user-service.mileston.co/status' },
  { name: 'Checkout Service', url: 'https://checkout-service.mileston.co/status' },
  { name: 'Developer Service', url: 'https://developer-service.mileston.co/status' },
  { name: 'Invoice Service', url: 'https://invoice-service.mileston.co/status' },
  { name: 'Payment Service', url: 'https://payment-service.mileston.co/status' },
  { name: 'Recurring Service', url: 'https://recurring-service.mileston.co/status' }
];

async function monitorAllServices() {
  for (const service of services) {
    try {
      const response = await axios.get(service.url);
      const { status, uptime, memory, environment } = response.data;
      
      console.log(`\n${service.name}:`);
      console.log(`  Status: ${status}`);
      console.log(`  Environment: ${environment}`);
      console.log(`  Uptime: ${Math.floor(uptime / 60)} minutes`);
      console.log(`  Memory: ${memory.used}MB / ${memory.total}MB`);
    } catch (error) {
      console.log(`\n${service.name}: ❌ Failed to check`);
      console.log(`  Error: ${error.message}`);
    }
  }
}

```

## Integration with Monitoring Tools

### Docker Health Check

```dockerfile
# Add to your Dockerfile for each service
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f https://user-service.mileston.co/status || exit 1
```

### Kubernetes Health Check

```yaml
# Example for User Service
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
spec:
  template:
    spec:
      containers:
      - name: user-service
        livenessProbe:
          httpGet:
            path: /status
            port: 4000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /status
            port: 4000
          initialDelaySeconds: 5
          periodSeconds: 5
```

## Error Handling

### Common HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| `200 OK` | Service is healthy and responding |
| `503 Service Unavailable` | Service is unhealthy or down |
| `500 Internal Server Error` | Service encountered an error |

### Error Response Example

```json
{
  "error": "Service unavailable",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "all-services"
}
```

## Best Practices

### 1. Regular Monitoring
- Set up alerts for unhealthy status responses
- Monitor memory usage trends across all services
- Use automated monitoring tools to check all endpoints

### 2. Logging
- Log status check results for debugging
- Track uptime and performance metrics for each service
- Implement centralized logging for all service health checks

### 3. Load Balancing
- Use health checks for load balancer configuration
- Implement circuit breakers based on status responses

### 4. Security
- Use HTTPS in production environments
- Implement rate limiting on status endpoints if needed

## Troubleshooting

### Service Not Responding
1. Check if the service is running
2. Verify the port is correct
3. Check firewall settings
4. Verify DNS resolution for service URLs

### CORS Issues (HTTP 500 Errors)
Checkout service may return HTTP 500 errors when called without proper CORS headers. To resolve this:

1. **Include Origin Header**: Add the `Origin` header to your requests
2. **Use Frontend Requests**: Make requests from your frontend application
3. **Example with Origin Header**:
   ```bash
   curl -H "Origin: https://your-domain.com" https://checkout-service.mileston.co/status
   ```

### High Memory Usage
1. Monitor memory trends over time
2. Check for memory leaks in specific services
3. Implement memory alerts

### Multiple Services Down
1. Check shared infrastructure (database, message queues)
2. Verify network connectivity between services
3. Check for cascading failures


## Related Documentation

- [API Keys](/docs/api-keys/test-api-key) - Learn about API key management
- [Backend SDK](/docs/mileston-sdks/backend-sdk) - Integrate with our backend services
- [Webhooks](/docs/webooks/webhooks) - Set up webhook notifications 