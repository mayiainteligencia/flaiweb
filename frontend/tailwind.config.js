/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Mapeados a las variables del branding (theme.css)
        ink: 'var(--color-black)',
        accent: 'var(--color-red)',
        'sidebar-bg': 'var(--surface-sidebar)',
        'header-bg': 'var(--surface-header)',
        'content-bg': 'var(--surface-content)',
        card: 'var(--surface-card)',
        'border-subtle': 'var(--border-subtle)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'active-bg': 'var(--sidebar-active-bg)',
        'hover-bg': 'var(--sidebar-hover-bg)',
        'status-ok': 'var(--color-status-ok)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        heading: 'var(--font-heading)',
        body: 'var(--font-body)',
      },
    },
  },
  plugins: [],
};
