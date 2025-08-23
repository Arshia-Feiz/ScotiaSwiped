# ScotiaSwipe 🏦💳

A Tinder-style subscription management app for Scotia Bank customers. Swipe right to keep subscriptions, left to cancel them!

## Features

- **Scotia Banking Homepage**: Authentic Scotia Bank mobile app interface
- **ScotiaSwipe**: Tinder-style subscription management
- **Subscription Tracking**: Keep track of your monthly subscriptions
- **Fraud Detection**: Identify unknown subscriptions
- **Scene+ Integration**: Highlight Scotia Bank partner subscriptions
- **Monthly Savings Calculator**: See how much you save by canceling subscriptions

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Swipe Animation**: react-tinder-card

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ScotiaSwiped
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel
   ```

   Or simply connect your GitHub repository to Vercel for automatic deployments.

3. **Environment Variables** (if needed)
   - No environment variables required for this demo

### Alternative Deployment Options

- **Netlify**: Connect your repository to Netlify
- **Railway**: Deploy directly from GitHub
- **AWS Amplify**: Use AWS Amplify for hosting

## App Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Main app component
│   └── globals.css        # Global styles
├── components/
│   └── ui/                # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       └── badge.tsx
```

## How It Works

1. **Homepage**: Users see the Scotia Bank mobile app interface
2. **ScotiaSwipe**: Click "Start Swiping" to begin subscription management
3. **Swipe Interface**: 
   - Swipe right (❤️) to keep a subscription
   - Swipe left (✕) to cancel a subscription
   - Use the undo button (↻) to go back
4. **Results**: View your decisions and potential monthly savings

## Mock Data

The app includes mock subscription data for demonstration:
- Netflix, Spotify Premium, Disney+
- Sobeys Delivery (Scene+ Partner)
- Home Hardware Plus (Scene+ Partner)
- MysteryApp Pro (potential fraud)

## Customization

### Adding Real Subscriptions

Edit the `mockSubscriptions` array in `src/app/page.tsx`:

```typescript
const mockSubscriptions = [
  {
    id: 1,
    name: "Your Subscription",
    cost: 9.99,
    description: "Description here",
    isKnownPartner: false, // true for Scene+ partners
    logo: "/your-logo.png",
  },
  // ... more subscriptions
]
```

### Styling

The app uses Tailwind CSS with a custom color scheme matching Scotia Bank's branding:
- Primary: Red (#DC2626)
- Background: Dark gray (#111827)
- Text: White and gray variations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is for demonstration purposes as part of ScotiaHacks.

## Support

For questions or issues, please open an issue on GitHub.

---

Built with ❤️ for ScotiaHacks
