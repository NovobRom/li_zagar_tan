import type { Config } from 'tailwindcss';

export default {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                gold: '#FFD700',
            },
        },
    },
    plugins: [],
} satisfies Config;
