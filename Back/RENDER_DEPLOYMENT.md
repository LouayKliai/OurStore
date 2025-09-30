# OurStore Backend - Render Deployment Guide

## 🚀 Deployment Steps

### 1. Prepare Your Repository
```bash
# Make sure all changes are committed
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Create Render Account
1. Go to [render.com](https://render.com) and sign up
2. Connect your GitHub account

### 3. Deploy Database (PostgreSQL)
1. Click "New" → "PostgreSQL"
2. Name: `ourstore-db`
3. Database: `ourstore_db`
4. Username: `ourstore_user`
5. Plan: Free
6. Click "Create Database"
7. **Copy the connection string** (you'll need it later)

### 4. Deploy Backend Service
1. Click "New" → "Web Service"
2. Connect your GitHub repository
3. Configure service:
   - **Name**: `ourstore-backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python start.py`

### 5. Configure Environment Variables
In your Render service settings, add these environment variables:

#### Required Variables:
```
FLASK_ENV=production
SECRET_KEY=your-generated-secret-key
JWT_SECRET_KEY=your-generated-jwt-secret
DATABASE_URL=postgresql://from-your-database
CORS_ORIGINS=https://your-frontend-domain.onrender.com
```

#### Cloudinary (for image storage):
```
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
USE_CLOUDINARY=true
```

#### Contact Information:
```
CONTACT_EMAIL=support@yourstore.com
CONTACT_PHONE=+1 (555) 123-4567
CONTACT_WHATSAPP=+1 (555) 123-4567
CONTACT_ADDRESS_LINE1=123 Commerce Street
CONTACT_ADDRESS_LINE2=Business District, NY 10001
CONTACT_BUSINESS_HOURS=Monday - Friday: 9AM - 6PM EST
```

### 6. Deploy Frontend (Optional)
1. Create another web service for the frontend
2. **Name**: `ourstore-frontend`
3. **Runtime**: `Node`
4. **Build Command**: `npm install && npm run build`
5. **Start Command**: `npm start`
6. Add environment variable: `API_URL=https://your-backend-service.onrender.com`

### 7. Update CORS Origins
After deploying both services, update the `CORS_ORIGINS` in your backend service to include your frontend URL.

## 🔧 Alternative Deployment Methods

### Using render.yaml (Recommended)
1. Push the `render.yaml` file to your repository
2. In Render dashboard, click "New" → "Blueprint"
3. Connect your repository
4. Render will automatically create services based on render.yaml

### Using Dockerfile
1. Use the provided `Dockerfile` instead of build commands
2. Set runtime to "Docker"
3. Render will build and deploy using the Dockerfile

## 📊 Health Checks

Your backend includes a health check endpoint:
- **URL**: `https://your-service.onrender.com/api/health`
- **Method**: GET
- **Expected Response**: `{"status": "healthy", "message": "OurStore API is running", "version": "1.0.0"}`

## 🗄️ Database Setup

After deployment, run the database migrations:
```bash
# If you have SSH access to Render (paid plans)
render ssh
cd /app
python -c "from app.factory import create_app; from app.core.database import db; app = create_app(); app.app_context().push(); db.create_all()"
```

Or create a simple script to run migrations on startup.

## 🌐 Domain Configuration

1. In Render service settings, go to "Custom Domains"
2. Add your custom domain
3. Update DNS records as instructed
4. Update `CORS_ORIGINS` to include your custom domain

## 🔒 Security Notes

- Never commit `.env` files to version control
- Use Render's generated secrets for `SECRET_KEY` and `JWT_SECRET_KEY`
- Regularly rotate API keys and secrets
- Monitor your service logs in Render dashboard

## 🐛 Troubleshooting

### Common Issues:

1. **Port binding**: Render automatically assigns ports, use `PORT` environment variable
2. **Database connection**: Ensure `DATABASE_URL` is correctly set
3. **CORS errors**: Update `CORS_ORIGINS` with correct frontend URL
4. **Static files**: Use Cloudinary for image storage (already configured)

### Logs:
Check Render service logs for detailed error messages and debugging information.

## 📞 Support

If you encounter issues:
1. Check Render service logs
2. Verify environment variables are set correctly
3. Test API endpoints using curl or Postman
4. Ensure database is accessible

## 🎉 Success Checklist

- [ ] Backend service is deployed and healthy
- [ ] Database is connected and tables created
- [ ] Environment variables are configured
- [ ] CORS is properly configured
- [ ] Frontend can communicate with backend
- [ ] Contact form works
- [ ] Image upload works (Cloudinary)
- [ ] Admin panel accessible