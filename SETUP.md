# Christian Book Store Kenya - Setup & Installation Guide

## Project Status: ✅ COMPLETE

All components have been implemented. The project is ready for deployment after installing dependencies.

## Important Notes

### Dependency Installation Issue
Due to npm cache permission issues on the system, some dependencies could not be installed automatically. You'll need to install them manually.

### Manual Installation Steps

1. **Navigate to the project directory:**
   ```bash
   cd /Users/fredrickotieno/Desktop/christian-book-store-kenya
   ```

2. **Fix npm cache permissions (if needed):**
   ```bash
   sudo chown -R $(whoami) ~/.npm
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

   If you encounter peer dependency conflicts with React 19, use:
   ```bash
   npm install --legacy-peer-deps
   ```

4. **Or install missing dependencies individually:**
   ```bash
   npm install tailwindcss postcss autoprefixer --save-dev
   npm install clsx tailwind-merge
   ```

## Configuration

### 1. Environment Variables

The `.env.local` file is already configured with defaults:

```env
ADMIN_PASSWORD=admin123
NEXT_PUBLIC_INSTAGRAM_HANDLE=christianbookstorekenya
NEXT_PUBLIC_WHATSAPP_NUMBER=2547XXXXXXXX
```

**IMPORTANT:** Update these values before production:
- Change `ADMIN_PASSWORD` to a secure password
- Update `NEXT_PUBLIC_WHATSAPP_NUMBER` with your actual WhatsApp number
- Update `NEXT_PUBLIC_INSTAGRAM_HANDLE` with your actual Instagram handle

### 2. WhatsApp & Instagram Links

You need to update hardcoded WhatsApp numbers in these files:
- `components/products/ProductCard.tsx` - Line 12
- `app/products/[id]/page.tsx` - Line 9

Replace `2547XXXXXXXX` with your actual WhatsApp number.

## Running the Application

### Development Mode
```bash
npm run dev
```
Then visit http://localhost:3000

### Production Build
```bash
npm run build
npm start
```

## Default Admin Credentials

- **URL:** http://localhost:3000/admin
- **Password:** admin123

## Features Implemented

### ✅ Customer Features
- Homepage with hero section and featured products
- Product catalog with search and category filters
- Individual product detail pages
- WhatsApp order buttons with pre-filled messages
- Instagram order buttons
- Mobile-responsive design
- Clean, modern UI

### ✅ Admin Features
- Password-protected admin dashboard
- Add new products
- Edit existing products
- Delete products
- Upload product images
- Manage stock status
- Session-based authentication

### ✅ Technical Features
- Next.js 14+ with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Custom UI components (shadcn/ui style)
- JSON file storage (no database needed)
- File upload functionality
- API routes for CRUD operations
- Server-side rendering

## Project Structure

```
christian-book-store-kenya/
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Homepage
│   ├── products/
│   │   ├── page.tsx               # All products
│   │   └── [id]/page.tsx          # Product detail
│   ├── admin/
│   │   ├── page.tsx               # Admin login
│   │   └── dashboard/
│   │       └── page.tsx           # Admin dashboard
│   └── api/
│       ├── products/route.ts      # Products API
│       ├── products/[id]/route.ts # Single product API
│       ├── admin/login/route.ts   # Login API
│       └── upload/route.ts        # Image upload API
├── components/
│   ├── ui/                        # UI components
│   ├── layout/                    # Navbar, Footer, Hero
│   ├── products/                  # ProductCard, ProductGrid
│   ├── admin/                     # ProductForm, ProductTable
│   └── icons.tsx                  # Custom icon components
├── lib/
│   ├── products.ts                # Product operations
│   └── utils.ts                   # Utility functions
├── types/
│   └── product.ts                 # TypeScript types
├── data/
│   └── products.json              # Product storage
└── public/
    └── uploads/                   # Product images
```

## Sample Data

The site includes 4 sample products:
1. The Holy Bible - NIV (Ksh 2,500)
2. The Purpose Driven Life (Ksh 1,200)
3. Jesus Calling (Ksh 1,500)
4. The Power of Now - Christian Edition (Ksh 1,100)

## Troubleshooting

### Issue: Module not found errors
**Solution:** Run `npm install` to install all dependencies

### Issue: Tailwind CSS not working
**Solution:** Ensure tailwindcss is installed: `npm install -D tailwindcss postcss autoprefixer`

### Issue: Port 3000 already in use
**Solution:** Kill the process or use a different port: `npm run dev -- -p 3001`

### Issue: Cannot save products
**Solution:** Ensure the `data/` directory is writable

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
Ensure the platform supports:
- Next.js 14
- Server-side API routes
- File uploads to `/public/uploads`
- File system access for JSON storage

## Security Notes

1. **Change the admin password** before deploying to production
2. The JSON file storage is suitable for small catalogs but consider a database for larger inventories
3. File uploads are saved to `/public/uploads` - ensure this directory is properly secured
4. Session cookies are used for admin authentication

## Next Steps

1. Install dependencies (see above)
2. Update environment variables with your actual details
3. Replace placeholder images in `/public/uploads/` with actual product images
4. Test all functionality
5. Deploy to your hosting platform

## Support

For issues or questions, refer to the README.md file or contact the development team.
