# Happy Smile Dental Clinic Website

Modern dental clinic website built with Next.js 14, TypeScript, Tailwind CSS, Shadcn UI, and Framer Motion.

## Project Overview

Professional dental clinic website featuring:
- Hero video section
- Google reviews carousel
- Services grid showcase
- Image gallery carousel
- Contact form with custom phone input
- Responsive footer

## Typography Standards

### Headings (H1, H2, H3)
```css
font-family: "Poiret One", Sans-serif;
font-size: 25px;
font-weight: 700;
text-transform: uppercase;
```

### Body Text / Descriptions
```css
font-family: "Red Hat Text", Sans-serif;
font-size: 16px;
font-weight: 300;
```

### Contact Section Specifics
- **Headers:** Poiret One, 25px, font-weight 700, uppercase, white color
- **Body text:** Manrope, 14px, font-weight 300, 20px line-height, white color

## Language Standards

### English Only Policy
- All website content must be in English
- UI text, placeholders, error messages, and content
- Form labels, buttons, navigation items
- Meta descriptions, alt texts, and accessibility labels

### Character Guidelines
- **Forbidden Characters:** ı, ş, ğ, ü, ö, ç, İ (Turkish characters)
- **Use Standard English Alphabet:** a-z, A-Z
- **Capital i Rule:** Use lowercase "i" instead of capital "İ"
- **Examples:**
  - ✅ Correct: "Istanbul", "clinic", "implant"
  - ❌ Wrong: "İstanbul", "klİnİk", "İmplant"

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/UI
- **Animations:** Framer Motion
- **Carousel:** Embla Carousel
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React

## Project Structure

```
src/
├── components/
│   ├── sections/
│   │   ├── hero-video.tsx
│   │   ├── google-reviews.tsx
│   │   ├── services-grid.tsx
│   │   ├── image-carousel.tsx
│   │   ├── contact-section.tsx
│   │   └── footer.tsx
│   ├── layout/
│   │   └── header.tsx
│   └── ui/ (Shadcn components)
├── app/
│   ├── globals.css
│   └── page.tsx
└── public/
    └── images/
        ├── carousel/ (390x490px images)
        ├── reviews/ (44x44px avatar images)
        └── flags/ (20x15px flag images)
```

## Key Features

### Custom Phone Input
- 4 predefined countries: UK, Malta, US, Turkey
- "Other" option with manual dial code entry
- Local flag images for reliability
- Exact country ordering as specified

### Responsive Design
- Mobile-first approach
- Tailwind CSS utilities
- Consistent spacing and typography
- Optimized for all device sizes

### Font Configuration
Google Fonts imported:
- **Poiret One** (headings)
- **Red Hat Text** (body text)
- **Manrope** (contact section)
- **Inter** (general UI, 100-900 weights)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Dependencies

### Core Dependencies
- `next`: ^14.x
- `react`: ^18.x
- `typescript`: ^5.x
- `tailwindcss`: ^3.x

### UI & Animation
- `@radix-ui/react-*`: Headless UI components
- `framer-motion`: Smooth animations
- `lucide-react`: Icon library
- `embla-carousel-react`: Carousel functionality
- `embla-carousel-autoplay`: Auto-scroll plugin

### Form Handling
- `react-hook-form`: Form state management
- `@hookform/resolvers`: Form validation
- `zod`: Schema validation

## Image Assets

### Required Images
- **Carousel images:** 390x490px (WebP format recommended)
- **Review avatars:** 44x44px (circular)
- **Flag images:** 20x15px (gb.png, mt.png, us.png, tr.png, other.png)
- **Service images:** 851x315 aspect ratio

### Directory Structure
```
public/images/
├── carousel/
│   ├── image1.webp (390x490px)
│   └── ...
├── reviews/
│   ├── avatar1.jpg (44x44px)
│   └── ...
└── flags/
    ├── gb.png (20x15px)
    ├── mt.png (20x15px)
    ├── us.png (20x15px)
    ├── tr.png (20x15px)
    └── other.png (20x15px)
```

## Contact Information

- **Phone:** +90 850 305 95 95, +44 7460 644222
- **Email:** hello@hsctr.com
- **Address:** Altunizade Mahallesi, Kısıklı Caddesi, Şarkuysan AK Plaza A Blok No:4 Kat:3, 34662 Üsküdar/Istanbul

## Design Principles

- **Clean & Professional:** Medical industry standards
- **Font Readability:** Prioritized over aesthetic choices
- **Consistent Branding:** Unified color scheme and typography
- **User Experience:** Smooth animations and intuitive navigation
- **Accessibility:** Proper ARIA labels and keyboard navigation
- **English Language Only:** All content, UI text, placeholders, and messages must be in English

## Development Guidelines

- Use functional components with TypeScript interfaces
- Follow mobile-first responsive design
- Implement proper error handling and validation
- Maintain consistent spacing with Tailwind utilities
- Use semantic HTML for better accessibility
- Optimize images and assets for web performance
- **English Language Standard:** All text content must be in English (no Turkish characters: ı, ş, ğ, ü, ö, ç, İ)
- **Character Rules:** Use standard English alphabet (no capital İ, use lowercase i instead)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
