# Setting Up Image Uploads for Christian Book Store

## Quick Start - Option 1: Use External Image URLs (Easiest)

Just paste image URLs from these sites:
- https://unsplash.com (search for books, bibles, reading)
- https://pexels.com (book images)
- https://pixabay.com (christian images)

## Option 2: Use Cloudinary (For Direct Uploads)

1. Go to https://cloudinary.com
2. Sign up for free account
3. In Dashboard, get your:
   - Cloud Name
   - Upload Preset (or create one: unsigned uploads)
   - API Key (from Settings -> API Keys)

4. Add these to `.env.local`:
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
```

5. Restart the dev server

## Option 3: Cloudinary Image Upload Widget (Recommended for Admin Panel)

For the best experience, I'll integrate Cloudinary's upload widget so you can:
- Drag and drop images
- See previews immediately
- Auto-upload to Cloudinary
- Get the URL automatically

Let me know if you want this option and I'll implement it!
