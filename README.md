# Wedding Hall & Event Platform

<div align="center">

  <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
  <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
  <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  <img src="https://img.shields.io/badge/-Supabase-black?style=for-the-badge&logoColor=white&logo=supabase&color=3ECF8E" alt="supabase" />

  <br />
  <br />

  <p align="center">
    A modern, responsive web application designed for wedding halls and event venues. <br />
    Built with <strong>Next.js (App Router)</strong>, <strong>TypeScript</strong>, and <strong>Tailwind CSS</strong>, this platform allows guests to view event details, upload photos from the event, and explore venue services with a performance- and SEO-focused architecture.
  </p>

</div>

---

## 🚀 Features

- **📱 Responsive Design:** Fully responsive layout optimized for mobile and desktop views using Tailwind CSS.
- **📅 Event Management:** Dynamic event listing and detailed views for weddings and ceremonies.
- **📸 Photo Sharing:** Secure guest-facing image uploads powered by Supabase Storage with file type & size validation and rate limiting.
- **✨ Smooth Navigation:** Integrated smooth scrolling (Lenis) for a seamless user experience.
- **💬 Testimonials:** Section to showcase customer reviews and feedback.
- **🛡️ Rate Limiting:** Built-in protection for API routes.
- **🔍 SEO & Performance:** SEO-friendly metadata, optimized images, and performance-focused architecture.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Backend & Storage:** [Supabase](https://supabase.com/)
- **Animations:** [GSAP](https://gsap.com/) & [Lenis](https://lenis.darkroom.engineering/)
- **Linting:** ESLint

## 🤸 Quick Start

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/omerbakr/wedding-hall.git
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

### Set Up Environment Variables

Create a new file named `.env.local` in the root of your project and add the following content.

<br />

```ini
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="your_supabase_project_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"

# Rate Limiting (Vercel KV / Upstash Redis)
KV_REST_API_READ_ONLY_TOKEN="your_vercel_kv_read_only_token"
KV_REST_API_TOKEN="your_vercel_kv_rest_api_token"
KV_REST_API_URL="your_vercel_kv_rest_api_url"
KV_URL="your_vercel_kv_url"
REDIS_URL="your_connection_string_usually_redis://..."
```

Running the Project

```bash
npm run dev
```

## 📋 License

This project is shared for learning and portfolio purposes.
You’re welcome to explore and get inspired, but please don’t reuse the code for production or commercial projects without permission.
