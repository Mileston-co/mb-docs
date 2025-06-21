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
- **User Service**: `https://user-service.mileston.co/status` (Production)

## Response Format

The endpoint returns a JSON object with the following structure:

```json
{
  "status": "healthy",
  "service": "all-services",
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
| `service` | string | Service identifier (`all-services`) |
| `timestamp` | string | ISO 8601 timestamp of the check |
| `environment` | string | Current environment (`development`, `production`, etc.) |
| `version` | string | Service version number |
| `uptime` | number | Process uptime in seconds |
| `memory.used` | number | Memory usage in MB |
| `memory.total` | number | Total allocated memory in MB |

## Usage Examples

### Basic Health Check

```bash
curl -X GET https://user-service.mileston.co/status
```

### Using JavaScript/Fetch

```javascript
async function checkServiceHealth() {
  try {
    const response = await fetch('https://user-service.mileston.co/status');
    const data = await response.json();
    
    if (data.status === 'healthy') {
      console.log('✅ Service is healthy');
      console.log(`Uptime: ${data.uptime} seconds`);
      console.log(`Memory usage: ${data.memory.used}MB / ${data.memory.total}MB`);
    } else {
      console.log('❌ Service is unhealthy');
    }
  } catch (error) {
    console.error('Failed to check service health:', error);
  }
}
```

### Using Node.js

```javascript
const axios = require('axios');

async function monitorService() {
  try {
    const response = await axios.get('https://user-service.mileston.co/status');
    const { status, uptime, memory, environment } = response.data;
    
    console.log(`Service Status: ${status}`);
    console.log(`Environment: ${environment}`);
    console.log(`Uptime: ${Math.floor(uptime / 60)} minutes`);
    console.log(`Memory: ${memory.used}MB / ${memory.total}MB`);
    
    return status === 'healthy';
  } catch (error) {
    console.error('Service health check failed:', error.message);
    return false;
  }
}
```

## Integration with Monitoring Tools

### Docker Health Check

```dockerfile
# Add to your Dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f https://user-service.mileston.co/status || exit 1
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
- Monitor memory usage trends

### 2. Logging
- Log status check results for debugging
- Track uptime and performance metrics

### 4. Security
- Use HTTPS in production environments

## Troubleshooting

### Service Not Responding
1. Check if the service is running
2. Verify the port is correct
3. Check firewall settings

### High Memory Usage
1. Monitor memory trends over time


## Related Documentation

- [API Keys](/docs/api-keys/test-api-key) - Learn about API key management
- [Backend SDK](/docs/mileston-sdks/backend-sdk) - Integrate with our backend services
- [Webhooks](/docs/webooks/webhooks) - Set up webhook notifications 