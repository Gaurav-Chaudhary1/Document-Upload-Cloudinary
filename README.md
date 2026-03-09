# Secure Cloud File Uploader API

A production-ready Node.js REST API that securely handles file uploads (`multipart/form-data`), validates file types and sizes, and streams the media directly to Cloudinary's global CDN. 

## 🚀 Key Features

* **Direct Cloud Storage:** Bypasses local ephemeral file systems (like Render or Heroku) by streaming files directly to Cloudinary using `multer-storage-cloudinary`.
* **Bulletproof Security Filters:** Implements strict Multer middleware to reject malicious files, only allowing `.jpeg`, `.jpg`, `.png`, and `.pdf` extensions.
* **Payload Limits:** Prevents server crashes and storage abuse by strictly limiting incoming file sizes to a maximum of 5MB.
* **Modern ES Modules:** Built using modern ES6 `import` syntax, utilizing a custom `createRequire` bridge to cleanly integrate older CommonJS packages without Node.js conflicts.
* **Environment Security:** Secures all Cloudinary API keys and secrets using `dotenv`.

## 🛠️ Tech Stack

* **Runtime:** Node.js (v23+)
* **Framework:** Express.js
* **File Parsing:** Multer
* **Cloud Storage:** Cloudinary
* **Environment Management:** dotenv

## ⚙️ Installation & Setup

1. **Clone the repository:**
   
   git clone https://github.com/Gaurav-Chaudhary1/Document-Upload-Cloudinary.git
   
   cd your-repo-name
   
Install dependencies:

npm install

Environment Variables:
Create a .env file in the root directory and add your Cloudinary credentials:

Code snippet
PORT=3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

Start the server:

npm run start

