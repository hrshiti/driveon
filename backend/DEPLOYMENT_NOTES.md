# Deployment Notes

## Backend URL
✅ **Deployed**: `https://driveon-19hg.onrender.com`

## Frontend Configuration
✅ **Updated**: Frontend now uses production backend URL by default
- Default API URL: `https://driveon-19hg.onrender.com/api`
- Can be overridden with `VITE_API_BASE_URL` environment variable

## Backend CORS Configuration

### Current Setup
Backend CORS is configured to allow:
- Default: `http://localhost:5173` (for local development)
- Production: Set via `FRONTEND_URL` environment variable

### Render Environment Variables
Make sure to set in Render Dashboard → Environment Variables:

```
FRONTEND_URL=https://your-frontend.vercel.app
```

**Important**: Replace `https://your-frontend.vercel.app` with your actual Vercel frontend URL after deployment.

## Testing

### Test Backend
```bash
curl https://driveon-19hg.onrender.com/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is healthy",
  "timestamp": "..."
}
```

### Test API Endpoint
```bash
curl https://driveon-19hg.onrender.com/api/user/profile
```

## Next Steps

1. ✅ Backend deployed on Render
2. ✅ Frontend configured to use production backend
3. ⏳ Deploy frontend on Vercel
4. ⏳ Update `FRONTEND_URL` in Render after frontend deployment
5. ⏳ Test complete flow

