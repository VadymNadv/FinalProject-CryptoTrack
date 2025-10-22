
import type { Config } from 'tailwindcss'

export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'background': 'var(--color-background)',
                'surface': 'var(--color-surface)',
                'surface-secondary': 'var(--color-surface-secondary)',
                'text': 'var(--color-text)',
                'text-secondary': 'var(--color-text-secondary)',
                'border': 'var(--color-border)',


                'primary-accent': 'var(--color-primary-accent)',
                'success-green': 'var(--color-success-green)',
                'danger-red': 'var(--color-danger-red)',


                'binance-dark': 'var(--color-binance-dark)',
                'surface-dark': 'var(--color-surface-dark-val)',
                'border-soft': 'var(--color-border-soft)',
                'text-light': 'var(--color-text-light)',
            }
        },
    },
    plugins: [],
} satisfies Config