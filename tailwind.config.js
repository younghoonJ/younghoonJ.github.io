const colors = require("tailwindcss/colors")
const plugin = require("tailwindcss/plugin")

module.exports = {
  purge: {
    // enabled: true,
    content: [
      "./_includes/**/*.html",
      "./_layouts/**/*.html",
      "./_posts/**/*.md",
      "./*.html",
    ]
  },
  darkMode: false,
  theme: {
    extend: {
      colors: {
        fuchsia: colors.fuchsia,
        orange: colors.orange,
        teal: colors.emerald,
        rose: colors.rose,
        bluegray: "#141821",
        fafafa: "#fafafa"
      },
      fontFamily: {
        "noto": ["noto-sans"]
      },
      width: {
        "1/7": "14.2857143%",
        "2/7": "28.5714286%",
        "3/7": "42.8571429%",
        "4/7": "57.1428571%",
        "5/7": "71.4285714%",
        "6/7": "85.7142857%",
      }
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/typography"),
  ],
}