/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'slide-up': {
                    '0%': { transform: 'translateY(50px)', opacity: '0' }, // 더 잘 보이는 효과
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
            animation: {
                'fade-in': 'fade-in 0.5s ease-out forwards',
                'slide-up': 'slide-up 0.5s ease-out forwards',
            },
        },
        container: {
            center: true,
        }
    },
    plugins: [], // plugins 속성 추가
}
