# Cloudinary Setup Instructions

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=dypq1jsp4
CLOUDINARY_API_KEY=527951272348495
CLOUDINARY_API_SECRET=3KvMgaUJ6rdYXX-haDPkOfey8-c

# JWT Configuration (Important for authentication)
JWT_SECRET=your-secret-key-change-in-production
JWT_REFRESH_SECRET=your-refresh-secret-key-change-in-production
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/driveon

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Changes Made

1. **Replaced express-fileupload with multer** for better file handling
2. **Configured multer** to store files in memory (for Cloudinary upload)
3. **Updated upload-photo route** to use multer middleware
4. **Enhanced error handling** for file uploads
5. **Added Cloudinary configuration verification** on server startup

## Testing

1. Make sure the `.env` file exists with Cloudinary credentials
2. Restart the backend server
3. Check server logs for Cloudinary configuration status
4. Test profile photo upload from the frontend

## Troubleshooting

### 401 Unauthorized Error
- Check if JWT_SECRET is set in `.env`
- Verify the token is being sent in the Authorization header
- Check if the token hasn't expired (default: 15 minutes)

### File Upload Errors
- Verify Cloudinary credentials are correct
- Check file size (max 5MB)
- Ensure file is an image (JPEG, PNG, WebP)

