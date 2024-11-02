# AI Assistant Backend API Documentation

A NestJS-based backend for an AI Assistant application with real-time chat capabilities, file handling, and AI integration.

## Table of Contents

- [Authentication](#authentication)
- [Chat](#chat)
- [Files](#files)
- [WebSocket Events](#websocket-events)
- [Code Examples](#code-examples)
  - [CURL](#curl)
  - [JavaScript](#javascript-fetch)
  - [Python](#python-requests)

## Authentication

### Sign Up
```http
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your_password",
  "username": "john_doe"
}
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your_password"
}
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

## Chat

All chat endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Create Chat
```http
POST /chats
Content-Type: application/json

{
  "name": "General Discussion",
  "participants": ["ai_assistant_1", "ai_assistant_2"]
}
```

### Get All Chats
```http
GET /chats
```

### Get Chat by ID
```http
GET /chats/:id
```

### Send Message
```http
POST /chats/:id/messages
Content-Type: application/json

{
  "content": "Hello AI Assistant!",
  "senderId": "user123",
  "senderType": "user",
  "parentMessageId": "optional-parent-message-id"
}
```

## Files

### Upload File
```http
POST /files/upload
Content-Type: multipart/form-data

file: <file_data>
```

### Get File
```http
GET /files/:id
```

## WebSocket Events

Connect to the WebSocket server using Socket.IO client:

```javascript
const socket = io('http://localhost:3000', {
  extraHeaders: {
    Authorization: `Bearer ${token}`
  }
});
```

### Available Events

#### Join Chat
```javascript
// Emit
socket.emit('joinChat', chatId);
```

#### Leave Chat
```javascript
// Emit
socket.emit('leaveChat', chatId);
```

#### Send Message
```javascript
// Emit
socket.emit('sendMessage', {
  chatId: 'chat123',
  content: 'Hello!',
  senderId: 'user123',
  senderType: 'user',
  parentMessageId: 'optional-parent-message-id'
});
```

#### Receive New Message
```javascript
// Listen
socket.on('newMessage', (message) => {
  console.log('New message:', message);
});
```

## Code Examples

### CURL

#### Sign Up
```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "your_password",
    "username": "john_doe"
  }'
```

#### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "your_password"
  }'
```

#### Create Chat
```bash
curl -X POST http://localhost:3000/chats \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "General Discussion",
    "participants": ["ai_assistant_1", "ai_assistant_2"]
  }'
```

#### Get All Chats
```bash
curl -X GET http://localhost:3000/chats \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Get Chat by ID
```bash
curl -X GET http://localhost:3000/chats/CHAT_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Send Message
```bash
curl -X POST http://localhost:3000/chats/CHAT_ID/messages \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Hello AI Assistant!",
    "senderId": "user123",
    "senderType": "user"
  }'
```

#### Upload File
```bash
curl -X POST http://localhost:3000/files/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@/path/to/your/file.jpg"
```

#### Get File
```bash
curl -X GET http://localhost:3000/files/FILE_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### JavaScript (Fetch)

```javascript
// Sign Up
const signUp = async (email, password, username) => {
  const response = await fetch('http://localhost:3000/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      username
    })
  });
  return response.json();
};

// Create Chat
const createChat = async (token, name, participants) => {
  const response = await fetch('http://localhost:3000/chats', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      participants
    })
  });
  return response.json();
};

// Upload File
const uploadFile = async (token, file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('http://localhost:3000/files/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  return response.json();
};
```

### Python (requests)

```python
import requests

# Login
def login(email, password):
    response = requests.post(
        'http://localhost:3000/auth/login',
        json={
            'email': email,
            'password': password
        }
    )
    return response.json()

# Get Chats
def get_chats(token):
    response = requests.get(
        'http://localhost:3000/chats',
        headers={
            'Authorization': f'Bearer {token}'
        }
    )
    return response.json()

# Send Message
def send_message(token, chat_id, content, sender_id):
    response = requests.post(
        f'http://localhost:3000/chats/{chat_id}/messages',
        headers={
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        },
        json={
            'content': content,
            'senderId': sender_id,
            'senderType': 'user'
        }
    )
    return response.json()
```

### Python (Socket.IO)

```python
import socketio

sio = socketio.Client()

@sio.event
def connect():
    print('Connected to server')

@sio.event
def newMessage(message):
    print('New message received:', message)

# Connect to server with authentication
sio.connect('http://localhost:3000', headers={
    'Authorization': f'Bearer {token}'
})

# Join a chat
sio.emit('joinChat', chat_id)

# Send a message
sio.emit('sendMessage', {
    'chatId': 'chat123',
    'content': 'Hello!',
    'senderId': 'user123',
    'senderType': 'user'
})
```

## Error Handling

The API uses standard HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Error responses include a message:

```json
{
  "statusCode": 400,
  "message": "Error message here",
  "error": "Bad Request"
}
```