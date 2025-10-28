# OLIS Resolution Tracker API Documentation

## Base URL
```
http://localhost:3000/api/resolutions
```

## Response Format
All endpoints return responses in this format:
```json
{
  "status": true | false,
  "message": "Description of the operation result",
  "data": "Response data or null for errors"
}
```

---

## 📋 Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Get all resolution records (with optional filters) |
| `GET` | `/stats` | Get resolution statistics |
| `GET` | `/:orderId/:dateSubmitted` | Get specific resolution record |
| `POST` | `/` | Create new resolution record |
| `PUT` | `/:orderId/:dateSubmitted` | Update resolution record |
| `DELETE` | `/:orderId/:dateSubmitted` | Delete resolution record |

---

## 🔍 GET All Resolution Records

### Endpoint
```
GET /api/resolutions
```

### Query Parameters (Optional)
- `status` - Filter by status (e.g., "Resolved", "Unresolved")
- `errorCode` - Filter by error code (e.g., "AE", "AA", "AR")
- `resolvedBy` - Filter by resolver name (partial match)

### Examples
```bash
# Get all records
GET /api/resolutions

# Filter by status
GET /api/resolutions?status=Resolved

# Filter by error code
GET /api/resolutions?errorCode=AE

# Filter by resolver
GET /api/resolutions?resolvedBy=Emily

# Multiple filters
GET /api/resolutions?status=Resolved&errorCode=AE
```

### Success Response (200)
```json
{
  "status": true,
  "message": "Resolution records retrieved successfully",
  "data": [
    {
      "orderId": "ORD2507010001",
      "dateSubmitted": "2025-07-01T09:10:00.000Z",
      "errorCode": "AE",
      "errorMessage": "Invalid patient identifier format",
      "hl7Segment": "PID 3",
      "status": "Resolved",
      "comments": "Patient ID corrected to match OLIS format.",
      "resolvedBy": "Emily Chen",
      "resolvedDate": "2025-07-02T11:20:00.000Z"
    }
  ]
}
```

### Error Response (500)
```json
{
  "status": false,
  "message": "Failed to fetch resolution records",
  "data": null
}
```

---

## 📊 GET Resolution Statistics

### Endpoint
```
GET /api/resolutions/stats
```

### Success Response (200)
```json
{
  "status": true,
  "message": "Resolution statistics retrieved successfully",
  "data": {
    "statusStats": [
      {
        "status": "Resolved",
        "_count": {
          "orderId": 7
        }
      },
      {
        "status": "Unresolved",
        "_count": {
          "orderId": 3
        }
      }
    ],
    "errorCodeStats": [
      {
        "errorCode": "AE",
        "_count": {
          "orderId": 4
        }
      },
      {
        "errorCode": "AA",
        "_count": {
          "orderId": 3
        }
      },
      {
        "errorCode": "AR",
        "_count": {
          "orderId": 3
        }
      }
    ]
  }
}
```

---

## 🎯 GET Specific Resolution Record

### Endpoint
```
GET /api/resolutions/:orderId/:dateSubmitted
```

### URL Parameters
- `orderId` - The order ID (e.g., "ORD2507010001")
- `dateSubmitted` - ISO date string (e.g., "2025-07-01T09:10:00.000Z")

### Example
```bash
GET /api/resolutions/ORD2507010001/2025-07-01T09:10:00.000Z
```

### Success Response (200)
```json
{
  "status": true,
  "message": "Resolution record retrieved successfully",
  "data": {
    "orderId": "ORD2507010001",
    "dateSubmitted": "2025-07-01T09:10:00.000Z",
    "errorCode": "AE",
    "errorMessage": "Invalid patient identifier format",
    "hl7Segment": "PID 3",
    "status": "Resolved",
    "comments": "Patient ID corrected to match OLIS format.",
    "resolvedBy": "Emily Chen",
    "resolvedDate": "2025-07-02T11:20:00.000Z"
  }
}
```

### Error Response (404)
```json
{
  "status": false,
  "message": "Resolution record not found",
  "data": null
}
```

---

## ➕ CREATE New Resolution Record

### Endpoint
```
POST /api/resolutions
```

### Request Body
```json
{
  "orderId": "ORD2510280001",
  "dateSubmitted": "2025-10-28T10:30:00.000Z",
  "errorCode": "AE",
  "errorMessage": "Invalid format detected",
  "hl7Segment": "PID 3",
  "status": "Unresolved",
  "comments": null,
  "resolvedBy": null,
  "resolvedDate": null
}
```

### Required Fields
- `orderId` (string) - Unique order identifier
- `dateSubmitted` (ISO date string) - When the error was submitted

