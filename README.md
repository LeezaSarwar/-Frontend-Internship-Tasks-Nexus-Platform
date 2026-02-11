# 🚀 Nexus - Investor & Entrepreneur Collaboration Platform

<div align="center">

![Nexus Platform](https://img.shields.io/badge/Nexus-Platform-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

**A comprehensive platform connecting investors with entrepreneurs, featuring real-time collaboration tools, document management, and secure payment processing.**

[Live Demo](https://nexus-iota-five.vercel.app/login) • [Report Bug](https://github.com/leezasarwar/nexus/issues) • [Request Feature](https://github.com/leezasarwar/nexus/issues)

</div>

---

## 👩‍💻 Developer

**Leeza Sarwar**
Frontend Developer | React Specialist | UI/UX Enthusiast

This project was developed as part of an Advanced Frontend Internship, showcasing modern React development practices, TypeScript implementation, and responsive design principles.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Key Features Deep Dive](#-key-features-deep-dive)
- [Screenshots](#-screenshots)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## ✨ Features

### 🎯 Core Features
- **Role-Based Authentication** - Separate dashboards for Investors and Entrepreneurs
- **User Profiles** - Detailed profiles with portfolio/startup information
- **Real-time Messaging** - Chat system for direct communication
- **Notifications** - Stay updated with important events and activities

### 📅 Meeting Calendar (Week 1)
- Interactive calendar with **FullCalendar** integration
- Add and manage availability slots
- Send and receive meeting requests
- Accept/decline meeting invitations
- View confirmed meetings and upcoming schedule
- Fully responsive calendar interface

### 🎥 Video Calls (Week 2)
- Professional video call interface
- Start/end call controls
- Video and audio toggle functionality
- Screen sharing capability
- Participant management
- Recent calls history
- Scheduled meetings integration

### 📄 Document Chamber (Week 2)
- Secure document upload with **drag-and-drop**
- Support for PDF, DOC, DOCX files
- Document preview functionality
- **E-signature integration** with signature pad
- Status tracking: Draft, In Review, Signed
- Document sharing capabilities
- Real-time status updates

### 💰 Payments & Wallet (Week 3)
- Digital wallet with balance tracking
- Deposit funds simulation
- Withdraw funds to bank account
- Transfer money between users
- **Fund deals** (Investor → Entrepreneur pathway)
- Comprehensive transaction history
- Payment status indicators
- Transaction filtering and export

### 🔒 Enhanced Security (Week 3)
- **Password strength meter** with real-time feedback
- **Two-factor authentication (2FA)** with OTP
- Security overview dashboard
- Password requirements validation
- Role-based access control
- Secure session management

---

## 🛠️ Tech Stack

### Frontend
- **React** 18.3.1 - UI library
- **TypeScript** 5.5.3 - Type safety
- **Vite** 5.4.2 - Build tool
- **Tailwind CSS** 3.4.1 - Styling

### Libraries & Tools
- **React Router DOM** 6.22.1 - Routing
- **FullCalendar** 6.1.20 - Calendar functionality
- **React Dropzone** 14.2.3 - File uploads
- **React Signature Canvas** - E-signatures
- **Lucide React** 0.344.0 - Icons
- **React Hot Toast** 2.4.1 - Notifications
- **Axios** 1.6.7 - HTTP client
- **date-fns** 3.3.1 - Date utilities

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/leezasarwar/nexus.git
cd nexus
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open your browser**
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
nexus/
├── src/
│   ├── components/
│   │   ├── chat/              # Chat components
│   │   ├── collaboration/     # Collaboration request cards
│   │   ├── entrepreneur/      # Entrepreneur-specific components
│   │   ├── investor/          # Investor-specific components
│   │   ├── layout/            # Layout components (Navbar, Sidebar, Footer)
│   │   └── ui/                # Reusable UI components (Button, Card, Input, etc.)
│   │
│   ├── context/
│   │   └── AuthContext.tsx    # Authentication context & state management
│   │
│   ├── data/                  # Mock data for development
│   │   ├── users.ts
│   │   ├── messages.ts
│   │   └── collaborationRequests.ts
│   │
│   ├── pages/
│   │   ├── auth/              # Login, Register, Password Reset
│   │   ├── calendar/          # Meeting Calendar (NEW)
│   │   ├── chat/              # Chat interface
│   │   ├── dashboard/         # Role-based dashboards
│   │   ├── deals/             # Investment deals
│   │   ├── documents/         # Document Chamber (ENHANCED)
│   │   ├── payments/          # Payments & Wallet (NEW)
│   │   ├── profile/           # User profiles
│   │   ├── settings/          # Settings with security (ENHANCED)
│   │   └── video/             # Video calls (NEW)
│   │
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts
│   │
│   ├── App.tsx                # Main app component with routing
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles & Tailwind imports
│
├── public/                    # Static assets
├── dist/                      # Production build output
├── tailwind.config.js         # Tailwind configuration
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

---

## 🎨 Key Features Deep Dive

### 1. Meeting Calendar System

The calendar system uses **FullCalendar** to provide a professional scheduling experience:

- **Availability Management**: Users can add time slots when they're available
- **Meeting Requests**: Send requests to other users for specific time slots
- **Request Handling**: Accept or decline incoming meeting requests
- **Visual Indicators**: Color-coded events (confirmed, pending, available)
- **Responsive Design**: Optimized for mobile, tablet, and desktop

**Key Files:**
- `src/pages/calendar/CalendarPage.tsx`

### 2. Video Call Interface

A professional video calling interface with mock functionality:

- **Call Controls**: Start/end calls with intuitive buttons
- **Media Controls**: Toggle video and audio on/off
- **Screen Sharing**: Option to share screen during calls
- **Participant View**: Display multiple participants
- **Call History**: Track recent and scheduled calls

**Key Files:**
- `src/pages/video/VideoCallPage.tsx`

### 3. Document Chamber

Secure document management with e-signature capabilities:

- **Drag & Drop Upload**: Easy file upload using react-dropzone
- **Document Preview**: View documents before signing
- **E-Signatures**: Digital signature pad for signing documents
- **Status Workflow**: Track document status (Draft → In Review → Signed)
- **Document Management**: Organize and manage all documents

**Key Files:**
- `src/pages/documents/DocumentsPage.tsx`

### 4. Payment System

Complete payment and wallet management:

- **Digital Wallet**: Track balance and transactions
- **Multiple Operations**: Deposit, withdraw, transfer, and fund deals
- **Transaction History**: Detailed record of all transactions
- **Deal Funding**: Special flow for investors to fund entrepreneur deals
- **Status Tracking**: Monitor transaction status (completed, pending, failed)

**Key Files:**
- `src/pages/payments/PaymentsPage.tsx`

### 5. Security Features

Enhanced security with modern authentication practices:

- **Password Strength Meter**: Real-time feedback on password quality
- **2FA Authentication**: Two-factor authentication with OTP
- **Security Dashboard**: Overview of account security status
- **Password Validation**: Enforce strong password requirements
- **Role-Based Access**: Different permissions for different user roles

**Key Files:**
- `src/pages/settings/SettingsPage.tsx`

---

## 📱 Responsive Design

The platform is fully responsive across all devices:

- **Mobile**: 320px - 767px (Optimized for touch)
- **Tablet**: 768px - 1024px (Balanced layout)
- **Desktop**: 1025px+ (Full feature display)

All components adapt seamlessly to different screen sizes with:
- Flexible layouts using CSS Grid and Flexbox
- Responsive typography
- Touch-friendly buttons and controls
- Optimized navigation for mobile

---

## 🎨 Design System

### Color Palette

```css
Primary (Blue):    #3B82F6  /* Main brand color */
Secondary (Teal):  #14B8A6  /* Accent color */
Accent (Amber):    #F59E0B  /* Highlights */
Success (Green):   #22C55E  /* Positive actions */
Warning (Orange):  #F59E0B  /* Cautions */
Error (Red):       #EF4444  /* Errors and alerts */
```

### Typography

- **Font Family**: Inter var, sans-serif
- **Headings**: Bold, responsive sizing
- **Body Text**: Regular weight, optimized line height
- **Code**: Monospace font for technical content

### Components

All UI components follow a consistent design pattern:
- Rounded corners (border-radius: 0.375rem)
- Subtle shadows for depth
- Smooth transitions (200ms)
- Focus states for accessibility

---

## 🔐 Authentication

The platform uses a mock authentication system for demonstration:

- Email and password login
- Role-based access (Investor/Entrepreneur)
- Password reset functionality
- Session persistence with localStorage
- Protected routes

### Demo Credentials

Check `src/data/users.ts` for available demo accounts.

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel --prod
```

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. The `dist` folder contains the production build
3. Upload to your hosting provider

---

## 🧪 Testing

The application includes:
- Mock data for all features
- Simulated API calls with delays
- Toast notifications for user feedback
- Comprehensive error handling
- Form validation

---

## 📊 Performance

- **Build Size**: ~681KB (optimized)
- **First Load**: Fast with code splitting
- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Use TypeScript for type safety
- Follow React hooks best practices
- Use Tailwind CSS for styling
- Keep components modular and reusable
- Add proper error handling
- Write meaningful commit messages

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

**Leeza Sarwar**

- GitHub: [@leezasarwar](https://github.com/leezasarwar)
- LinkedIn: [leezasarwar](https://linkedin.com/in/leezasarwar)
- Email: leeza.sarwar@example.com

---

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **FullCalendar** - For the calendar component
- **Lucide** - For the beautiful icons
- **Vercel** - For seamless deployment
- **All contributors and supporters**

---

## 📈 Project Timeline

- **Week 1**: Setup, Calendar Integration
- **Week 2**: Video Calls, Document Chamber
- **Week 3**: Payments, Security, Polish

**Total Development Time**: 3 Weeks
**Status**: ✅ Complete

---

## 🎯 Future Enhancements

Potential features for future versions:
- Real WebRTC video calling
- Backend API integration
- Real-time notifications with WebSockets
- Advanced analytics dashboard
- Mobile app (React Native)
- AI-powered matching algorithm

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

**Built with ❤️ by Leeza Sarwar**

*Connecting investors and entrepreneurs, one feature at a time.*

</div>
"# -Frontend-Internship-Tasks-Nexus-Platform" 
