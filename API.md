# Atrios Backend API Documentation

This document provides detailed information about all available API endpoints in the Atrios Backend application.

## Base URL

All API endpoints are prefixed with `/api`. For example:
```
http://localhost:5858/api
```

## Authentication

Most endpoints require authentication using a JWT token. Include the token in the Authorization header:
```
Authorization: Bearer your-jwt-token
```

## Endpoints

### Authentication

#### Login
```http
POST /api/login
```

Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "accessToken": "jwt-token-here"
}
```

### Users

#### Create User
```http
POST /api/user
```

Creates a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "id": "user-id",
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Usability Tests

#### Create Usability Test
```http
POST /api/usability-test
```

Creates a new usability test.

**Request Body:**
```json
{
  "name": "Website Navigation Test",
  "description": "Testing the main navigation flow",
  "userId": "user-id",
  "accessCode": "TEST123"
}
```

#### Get All Tests by User
```http
GET /api/usability-test/all/:userId
```

Retrieves all usability tests for a specific user.

**URL Parameters:**
- `userId`: The ID of the user

#### Get Test by ID
```http
POST /api/usability-test/id
```

Retrieves a specific usability test by its ID.

**Request Body:**
```json
{
  "id": "test-id"
}
```

#### Get Test by Name
```http
GET /api/usability-test/name
```

Searches for tests by name.

**Query Parameters:**
- `name`: The name to search for

#### Get Test by Access Code
```http
GET /api/usability-test/accesscode/:accessCode
```

Retrieves a test using its access code.

**URL Parameters:**
- `accessCode`: The access code of the test

#### Update Test
```http
PUT /api/usability-test
```

Updates an existing usability test.

**Request Body:**
```json
{
  "id": "test-id",
  "name": "Updated Test Name",
  "description": "Updated description"
}
```

#### Delete Test
```http
DELETE /api/usability-test
```

Deletes a usability test.

**Request Body:**
```json
{
  "id": "test-id"
}
```

### Tasks

#### Create Task
```http
POST /api/usability-test/task
```

Creates a new task for a usability test.

**Request Body:**
```json
{
  "testId": "test-id",
  "title": "Task Title",
  "description": "Task Description",
  "order": 1
}
```

#### Update Task
```http
PUT /api/usability-test/task
```

Updates an existing task.

**Request Body:**
```json
{
  "id": "task-id",
  "title": "Updated Title",
  "description": "Updated Description",
  "order": 2
}
```

#### Delete Task
```http
DELETE /api/usability-test/task
```

Deletes a task.

**Request Body:**
```json
{
  "id": "task-id"
}
```

### Results

#### Add Result
```http
POST /api/result
```

Adds a new test result.

**Request Body:**
```json
{
  "testId": "test-id",
  "userId": "user-id",
  "startTime": "2024-03-20T10:00:00Z",
  "endTime": "2024-03-20T10:30:00Z"
}
```

#### Get Result by ID
```http
GET /api/result/:id
```

Retrieves a specific result by its ID.

**URL Parameters:**
- `id`: The ID of the result

#### Get Results by Test ID
```http
GET /api/result/test/:testId
```

Retrieves all results for a specific test.

**URL Parameters:**
- `testId`: The ID of the test

#### Update Result
```http
PUT /api/result
```

Updates an existing result.

**Request Body:**
```json
{
  "id": "result-id",
  "endTime": "2024-03-20T11:00:00Z"
}
```

#### Add Task Result
```http
PUT /api/add-result
```

Adds a result for a specific task.

**Request Body:**
```json
{
  "resultId": "result-id",
  "taskId": "task-id",
  "completionTime": 120,
  "success": true,
  "notes": "User completed the task successfully"
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Invalid request parameters"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid authentication token"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
``` 