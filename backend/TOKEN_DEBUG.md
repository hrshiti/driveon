# Token Authentication Debugging Guide

## Common 401 Unauthorized Errors

### 1. "Invalid token" Error

**Causes:**
- JWT_SECRET mismatch between token generation and verification
- Token corrupted or malformed
- Token not being sent correctly in request headers

**Solutions:**
1. Check `.env` file has correct `JWT_SECRET`:
   ```env
   JWT_SECRET=driveon-jwt-secret-key-2024
   ```

2. Restart backend server after updating `.env`

3. Clear browser localStorage and log in again:
   ```javascript
   localStorage.clear();
   ```

4. Check browser console for token in request headers

### 2. "Token expired" Error

**Causes:**
- Token has exceeded expiration time (default: 24h)
- System clock mismatch

**Solutions:**
1. Log in again to get a new token
2. Token should auto-refresh if refresh token is available
3. Check system clock is synchronized

### 3. "No token provided" Error

**Causes:**
- Token not stored in localStorage
- Token not being sent in Authorization header
- User not logged in

**Solutions:**
1. Verify user is logged in
2. Check localStorage has `authToken`:
   ```javascript
   console.log(localStorage.getItem('authToken'));
   ```

3. Check Redux store has token:
   ```javascript
   // In browser console
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
   ```

### 4. FormData Upload Issues

**Causes:**
- Authorization header not being sent with FormData
- Content-Type header interfering with multipart/form-data

**Solutions:**
1. The API interceptor now handles FormData correctly
2. Ensure token is in localStorage before upload
3. Check Network tab in DevTools to verify Authorization header is present

## Debugging Steps

1. **Check Token in Browser:**
   ```javascript
   // Open browser console
   console.log('Token:', localStorage.getItem('authToken'));
   console.log('Refresh Token:', localStorage.getItem('refreshToken'));
   ```

2. **Check Backend Logs:**
   - Look for authentication errors
   - Verify JWT_SECRET is loaded
   - Check token verification errors

3. **Test Token Manually:**
   ```bash
   # Get token from localStorage, then:
   curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5000/api/user/profile
   ```

4. **Verify Environment Variables:**
   ```bash
   # In backend directory
   node -e "require('dotenv').config(); console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Missing')"
   ```

## Quick Fixes

### If token keeps expiring:
- Increase `JWT_EXPIRE` in `.env` (e.g., `7d` for 7 days)
- Ensure refresh token mechanism is working

### If getting 401 on all requests:
1. Clear all browser data
2. Log in fresh
3. Check backend `.env` has correct JWT_SECRET
4. Restart backend server

### If upload fails with 401:
1. Verify you're logged in
2. Check token exists in localStorage
3. Try logging out and back in
4. Check Network tab - Authorization header should be present

