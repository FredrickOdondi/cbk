# Christian Book Store Kenya

A modern e-commerce catalog website for Christian Book Store Kenya, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### Customer Features
- Browse all products with filtering and search
- View product details
- Order via WhatsApp and Instagram
- Mobile-responsive design
- Clean, modern UI

### Admin Features
- Password-protected admin dashboard
- Add, edit, and delete products
- Upload product images
- Manage stock status
- Simple session-based authentication

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **UI**: Custom components with shadcn/ui design patterns
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Data Storage**: JSON file (simple, no database needed)
- **Image Storage**: Local filesystem

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd christian-book-store-kenya
```

2. Install dependencies (if needed):
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and update:
- `ADMIN_PASSWORD` - Set a secure password for admin access
- `NEXT_PUBLIC_INSTAGRAM_HANDLE` - Your Instagram handle (without @)
- `NEXT_PUBLIC_WHATSAPP_NUMBER` - Your WhatsApp number (format: 2547XXXXXXXX)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Customer Flow
1. Visit homepage to see featured products
2. Browse all products at `/products`
3. Filter by category (Books/Bibles)
4. Search by title or author
5. Click on a product to view details
6. Order via WhatsApp or Instagram buttons

### Admin Flow
1. Navigate to `/admin`
2. Enter admin password (default: `admin123`)
3. Add new products with images
4. Edit existing products
5. Delete products
6. Manage stock status

## Project Structure

```
christian-book-store-kenya/
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Homepage
│   ├── products/                  # Products pages
│   ├── admin/                     # Admin pages
│   └── api/                       # API routes
├── components/
│   ├── ui/                        # UI components
│   ├── layout/                    # Layout components
│   ├── products/                  # Product components
│   └── admin/                     # Admin components
├── lib/
│   ├── products.ts                # Product operations
│   └── utils.ts                   # Utility functions
├── types/
│   └── product.ts                 # TypeScript types
├── data/
│   └── products.json              # Product data storage
└── public/
    └── uploads/                   # Product images
```

## Configuration

### WhatsApp Number
Update the WhatsApp number in:
- `.env.local` - `NEXT_PUBLIC_WHATSAPP_NUMBER`
- Hardcoded values in components (search for `2547XXXXXXXX`)

### Instagram Handle
Update in:
- `.env.local` - `NEXT_PUBLIC_INSTAGRAM_HANDLE`
- Footer.tsx component

### Admin Password
Change the default password in `.env.local`:
```
ADMIN_PASSWORD=your_secure_password
```

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

## Default Credentials

- **Admin Password**: `admin123` (change this in production!)

## Sample Data

The site comes pre-loaded with 4 sample products:
1. The Holy Bible - NIV (Ksh 2,500)
2. The Purpose Driven Life (Ksh 1,200)
3. Jesus Calling (Ksh 1,500)
4. The Power of Now - Christian Edition (Ksh 1,100)

## Support

For issues or questions, please contact the development team.
# cbk
