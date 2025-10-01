# 🎥 Video Platform - YouTube Clone Backend

A comprehensive and feature-rich backend for a video hosting platform similar to YouTube. This project demonstrates professional backend development practices with Node.js, implementing all essential features for a modern video sharing platform.

## 🌟 Project Overview

This is a complete backend project built with industry-standard practices and technologies. The platform includes all the core features you'd expect from a video hosting service, including user management, video operations, social interactions, and secure authentication systems.

## ✨ Key Features

### 🔐 Authentication & Security
- User registration and login
- JWT-based authentication (Access tokens & Refresh tokens)
- Password encryption with bcrypt
- Secure session management
- Protected routes and middleware

### 📹 Video Management
- Video upload functionality
- Video streaming and playback
- Video metadata management
- Video search and filtering
- Video categorization and tagging

### 👥 User Interactions
- Like and dislike videos
- Comment system with replies
- Subscribe and unsubscribe to channels
- User profiles and channel management
- View history and watch later

### 🔍 Additional Features
- Advanced search functionality
- Video recommendations
- User dashboard
- Analytics and metrics
- File upload handling
- Error handling and validation

## 🛠️ Technologies Used

### Backend Framework
- **Node.js** - Runtime environment
- **Express.js** - Web application framework

### Database
- **MongoDB** - NoSQL database
- **Mongoose** - Object modeling for MongoDB

### Authentication & Security
- **JWT (JSON Web Tokens)** - Authentication tokens
- **bcrypt** - Password hashing
- **Cookie handling** - Session management

### Additional Tools & Libraries
- **Multer** - File upload handling
- **Cloudinary** - Media storage and management
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **Express middleware** - Various utility middleware

## 📁 Project Structure

```
├── src/
│   ├── controllers/     # Request handlers
│   ├── models/         # Database schemas
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── utils/          # Utility functions
│   ├── config/         # Configuration files
│   └── validators/     # Input validation
├── public/             # Static files
├── uploads/            # File uploads (local)
├── .env.example        # Environment variables template
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd vid
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Fill in your environment variables:
   ```env
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Start the production server**
   ```bash
   npm start
   ```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/v1/users/register` - User registration
- `POST /api/v1/users/login` - User login
- `POST /api/v1/users/logout` - User logout
- `POST /api/v1/users/refresh-token` - Refresh access token

### Video Endpoints
- `GET /api/v1/videos` - Get all videos
- `POST /api/v1/videos` - Upload video
- `GET /api/v1/videos/:id` - Get video by ID
- `PATCH /api/v1/videos/:id` - Update video
- `DELETE /api/v1/videos/:id` - Delete video

### User Interaction Endpoints
- `POST /api/v1/videos/:id/like` - Like/unlike video
- `POST /api/v1/videos/:id/comment` - Add comment
- `POST /api/v1/users/:id/subscribe` - Subscribe to user

*More detailed API documentation will be added as the project evolves.*

## 🔧 Configuration

The project uses environment variables for configuration. Key settings include:

- **Database Configuration**: MongoDB connection settings
- **Authentication**: JWT secrets and token expiry times
- **File Storage**: Cloudinary configuration for media files
- **Server Settings**: Port, CORS settings, and other server configurations

## 🧪 Testing

```bash
# Run tests (when available)
npm test

# Run tests in watch mode
npm run test:watch
```

## 📝 Development Notes

This project follows industry best practices including:

- **MVC Architecture**: Clean separation of concerns
- **Error Handling**: Comprehensive error management
- **Input Validation**: Robust data validation
- **Security**: Multiple layers of security measures
- **Code Organization**: Modular and maintainable code structure
- **Environment Management**: Proper configuration management

## 📋 Todo / Roadmap

- [ ] Add comprehensive test suite
- [ ] Implement video transcoding
- [ ] Add video quality options
- [ ] Implement real-time notifications
- [ ] Add video analytics dashboard
- [ ] Implement video thumbnails generation
- [ ] Add social sharing features
- [ ] Implement advanced search filters

## 🐛 Known Issues

- Document any known issues here as they are discovered
- Include workarounds if available

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Govind** - Web Developer

