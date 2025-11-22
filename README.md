# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Menjalankan di Arch Linux dengan Docker Compose

1. Instal Docker dan Compose plugin: `sudo pacman -Syu docker docker-compose`.
2. Aktifkan daemon Docker: `sudo systemctl enable --now docker`.
3. Opsional agar tidak perlu `sudo`: `sudo usermod -aG docker $USER`, lalu logout/login.
4. Dari direktori proyek, bangun dan jalankan container: `docker compose up --build` (atau `docker compose up -d` untuk background).
5. Setelah log Nginx muncul, akses aplikasi di `http://localhost/`.
6. Hentikan layanan dengan `Ctrl+C` atau `docker compose down` jika memakai mode `-d`.