### Optional Fields
- `errorCode` (string) - Error classification code
- `errorMessage` (string) - Description of the error
- `hl7Segment` (string) - HL7 segment where error occurred
- `status` (string) - Current resolution status
- `comments` (string) - Additional comments
- `resolvedBy` (string) - Name of person who resolved
- `resolvedDate` (ISO date string) - When it was resolved

### Success Response (201)
```json
{
  "status": true,
  "message": "Resolution record created successfully",
  "data": {
    "orderId": "ORD2510280001",
    "dateSubmitted": "2025-10-28T10:30:00.000Z",
    "errorCode": "AE",
    "errorMessage": "Invalid format detected",
    "hl7Segment": "PID 3",
    "status": "Unresolved",
    "comments": null,
    "resolvedBy": null,
    "resolvedDate": null
  }
}
```

### Error Responses
**Validation Error (400)**
```json
{
  "status": false,
  "message": "OrderId and dateSubmitted are required",
  "data": null
}
```

**Duplicate Record (400)**
```json
{
  "status": false,
  "message": "Resolution record with this OrderId and DateSubmitted already exists",
  "data": null
}
```

---

## ✏️ UPDATE Resolution Record

### Endpoint
```
PUT /api/resolutions/:orderId/:dateSubmitted
```

### URL Parameters
- `orderId` - The order ID
- `dateSubmitted` - ISO date string

### Request Body
```json
{
  "status": "Resolved",
  "resolvedBy": "John Doe",
  "resolvedDate": "2025-10-28T15:00:00.000Z",
  "comments": "Fixed formatting issue in PID segment"
}
```

### Example
```bash
PUT /api/resolutions/ORD2510280001/2025-10-28T10:30:00.000Z
```

### Success Response (200)
```json
{
  "status": true,
  "message": "Resolution record updated successfully",
  "data": {
    "orderId": "ORD2510280001",
    "dateSubmitted": "2025-10-28T10:30:00.000Z",
    "errorCode": "AE",
    "errorMessage": "Invalid format detected",
    "hl7Segment": "PID 3",
    "status": "Resolved",
    "comments": "Fixed formatting issue in PID segment",
    "resolvedBy": "John Doe",
    "resolvedDate": "2025-10-28T15:00:00.000Z"
  }
}
```

### Error Response (404)
```json
{
  "status": false,
  "message": "Resolution record not found",
  "data": null
}
```

---

## 🗑️ DELETE Resolution Record

### Endpoint
```
DELETE /api/resolutions/:orderId/:dateSubmitted
```

### URL Parameters
- `orderId` - The order ID
- `dateSubmitted` - ISO date string

### Example
```bash
DELETE /api/resolutions/ORD2510280001/2025-10-28T10:30:00.000Z
```

### Success Response (200)
```json
{
  "status": true,
  "message": "Resolution record deleted successfully",
  "data": null
}
```

### Error Response (404)
```json
{
  "status": false,
  "message": "Resolution record not found",
  "data": null
}
```

---

## 🚨 Common Error Codes

| HTTP Status | Description |
|-------------|-------------|
| `400` | Bad Request - Invalid input or missing required fields |
| `404` | Not Found - Resource doesn't exist |
| `500` | Internal Server Error - Server-side issue |

## 📝 Notes

1. **Composite Primary Key**: Records are identified by the combination of `orderId` and `dateSubmitted`
2. **Date Format**: All dates should be in ISO 8601 format (e.g., "2025-10-28T10:30:00.000Z")
3. **Case Sensitivity**: All string fields are case-sensitive
4. **Null Values**: Optional fields can be `null` or omitted
5. **Boolean Status**: All responses use `true` for success and `false` for errors

## 🧪 Testing Examples

### Using cURL

```bash
# Get all records
curl -X GET "http://localhost:3000/api/resolutions"

# Get statistics
curl -X GET "http://localhost:3000/api/resolutions/stats"

# Create new record
curl -X POST "http://localhost:3000/api/resolutions" \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ORD2510280001",
    "dateSubmitted": "2025-10-28T10:30:00.000Z",
    "errorCode": "AE",
    "errorMessage": "Test error",
    "status": "Unresolved"
  }'

# Update record
curl -X PUT "http://localhost:3000/api/resolutions/ORD2510280001/2025-10-28T10:30:00.000Z" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Resolved",
    "resolvedBy": "Jane Doe",
    "resolvedDate": "2025-10-28T15:00:00.000Z"
  }'

# Delete record
curl -X DELETE "http://localhost:3000/api/resolutions/ORD2510280001/2025-10-28T10:30:00.000Z"
```
