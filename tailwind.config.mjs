/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        // Custom color scheme
        text: '#f2f0f5',
        background: '#0b0a0f',
        primary: '#bcb3cc',
        secondary: '#5f3f54',
        accent: '#aa7d8c',
        // Keep shadcn components working
        card: {
          DEFAULT: '#0b0a0f',
          foreground: '#f2f0f5'
        },
        popover: {
          DEFAULT: '#0b0a0f',
          foreground: '#f2f0f5'
        },
        muted: {
          DEFAULT: '#5f3f54',
          foreground: '#f2f0f5'
        },
        destructive: {
          DEFAULT: '#aa7d8c',
          foreground: '#f2f0f5'
        },
        border: '#5f3f54',
        input: '#5f3f54',
        ring: '#aa7d8c',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))'
        }
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
