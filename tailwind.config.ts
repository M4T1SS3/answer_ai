import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'active': '#AC92F7',
        'off-black' : '#121212',
        'gray-1': '#AAAAAA',
        'primary': '#7F53FF',
      }
    },
  },
  plugins: [],
}
export default config
