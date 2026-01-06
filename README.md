# HiWave Web

Landing page and website for [HiWave](https://github.com/petec4244/HiWave) - a privacy-first browser that gets out of your way.

## About HiWave

HiWave is **completely free and open source**. No subscriptions, no paid tiers, no premium features locked behind a paywall.

### Features (All Free)

| Feature | Description |
|---------|-------------|
| **Core Browsing** | Tabs, navigation, search - everything you expect |
| **The Shelf** | Tabs decay over time, stay findable, never lost |
| **Workspaces** | Context-based organization with page locking |
| **Flow Shield** | Built-in ad/tracker blocking (800,000+ domains blocked) |
| **Flow Vault** | Encrypted password storage |
| **Themes** | Light mode, dark mode, custom colors |
| **Reader Mode** | Distraction-free article reading |
| **Picture-in-Picture** | Floating video while you browse |
| **Auto-fill** | Passwords and forms, securely |
| **HiWave Sync** | Workspaces & vault across devices |

## Tech Stack

- [Next.js](https://nextjs.org/) 16
- [React](https://react.dev/) 19
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Supabase](https://supabase.com/) for backend
- [TypeScript](https://www.typescriptlang.org/)

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/petec4244/HiWave-web.git
   cd HiWave-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

See [LICENSE](LICENSE) for details.

---

*Built independently. No ads. No tracking. No corporate agenda.*
