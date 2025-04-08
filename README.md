# WhatTheTariff

A web application to explore and track U.S. tariffs imposed on different countries. Built with Next.js and Supabase.

## Features

- **Tariffs by Country**: Search and view tariffs for specific countries
- **Hot Tariffs**: View the highest tariff rates currently in effect
- **Recent Tariffs**: Track the most recently updated tariffs

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Hosting**: Vercel (planned)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Vicorico17/whatthetariff.git
   cd whatthetariff
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

```sql
CREATE TABLE tariffs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  country TEXT NOT NULL,
  tariff_name TEXT NOT NULL,
  tariff_rate NUMERIC NOT NULL,
  description TEXT,
  effective_date DATE NOT NULL,
  status TEXT CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT now()
);
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
