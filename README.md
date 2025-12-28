# Stylora — AI-Powered Open Innovation for Digital Commerce
**Built for TechSprint AI: The Open Innovation Challenge by Google Developer Groups On Campus KL University**

![React](https://img.shields.io/badge/React-18.2.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-10.7.1-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Gemini](https://img.shields.io/badge/Gemini_AI-Google-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16.16-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Modern_Media-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

Stylora is an AI-driven virtual try-on MVP designed to solve real-world problems in fashion e-commerce: reducing returns and enhancing consumer confidence. By leveraging **Google technologies**, we've built a scalable, privacy-conscious solution that brings the fitting room experience to the web.

## 🚀 The Challenge & Our Solution

In the digital era, "fit uncertainty" is the #1 reason for high return rates in fashion. Stylora addresses this by allowing users to instantly see how a garment looks on their own body. Using **Google's ecosystem (Firebase & Gemini AI)**, we’ve created a high-performance system that focuses on:
- **Accuracy**: Intelligent mapping of 2D garments to human poses.
- **Speed**: Optimized client-side rendering for instant feedback.
- **Privacy**: Processing images locally to ensure user data protection.

## ✨ Core Features

- **AI Virtual Try-On Studio**: A clean, balanced workspace for generating virtual looks.
- **Seamless Authentication**: Secure user identity managed by **Google Firebase**.
- **Pose Landmark Detection**: Real-time approximation of body geometry.
- **Smart Stylist (MVP+)**: Integrated with **Google Gemini AI** for garment analysis and fashion advice.

## 🛠 Google Technology Stack & Integration

- **Google Firebase**: 
  - **Authentication**: Managed sign-in flows (Google/Email).
  - **Cloud Firestore**: Real-time database for syncronizing try-on history across devices.
- **Google Gemini AI**: Utilized for sophisticated vision analysis to understand garment characteristics.
- **Vite & React 18**: Chosen for their proximity to modern "Just Execution" development standards.

## 📦 Project Structure

```text
frontend-web/
├── public/              # Static assets
├── src/
│   ├── components/     # Reusable UI components (Loading, Common, etc.)
│   ├── contexts/       # React Contexts (Global Auth Management)
│   ├── pages/          # Page views (Studio, Profile, Login)
│   ├── services/       # Core Logic (Try-On Warp, Firebase, Cloudinary)
│   └── styles/         # Token-based Design System (CSS Variables)
├── vercel.json         # Vercel SPA Routing Configuration
└── vite.config.js      # Build & Plugin Settings
```

## 🧠 How We Did It (Technical Methodology)

1. **Identity Layer**: We used `firebase/auth` hooks to create a persistent user session.
2. **Vision Processing**: When a user uploads a photo, we use landmark detection (approximated for web) to find critical joints (shoulders, hips, etc.).
3. **Non-Rigid Warping**: This is the heart of Stylora. We developed a custom JavaScript pipeline that:
   - Takes a flat garment image.
   - Creates a 3D-like mesh based on the user's pose.
   - Uses affine transforms via the Canvas API to "bend" the clothes onto the human form.
4. **Cloud Integration**: Final results and profile data are securely hosted using a combination of Cloudinary and **Google's Firestore**.

## 🚀 Getting Started (Run the MVP)

### Clone the Repository
```bash
git clone https://github.com/BhanuPrakash-16/stylora-ai-virtual-tryon.git
cd stylora-ai-virtual-tryon/frontend-web
```

### 1. Configure Environment
Create a `.env` file in the `frontend-web` folder and add your project keys:
```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_CLOUD_NAME=your_cloudinary_name
VITE_UPLOAD_PRESET=your_preset
VITE_GEMINI_API_KEY=your_gemini_key
```

### 2. Install & Run
```bash
npm install
npm run dev
```

## ☁️ Deployment (Vercel)
The project includes a `vercel.json` to handle SPA routing. Simply connect your GitHub repo to Vercel and it will auto-deploy the `dist` folder.

## ⚡️ Fair Play & Originality
This project is built from the ground up for **TechSprint AI**. Every line of code for the try-on pipeline and Google technology integration is original, adhering to the competition's strict terms.

---
**GDG KL University | TechSprint AI ⚡️**
👉 [Join the Challenge](https://vision.hack2skill.com/event/gdgoc-25-klu)
