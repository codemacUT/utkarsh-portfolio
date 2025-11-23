# 🚀 Utkarsh Tiwari - Portfolio Website

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS. Features an AI-powered chat assistant integrated with Google's Gemini API for interactive user engagement.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## ✨ Features

- 🎨 **Modern UI/UX** - Beautiful dark theme with smooth animations and responsive design
- 🤖 **AI Chat Assistant** - Interactive chatbot powered by Google Gemini API
- 💡 **AI Project Idea Generator** - Generate project concepts based on tech stack
- 📱 **Fully Responsive** - Optimized for all devices (mobile, tablet, desktop)
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds
- 🎯 **Smooth Navigation** - Floating navigation bar with active section highlighting
- 🌟 **Interactive Elements** - Hover effects, transitions, and engaging animations

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 3.4.17
- **Icons**: Lucide React
- **AI Integration**: Google Gemini API (Gemini 2.5 Flash)
- **Code Quality**: ESLint

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API key (optional, for AI features)

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/codemacUT/utkarsh-portfolio.git
cd utkarsh-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your Gemini API key to `.env`:
```env
VITE_GEMINI_API_KEY=your_api_key_here
```

> **Note**: The AI features will work in demo mode if no API key is provided, but with limited functionality.

### Development

Run the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

The build output will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## 📁 Project Structure

```
utkarsh-portfolio/
├── public/
│   ├── profile.jpg          # Profile image
│   └── vite.svg             # Favicon
├── src/
│   ├── assets/              # Static assets
│   ├── App.jsx              # Main application component
│   ├── App.css              # Global styles
│   ├── index.css            # Base styles
│   └── main.jsx             # Application entry point
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind configuration
├── vite.config.js           # Vite configuration
└── README.md                # This file
```

## 🎨 Customization

To customize the portfolio for your own use:

1. **Personal Information**: Edit the `PERSONAL_INFO` object in `src/App.jsx`
2. **Skills**: Update the `SKILLS` array with your own skills
3. **Projects**: Modify the `PROJECTS` array with your portfolio projects
4. **Experience**: Update the `EXPERIENCE` array with your background
5. **Styling**: Customize colors and themes in `tailwind.config.js`

## 🔒 Environment Variables

The following environment variables are used:

- `VITE_GEMINI_API_KEY` - Google Gemini API key for AI features (optional)

Create a `.env` file in the root directory and add your variables. See `.env.example` for reference.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

This project can be deployed to various platforms:

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### GitHub Pages
1. Install `gh-pages`: `npm install --save-dev gh-pages`
2. Add to `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
3. Run: `npm run deploy`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Utkarsh Tiwari**

- GitHub: [@codemacUT](https://github.com/codemacUT)
- LinkedIn: [Utkarsh Tiwari](https://www.linkedin.com/in/utkarsh-tiwari-491846274/)
- Email: utkt9502@gmail.com

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide React](https://lucide.dev/) - Icon library
- [Google Gemini API](https://ai.google.dev/) - AI integration

---

⭐ If you found this project helpful, please consider giving it a star!
