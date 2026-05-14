# Admin Panel Setup Guide

## Overview
The admin panel allows you to manage:
- **Products**: Add, edit, delete with image uploads to Cloudinary
- **Collections**: Organize products into themed collections
- **Categories**: Create dynamic product categories
- **Frontend Content**: Edit navbar, hero section, footer, and social links

## Backend Setup

### 1. Database Migration
Run the following to create the new tables (add material, dimensions, stock to products):

```bash
# If using Alembic (recommended for SQLAlchemy projects)
alembic revision --autogenerate -m "Add product fields and new models"
alembic upgrade head
```

Or manually run SQL:
```sql
ALTER TABLE products ADD COLUMN material VARCHAR;
ALTER TABLE products ADD COLUMN dimensions VARCHAR;
ALTER TABLE products ADD COLUMN stock INTEGER DEFAULT 0;

CREATE TABLE categories (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR UNIQUE NOT NULL,
  display_name VARCHAR NOT NULL,
  description TEXT,
  icon VARCHAR,
  sort_order BIGINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE frontend_configs (
  id BIGSERIAL PRIMARY KEY,
  config_key VARCHAR UNIQUE NOT NULL,
  config_value JSONB NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_categories_sort ON categories(sort_order);
CREATE INDEX idx_configs_key ON frontend_configs(config_key);
```

### 2. Create First Admin User
Run the backend script to create your first admin:

```bash
python Backend/create_admin.py
```

The script will prompt you to enter a username and password.

**Alternatively**, if you need to add admin via code:
```python
from app.crud import create_admin_user
from app.db.session import SessionLocal

db = SessionLocal()
# Hash the password using passlib
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

admin = create_admin_user(
    db,
    username="admin",
    password_hash=pwd_context.hash("your_secure_password")
)
```

### 3. Initialize Frontend Configs
After the first admin login, initialize frontend configs:

```bash
python Backend/initialize_configs.py
```

Or create a simple script to add default configs:
```python
from app.crud import create_frontend_config
from app.schemas import FrontendConfigCreate
from app.db.session import SessionLocal

db = SessionLocal()

configs = [
    FrontendConfigCreate(
        config_key="navbar",
        config_value={
            "items": [
                {"label": "Home", "href": "/"},
                {"label": "Collections", "href": "/collections"},
                {"label": "About", "href": "/about"},
                {"label": "Contact", "href": "/contact"},
            ]
        }
    ),
    FrontendConfigCreate(
        config_key="hero",
        config_value={
            "title": "Premium Wooden Furniture",
            "subtitle": "Handcrafted from Pakistan for your home",
            "image_url": "https://...",
            "cta_text": "Shop Now",
            "cta_link": "/collections"
        }
    ),
    # Add more configs...
]

for config in configs:
    create_frontend_config(db, config)
```

### 4. Initialize Default Categories
Add the default categories:

```python
from app.crud import create_category
from app.schemas import CategoryCreate
from app.db.session import SessionLocal

db = SessionLocal()

categories = [
    CategoryCreate(name="chairs", display_name="Chairs", icon="🪑", sort_order=0),
    CategoryCreate(name="sofas", display_name="Sofas", icon="🛋️", sort_order=1),
    CategoryCreate(name="beds", display_name="Beds", icon="🛏️", sort_order=2),
    CategoryCreate(name="tables", display_name="Tables", icon="🪑", sort_order=3),
    CategoryCreate(name="wardrobes", display_name="Wardrobes", icon="🚪", sort_order=4),
]

for cat in categories:
    create_category(db, cat)
```

## Frontend Setup

### 1. Environment Variables
Create/Update `.env` file in the frontend folder:

```env
VITE_API_URL=http://localhost:8000/api
```

For production:
```env
VITE_API_URL=https://cfp-backend-a7wo.onrender.com/api
```

### 2. Start Development Server
```bash
cd Frontend/Chiniot-Furniture-Point
npm install
npm run dev
```

### 3. Access Admin Panel
- **Login Page**: `http://localhost:5173/admin/login`
- **Dashboard**: `http://localhost:5173/admin/dashboard`

Login with the admin credentials created in step 2 of backend setup.

## Admin Panel Features

### Products Management
- **Add Product**: Click "Add Product" to create a new item
  - Upload image to Cloudinary
  - Fill in: Name, Subtitle, Price (PKR), Category, Description
  - Advanced fields: Material, Dimensions, Stock, Badge, Featured, Collection
- **Edit Product**: Click edit icon on any product
- **Delete Product**: Click delete icon to remove
- **Bulk Upload**: Coming soon

### Collections Management
- Organize products into themed collections
- Select which categories apply to each collection
- Set sort order for display

### Categories Management
- Create dynamic product categories
- No need to deploy for new categories
- Admins can add categories on-the-fly

### Frontend Editor
- **Navbar**: Add/remove/reorder navigation items
- **Hero Section**: Update title, subtitle, CTA button, and background image
- **Footer**: Edit company info, contact details
- **Social Links**: Add social media profiles

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `GET /api/admin/me` - Get admin profile

### Products
- `GET /api/products` - List products (public)
- `POST /api/admin/products` - Create product (admin)
- `PATCH /api/admin/products/{id}` - Update product (admin)
- `DELETE /api/admin/products/{id}` - Delete product (admin)

### Collections
- `GET /api/collections` - List collections (public)
- `POST /api/admin/collections` - Create collection (admin)
- `PATCH /api/admin/collections/{id}` - Update collection (admin)
- `DELETE /api/admin/collections/{id}` - Delete collection (admin)

### Categories
- `GET /api/categories` - List categories (public)
- `POST /api/admin/categories` - Create category (admin)
- `PATCH /api/admin/categories/{id}` - Update category (admin)
- `DELETE /api/admin/categories/{id}` - Delete category (admin)

### Frontend Config
- `GET /api/frontend-config` - List all configs (public)
- `GET /api/frontend-config/{key}` - Get specific config (public)
- `PATCH /api/admin/frontend-config/key/{key}` - Update config (admin)

### Image Upload
- `POST /api/admin/uploads/product-image` - Upload image (admin)
- `DELETE /api/admin/uploads/product-image?public_id={id}` - Delete image (admin)

## Security Notes

1. **Tokens are stored in localStorage** - Keep admin browser secure
2. **All admin endpoints require JWT token** in Authorization header
3. **Images are uploaded to Cloudinary** - Credentials must be in backend .env
4. **Use strong passwords** for admin accounts

## Troubleshooting

### Admin panel shows blank/404
- Ensure routes are added to `src/app/routes.ts`
- Check browser console for errors
- Verify API_URL is correct

### Images not uploading
- Check Cloudinary credentials in backend .env
- Verify file size is under limits
- Check browser console for CORS issues

### Login not working
- Verify admin user exists in database
- Check JWT secret key in backend .env
- Check network tab for API response

### Products not showing on frontend
- Admin needs to set `featured: true` for featured products
- Or products must be in the correct category/collection
- Check frontend is calling the correct API endpoint

## Next Steps

1. Create initial admin user (see Backend Setup step 2)
2. Initialize frontend configs and categories
3. Start adding products via admin panel
4. Update navbar, hero section, and footer content
5. Customize categories as needed

