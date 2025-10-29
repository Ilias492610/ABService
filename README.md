# Mubarak Muse - Personal Website

Personal website built with Next.js and ShipFast boilerplate.

## Features

- 🚀 Next.js 14 with App Router
- 🎨 Tailwind CSS & DaisyUI
- 🔐 Optional Supabase Authentication
- 💳 Stripe Integration (optional)
- 📧 Email functionality with Mailgun
- 🤖 OpenAI integration
- 📱 Responsive design

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mubarakMuse/mubarakmuse.git
cd mubarakmuse
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
# Supabase (optional)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe (optional)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Mailgun (optional)
MAILGUN_API_KEY=your_mailgun_api_key

# OpenAI (optional)
OPENAI_API_KEY=your_openai_api_key

# Site URL
SITE_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

Edit `config.js` to customize:
- App name and description
- Domain name
- Stripe pricing plans
- Mailgun settings
- Theme colors

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mubarakMuse/mubarakmuse)

## License

MIT
