##Yang dilakukan agar projek bisa berhasil:

#untuk instalasi
npm install tailwindcss @tailwindcss/cli

#css yang digunakan adalah tailwindcss
@import "tailwindcss";

#untuk build tailwind cli
npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch

#untuk run di localhost agar bisa melihat projek saya
npm run dev
