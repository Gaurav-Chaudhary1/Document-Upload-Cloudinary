import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';

// 1. THE FIX: Import the whole cloudinary root package, not just v2
import cloudinary from 'cloudinary'; 
import pkg from 'multer-storage-cloudinary';

const CloudinaryStorage = pkg.CloudinaryStorage || pkg.default?.CloudinaryStorage || pkg;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Login into cloudinary with its keys
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary Storage
const cloudStorage = new CloudinaryStorage({
    // 3. THE FIX: Hand Multer the root object so it can find .v2 on its own
    cloudinary: cloudinary, 
    params: {
        folder: 'my-cloud-uploads',
        allowed_formats: ['jpeg', 'jpg', 'png', 'pdf']
    }
});

// Initialize multer
const upload = multer({
    storage: cloudStorage,
    limits: {
        fileSize: 1024 * 1024 * 5 // limit to 5MB
    }
});

// Upload document route
app.post('/api/upload', (req, res) => {
    try {
        const uploadSingle = upload.single('document');

        uploadSingle(req, res, (err) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
             
            if (!req.file) {
                return res.status(400).json({ message: 'Please upload a document!' });
            }

            res.status(200).json({
                message: 'File uploaded successfully',
                uploadedFile: req.file
            });
        });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// Start a server
app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
});