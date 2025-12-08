# Arch Portfolio - Indrajeeth's Developer Portfolio

A beautiful, interactive developer portfolio inspired by Arch Linux. Experience a fully functional desktop environment in your browser, complete with windows, terminal, and Arch's signature minimalist aesthetic.

![Arch Linux](https://img.shields.io/badge/Arch_Linux-1793D1?style=for-the-badge&logo=arch-linux&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Features

- 🖥️ **Interactive Desktop Environment** - Full Arch Linux-inspired desktop with draggable windows
- 🌙 **Dark Theme** - Eye-friendly dark theme matching Arch's aesthetic
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- ⚡ **Fast & Lightweight** - Built with Vite for lightning-fast performance
- 🎨 **Beautiful Animations** - Smooth transitions and animations using Framer Motion
- 🎵 **Music Player** - Built-in music player in the activities menu
- 📸 **Camera App** - Interactive camera application
- 🎮 **Easter Eggs** - Includes Minecraft (Eaglercraft) and other fun features
- 🔧 **Terminal Emulator** - Functional terminal interface

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready animation library
- **shadcn/ui** - High-quality, accessible UI components
- **Radix UI** - Unstyled, accessible component primitives

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed ([Download](https://nodejs.org/))
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/IndrajeethY/Arch-Portifolio.git
cd Arch-Portifolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:8080`

### Building for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Customization

### Animated Wallpaper Setup

To add a custom animated wallpaper:

1. Place your video file as `wallpaper.mp4` (MP4 format) or `wallpaper.webm` (WebM format) in the `public/` folder
2. Create a poster image as `wallpaper-poster.jpg` (first frame of video)
3. The wallpaper is fully responsive and will automatically adjust for different screen sizes

If no video files are present, a beautiful Arch Linux pattern will be displayed as fallback.

### Startup Sound Setup

To add the Linux startup sound:

1. Find or download a Linux startup sound (e.g., Ubuntu startup sound, Arch boot sound, etc.)
   - Recommended: Short sound (1-3 seconds)
   - Format: MP3, WAV, or OGG
2. Rename the file to `startup-sound.mp3`
3. Place it in the `public/` folder
4. The sound will automatically play when you log in to the desktop

**Note:** Due to browser autoplay policies, the sound may require user interaction on the first visit. The volume is set to 30% to avoid being too loud.

### Modifying Content

- **About Me**: Edit `/src/components/windows/AboutContent.tsx`
- **Projects**: Edit `/src/components/windows/ProjectsContent.tsx`
- **Resume**: Edit `/src/components/windows/ResumeContent.tsx`
- **Contact Info**: Edit `/src/components/windows/ContactContent.tsx`
- **Social Links**: Edit `/src/components/ActivitiesMenu.tsx`

## 📁 Project Structure

```
Arch-Portifolio/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── windows/     # Window content components
│   │   ├── ui/          # shadcn/ui components
│   │   └── ...          # Other components
│   ├── pages/           # Page components
│   └── main.tsx         # Application entry point
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
└── tailwind.config.ts   # Tailwind CSS configuration
```

## 🎯 Key Features Breakdown

### Boot Sequence
Experience an authentic Linux boot sequence when loading the portfolio.

### Login Screen
A realistic Linux login screen with smooth transitions.

### Desktop Environment
- Draggable and resizable windows
- Multiple windows support with z-index management
- Window minimize functionality
- Taskbar with active window indicators

### Activities Menu
Quick access to:
- Music Player
- Firefox Browser
- Camera
- Minecraft (Eaglercraft)
- System Information
- Social Media Links

### System Tray
Real-time display of:
- WiFi status
- Volume level
- Battery status (if supported)
- Current time and date

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Indrajeeth**

- GitHub: [@IndrajeethY](https://github.com/IndrajeethY)
- LinkedIn: [@indrajeethy](https://www.linkedin.com/in/indrajeethy)
- Twitter: [@tamilvip007](https://twitter.com/tamilvip007)

## 🙏 Acknowledgments

- Inspired by Arch Linux's philosophy: simplicity, minimalism, and user-centricity
- Built with amazing open-source tools and libraries
- Special thanks to the React and Vite communities

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/IndrajeethY/Arch-Portifolio/issues).

---

**Made with ❤️ and lots of ☕ - BTW, I use Arch!**
