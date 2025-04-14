/** @type {import ('tailwindcss').Config} */

module.exports = {
    content: [
        "./pages/**/*.{js,jsx,ts,tsx}",
        "./ui_components/**/*.{js,jsx,ts,tsx}",
        "./hocs/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
            fontSize: {
                xs: ".75rem",
                sm: ".875rem",
                base: "1rem",
                md: "1.5rem",
                lg: "1.25rem",
                xl: "2rem",
                xxl: "2.5rem",
                xxxl: "3rem",
                "4xl": "4rem",
            },
            fontWeight: {
                light: 300,
                normal: 400,
                medium: 500,
                semibold: 600,
                bold: 700,
            },
            letterSpacing: {
                tight: "-0.01em",
            },
            spacing: {
                11: "2.75rem",
                13: "3.25rem",
                15: "3.75rem",
                21: "5.25rem",
                25: "6.25rem",
                30: "7.5rem",
                31: "7.75rem",
                35: "8.75rem",
                40: "10rem",
                50: "12.5rem",
                52.5: "13.125rem",
                70: "17.5rem",
                100: "25rem",
                105: "26.25rem",
                115: "28.75rem",
                120: "30rem",
                150: "37.5rem",
                160: "40rem",
                170: "42.5rem",
                200: "50rem",
            },
            lineHeight: {
                2: "1.25rem",
                2.2: "1.375rem",
                2.4: "1.5rem",
                3.2: "2rem",
                3.5: "0.875rem",
                4.5: "1.125rem",
                12: "3rem",
                12.5: "3.5rem",
                19.25: "4.813rem",
            },
            scale: {
                200: "2.00",
            },
            borderRadius: {
                large: "16px",
                medium: "14px",
                big: "50px",
                "2xl": "36px",
                xl: "32px",
                sm: "8px",
            },
        },
        
    },
    variants: {
        extend: {
            display: ["group-hover"],
        },
    },

    plugins: [],
    corePlugins: {
        backdropOpacity: false,
        backgroundOpacity: false,
        borderOpacity: false,
        divideOpacity: false,
        ringOpacity: false,
        textOpacity: false,
    },
    grayscale: {
        10: "10%",
    },
};
