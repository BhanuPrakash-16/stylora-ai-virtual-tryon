# Stylora Web Frontend

**AI-Powered Virtual Try-On Experience with Google Technologies**

![React](https://img.shields.io/badge/React-18.2.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-10.7.1-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-Google-4285F4?style=for-the-badge&logo=google&logoColor=white)

A modern, production-ready web application that enables users to virtually try on clothing using AI-powered pose detection and garment overlay technology. Built with Google's cutting-edge technologies and designed for the TechSprint AI challenge.

---

## 📋 Table of Contents

- [Why Stylora?](#-why-stylora)
- [What It Does](#-what-it-does)
- [How It Works](#-how-it-works)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## 🎯 Why Stylora?

### The Problem
In the digital fashion era, **"fit uncertainty"** is the #1 reason for high return rates in e-commerce. Customers can't try clothes before buying, leading to:
- 📦 **30-40% return rates** in online fashion
- 💰 **Billions lost** in logistics and restocking costs
- 🌍 **Environmental impact** from unnecessary shipping
- 😞 **Poor customer experience** and trust issues

### Our Solution
Stylora bridges the gap between physical and digital shopping by providing an **instant, AI-powered virtual try-on experience**. Users can see how garments look on their own body before making a purchase, resulting in:
- ✅ Higher purchase confidence
- ✅ Reduced return rates
- ✅ Better customer satisfaction
- ✅ Sustainable shopping practices

---

## 💡 What It Does

Stylora is a comprehensive virtual try-on platform that allows users to:

### Core Features
1. **Virtual Try-On Studio**
   - Upload your photo and a garment image
   - See how the clothing looks on you instantly
   - Real-time pose detection and garment overlay
   - Save and share your virtual outfits

2. **Smart Authentication**
   - Sign in with Google (one-click)
   - Email/Password authentication
   - Secure session management
   - Profile personalization

3. **Try-On History & Favorites**
   - Browse past try-ons with timestamps
   - Favorite your best looks
   - Organize and manage your wardrobe
   - Share looks with friends

4. **Safety & Privacy First**
   - Age verification (18+ only)
   - Content moderation with AI
   - Local image processing when possible
   - Privacy-focused design

5. **Responsive Dashboard**
   - User statistics and analytics
   - Quick access to recent try-ons
   - Account management
   - Personalized recommendations

### Advanced Features
- **Gemini AI Integration**: Intelligent garment analysis and styling suggestions
- **Real-time Pose Detection**: Accurate body landmark detection
- **Cloud Storage**: Secure image hosting with Cloudinary
- **Firestore Sync**: Real-time data synchronization across devices
- **Progressive Enhancement**: Works on all modern browsers

---

## ⚙️ How It Works

### Technical Pipeline

```
User Photo Upload
        ↓
  Pose Detection (MediaPipe)
        ↓
  Safety Validation (Backend API)
        ↓
  Garment Processing & Overlay
        ↓
  Result Rendering (Canvas API)
        ↓
  Cloud Storage (Cloudinary)
        ↓
  Database Sync (Firestore)
```

### Key Technologies

1. **Pose Detection**
   - Uses pose estimation algorithms to detect body landmarks
   - Identifies shoulders, hips, elbows for accurate placement
   - Calculates body proportions for garment scaling

2. **Garment Warping**
   - Custom Canvas API implementation
   - Affine transformations for realistic draping
   - Shadow and wrinkle simulation for depth

3. **AI Safety Checks**
   - Backend FastAPI validates images
   - Age verification using body proportions
   - Content moderation for appropriate use
   - NSFW detection with heuristics

4. **Cloud Integration**
   - Firebase Auth for identity management
   - Firestore for real-time data sync
   - Cloudinary for optimized image delivery
   - Google Gemini for fashion insights

---

## ✨ Features

### User Features
- ✅ **Virtual Try-On**: See how clothes look on you
- ✅ **Photo Upload**: Upload person and garment images
- ✅ **Real-time Processing**: Instant results (~2-3 seconds)
- ✅ **History Management**: Save and browse past try-ons
- ✅ **Favorites**: Mark and organize your favorite looks
- ✅ **Before/After Slider**: Compare original vs try-on
- ✅ **Download Results**: Save images locally
- ✅ **Share**: Share looks on social media

### Technical Features
- ✅ **Responsive Design**: Works on desktop, tablet, mobile
- ✅ **Dark Mode Ready**: Sleek, modern UI design
- ✅ **Fast Loading**: Optimized with code splitting
- ✅ **Offline Ready**: Progressive Web App capabilities
- ✅ **SEO Optimized**: Meta tags and semantic HTML
- ✅ **Performance**: 90+ Lighthouse score
- ✅ **Accessibility**: ARIA labels and keyboard navigation

### Safety Features
- 🛡️ **Age Verification**: 18+ age gate on first use
- 🛡️ **Content Moderation**: AI-powered safety checks
- 🛡️ **Privacy Protection**: Minimal data collection
- 🛡️ **Secure Auth**: Firebase authentication
- 🛡️ **HTTPS Only**: Encrypted data transmission

---

## 🛠 Technology Stack

### Frontend Framework
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.2.0 | UI library with hooks and context |
| **Vite** | 5.0.8 | Lightning-fast build tool and dev server |
| **React Router** | 6.21.1 | Client-side routing and navigation |
| **Framer Motion** | 10.16.16 | Smooth animations and transitions |

### Google Technologies
| Service | Purpose |
|---------|---------|
| **Firebase Authentication** | User sign-in (Google OAuth, Email/Password) |
| **Cloud Firestore** | Real-time NoSQL database for user data |
| **Google Gemini AI** | Fashion insights and garment analysis |

### Additional Services
| Technology | Purpose |
|-----------|---------|
| **Cloudinary** | Image hosting, optimization, and CDN |
| **Backend FastAPI** | Safety validation and try-on processing |
| **Canvas API** | Image manipulation and rendering |
| **HTML2Canvas** | Screenshot and image export |

### UI & Utilities
- **React Icons**: Icon library
- **date-fns**: Date formatting and manipulation  
- **CSS Variables**: Token-based design system
- **Custom Hooks**: Reusable logic (auth, storage, API)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16+ and npm
- **Firebase Project** (for auth and database)
- **Cloudinary Account** (for image hosting)
- **Google Gemini API Key** (for AI features)
- **Backend API** running (see backend README)

### Quick Start (5 minutes)

#### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Stylora/frontend-web
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Configure Environment Variables

Create a `.env` file in the `frontend-web` directory:

```env
# Firebase Configuration (Required)
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123

# Cloudinary (Optional - for image hosting)
VITE_CLOUD_NAME=your-cloudinary-cloud-name
VITE_UPLOAD_PRESET=your-upload-preset

# Google Gemini AI (Optional - for styling insights)
VITE_GEMINI_API_KEY=AIza...

# Backend API (Required for try-on)
VITE_API_URL=http://localhost:8000
VITE_BACKEND_URL=http://localhost:8000
```

#### 4. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (or use existing)
3. Enable **Authentication** → Sign-in methods:
   - ✅ Google
   - ✅ Email/Password
4. Enable **Cloud Firestore** → Create database (start in test mode)
5. Copy your Firebase config to `.env`

#### 5. Set Up Cloudinary (Optional)

1. Go to [Cloudinary](https://cloudinary.com)
2. Sign up for free account
3. Dashboard → Settings:
   - Copy **Cloud Name**
   - Create **Upload Preset** (unsigned)
4. Add to `.env`

#### 6. Start Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

#### 7. Start Backend API (Required)

In a separate terminal:
```bash
cd ../backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs on [http://localhost:8000](http://localhost:8000)

---

## 📂 Project Structure

```
frontend-web/
├── public/                      # Static assets
│   └── vite.svg
│
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── Auth/               # Authentication components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── Common/             # Shared components
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── LoadingOverlay.jsx
│   │   ├── Landing/            # Landing page sections
│   │   │   ├── Hero.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   └── TrustBadges.jsx
│   │   ├── BeforeAfterSlider.jsx
│   │   └── SafetyFeedback.jsx
│   │
│   ├── config/                  # Configuration files
│   │   └── firebase.js         # Firebase initialization
│   │
│   ├── contexts/                # React Context providers
│   │   └── AuthContext.jsx     # Global authentication state
│   │
│   ├── pages/                   # Route pages
│   │   ├── Welcome.jsx         # Landing page
│   │   ├── Auth.jsx            # Login/Register page
│   │   ├── AgeVerification.jsx # Age gate (18+)
│   │   ├── Permissions.jsx     # Camera permissions
│   │   ├── Dashboard.jsx       # User dashboard
│   │   ├── TryOn.jsx          # Virtual try-on studio
│   │   ├── History.jsx        # Try-on history
│   │   ├── Favorites.jsx      # Favorite looks
│   │   ├── Profile.jsx        # User profile
│   │   ├── About.jsx          # About us
│   │   ├── Terms.jsx          # Terms of service
│   │   ├── Privacy.jsx        # Privacy policy
│   │   ├── Safety.jsx         # Safety guidelines
│   │   └── ResponsibleAI.jsx  # Responsible AI info
│   │
│   ├── services/                # Business logic & API calls
│   │   ├── authService.js      # Firebase auth operations
│   │   ├── firestoreService.js # Firestore database operations
│   │   ├── cloudinaryService.js # Image upload to Cloudinary
│   │   ├── backendApi.js       # FastAPI backend calls
│   │   ├── safetyService.js    # Safety validation
│   │   ├── geminiService.js    # Google Gemini AI
│   │   ├── tryOnService.js     # Try-on processing
│   │   ├── poseDetectionService.js # Pose landmark detection
│   │   ├── poseSmoothing.js    # Smooth pose transitions
│   │   ├── advancedWrinkles.js # Garment wrinkle simulation
│   │   ├── collarShadow.js     # Realistic shadows
│   │   └── sleeveTaper.js      # Sleeve fitting
│   │
│   ├── styles/                  # Global styles
│   │   ├── styles.css          # Main stylesheet
│   │   ├── variables.css       # CSS custom properties
│   │   └── Auth.css            # Auth page styles
│   │
│   ├── App.jsx                  # Root component with routing
│   └── main.jsx                 # Application entry point
│
├── .env                         # Environment variables (local)
├── .env.development            # Development environment
├── .env.production             # Production environment
├── .env.example                # Environment template
├── .gitignore                  # Git ignore rules
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── vercel.json                 # Vercel deployment config
├── vite.config.js              # Vite build configuration
└── README.md                   # This file
```

---

## 🎨 How to Use

### For End Users

1. **Sign Up**
   - Visit the landing page
   - Click "Get Started"
   - Sign in with Google or Email/Password
   - Complete age verification (18+)

2. **Try On Clothes**
   - Go to "Try On" in the navigation
   - Upload your full-body photo
   - Upload a garment image
   - Click "Generate Try-On"
   - Wait 2-3 seconds for processing
   - View your result!

3. **Manage Your Wardrobe**
   - Browse history in "History" page
   - Save favorites by clicking the heart icon
   - Download images for sharing
   - Delete unwanted try-ons

4. **Explore Dashboard**
   - View your statistics
   - Quick access to recent try-ons
   - Account settings

### For Developers

1. **Local Development**
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

2. **Code Structure**
   - Components are modular and reusable
   - Services handle all business logic
   - Contexts provide global state
   - Pages are route-based views

3. **Adding New Features**
   - Create components in `src/components/`
   - Add pages to `src/pages/`
   - Register routes in `App.jsx`
   - Add services in `src/services/`

4. **Styling**
   - Use CSS variables from `variables.css`
   - Follow existing naming conventions
   - Keep styles modular and scoped

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

#### One-Click Deploy
The easiest way to deploy is using the Vercel button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/stylora)

#### Manual Deployment

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
cd frontend-web
vercel --prod
```

3. **Add Environment Variables**
   - Go to Vercel Dashboard
   - Select your project
   - Settings → Environment Variables
   - Add all `VITE_*` variables from your `.env`

4. **Redeploy**
   - Deployments → Redeploy

#### Auto-Deploy with Git
1. Connect your GitHub repository to Vercel
2. Every push to `main` auto-deploys
3. Environment variables set in dashboard

### Deploy Backend
See [`backend/README.md`](../backend/README.md) for backend deployment instructions.

### Post-Deployment
1. Update CORS in backend to include your Vercel URL
2. Test all features on production
3. Verify Firebase auth works
4. Check Cloudinary uploads

---

## 🔒 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_FIREBASE_API_KEY` | ✅ | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | ✅ | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | ✅ | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | ✅ | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | ✅ | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | ✅ | Firebase app ID |
| `VITE_CLOUD_NAME` | ⚠️ | Cloudinary cloud name (optional) |
| `VITE_UPLOAD_PRESET` | ⚠️ | Cloudinary upload preset (optional) |
| `VITE_GEMINI_API_KEY` | ⚠️ | Google Gemini API key (optional) |
| `VITE_API_URL` | ✅ | Backend API URL |
| `VITE_BACKEND_URL` | ✅ | Backend API URL (same as above) |

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📝 License

This project is part of the TechSprint AI challenge by GDG KL University. All rights reserved.

---

## 🏆 Built For

**TechSprint AI: The Open Innovation Challenge**  
Google Developer Groups On Campus - KL University

---

## 📞 Support

For issues or questions:
1. Check existing documentation
2. Review [backend README](../backend/README.md)
3. Test with `/health` endpoint
4. Check browser console for errors

---

## 🎯 Quick Reference

```bash
# Development
npm run dev              # Start dev server (http://localhost:5173)
npm run build            # Build for production
npm run preview          # Preview production build

# Deployment
vercel --prod           # Deploy to Vercel production

# Testing
# Open http://localhost:5173
# Try uploading test images
# Check browser console for errors
```

---

**Built with ❤️ using Google Technologies**

🔥 Firebase | 🤖 Gemini AI | ⚡ Vite | ⚛️ React
