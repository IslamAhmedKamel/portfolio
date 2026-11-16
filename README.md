# Islam Ahmed Kamel Aboud: Portfolio

A responsive Junior Data Analyst portfolio built with only HTML5, CSS3 and vanilla JavaScript (ES6). No frameworks, no build step: open `index.html` in a browser.

## Structure

```
Portfolio/
├── index.html
├── css/style.css
├── js/script.js
├── assets/
│   ├── resume/Islam_Ahmed_Kamel_Data_Analyst_CV_EN.pdf
│   └── icons/
└── README.md
```

## Content source

All text comes from the CV: summary, skills, the Sales Dashboard project, the Tourism Application graduation project, education, professional development, languages and contact details.

## Before publishing

- Replace `your-domain.com` in the `canonical`, Open Graph and Twitter tags with the real address.
- Add a social preview image at `assets/og-image.png` (1200x630).
- If you rename the CV file, update the Download CV link in the hero.
- The Tourism Application card has no GitHub button because the CV gives no link. Copy the button from the Sales Dashboard card and change the URL if you have one.

## Features

- Dark mode by default, light toggle, preference saved in `localStorage`
- Sticky navbar with blur on scroll, active link highlight, mobile menu
- Loader, scroll progress bar, back-to-top button
- Typing effect, fade-up hero, scroll reveal (Intersection Observer)
- Floating gradient shapes, glassmorphism cards, glowing buttons, hover effects
- Semantic HTML, ARIA labels, skip link, keyboard focus styles, reduced-motion support
- SEO: description, keywords, Open Graph, Twitter Cards, canonical, favicon
- Responsive from mobile to 4K

## Customize

- **Colors:** change the variables at the top of `css/style.css`.
- **Typing roles:** edit the `roles` array in `initTyping()` in `js/script.js`.
- **Add a project:** copy a `<article class="card glass project reveal">` block inside the Projects grid.
- **Add a skill group:** copy a card in the Skills grid and edit its tags.
