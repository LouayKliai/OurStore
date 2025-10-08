# 📦 Product Management

## 🔒 Security Notice

Product management scripts are located in `Back/manage/` folder, which is **excluded from Git** for security reasons.

## 📂 Location

```
Back/manage/
├── manage_products_remote.py      # Main script
├── quick_add_product.py           # Quick template
├── example_add_product.py         # Add examples
├── example_update_product.py      # Update examples
├── example_delete_product.py      # Delete examples
├── PRODUCT_MANAGEMENT_GUIDE.md    # Complete guide
├── QUICK_REFERENCE.md             # Quick reference
└── README.md                      # Folder documentation
```

## 🚀 Quick Start

```bash
# 1. Activate virtual environment
cd /home/mohamed/Documents/projects/OurStore
source .venv/bin/activate

# 2. Navigate to manage folder
cd Back/manage

# 3. Run the main script
python manage_products_remote.py
```

## 📖 Documentation

See `Back/manage/PRODUCT_MANAGEMENT_GUIDE.md` for complete documentation.

## ⚠️ Important

- ✅ Scripts connect to production Render PostgreSQL database
- ✅ Images automatically upload to Cloudinary
- ✅ Folder is in `.gitignore` - will not be committed to Git
- ✅ Keep these scripts private and secure

## 🎯 Features

- **Add products** with automatic image upload to Cloudinary
- **Update products** including prices, stock, and images
- **Delete products** (or deactivate them safely)
- **List products** and categories
- **Bulk operations** supported

## 🔧 What You Can Do

1. **View Products & Categories**
   ```bash
   python manage_products_remote.py
   ```

2. **Add New Products**
   ```bash
   python quick_add_product.py
   ```

3. **Update Existing Products**
   ```bash
   python example_update_product.py
   ```

## 💡 Tips

- Always activate the virtual environment first
- Test with one product before bulk operations
- Use full image paths (not relative)
- Deactivate products instead of deleting when possible
- Images are automatically uploaded to Cloudinary

---

**Need Help?** Check the documentation in `Back/manage/PRODUCT_MANAGEMENT_GUIDE.md`
