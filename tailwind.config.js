/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "inter-regular": "Inter_400Regular",
        "inter-medium": "Inter_500Medium",
        "inter-semibold": "Inter_600SemiBold",
        "inter-bold": "Inter_700Bold",
      },
    },
  },
  plugins: [],
};
