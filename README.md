# 🚀 Adithya's Creative Portfolio Website

An extremely creative and interactive portfolio website built with Next.js, featuring a fun DVD-style bouncing profile image and smooth animations.

## ✨ Features

### 🎯 Interactive Entry Screen
- **DVD-style bouncing profile image** - Your profile picture bounces around the screen like the classic DVD logo
- **"Tap anywhere to enter"** - Interactive entry point with smooth animations
- **Floating particles** - Subtle animated elements for visual appeal
- **GSAP animations** - Smooth, professional animations throughout

### 🎨 Main Website
- **Clean, modern design** - Beautiful gradient backgrounds with glassmorphism effects
- **Responsive layout** - Works perfectly on all device sizes
- **Navigation** - Easy navigation between entry screen and main content
- **Placeholder sections** - Ready for your projects, experience, and contact information

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Animations**: GSAP (GreenSock Animation Platform)
- **Fonts**: Geist Sans & Geist Mono
- **Icons**: Lucide React

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## 📱 How It Works

1. **Entry Screen**: Users see your bouncing profile image with "TAP ANYWHERE TO ENTER"
2. **Click/Tap**: Anywhere on the screen triggers the transition animation
3. **Main Website**: Users land on your main portfolio page with navigation back to entry

## 🎨 Customization

### Profile Image
Replace the Unsplash placeholder in `app/components/EntryScreen.js`:
```javascript
backgroundImage: "url('YOUR_IMAGE_URL_HERE')"
```

### Colors & Styling
Modify the gradient backgrounds and colors in the component files using Tailwind CSS classes.

### Content
Update the placeholder content in `app/main/page.js` with your actual portfolio information.

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── components/
│   │   └── EntryScreen.js      # Interactive entry screen
│   ├── main/
│   │   └── page.js             # Main portfolio page
│   ├── globals.css             # Global styles & Tailwind
│   ├── layout.js               # Root layout
│   └── page.js                 # Entry point
├── lib/
│   └── utils.js                # shadcn/ui utilities
└── package.json
```

## 🎭 Animation Details

- **DVD Bouncing**: Random movement patterns with varying speeds
- **Rotation**: Continuous rotation with random duration variations
- **Scale**: Subtle pulsing effect on the profile image
- **Transitions**: Smooth fade and scale animations between pages
- **Particles**: Floating animated elements for visual interest

## 🌟 Future Enhancements

- Add more interactive elements
- Implement smooth page transitions
- Add sound effects
- Create more animation variations
- Add portfolio content sections

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using Next.js, GSAP, and Tailwind CSS**
