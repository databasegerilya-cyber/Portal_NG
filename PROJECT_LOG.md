# Project Memory Log — Portal NG

> Log keputusan arsitektur, fitur, dan riwayat perubahan penting lintas sesi.

---

## 2026-08-14

### 1. No-Scroll Viewport Layout & Mobile App Launcher Grid
- **Latar Belakang**: Dashboard memerlukan tampilan yang pas 1 layar (100dvh) tanpa vertical scrollbar baik di desktop maupun mobile. Pada mobile (HP), tampilan diubah menyerupai menu launcher aplikasi / app drawer smartphone (icon squircle modern + nama aplikasi yang rapi & compact).
- **Perubahan**:
  - `src/app/dashboard/page.module.css`: Layout flex `100dvh` dengan `overflow: hidden`, padding adaptif, dan responsif breakpoint.
  - `src/components/AppCard.module.css`: Tampilan desktop card dengan elevasi hover, beralih ke mobile launcher app menu tile (icon squircle 48x48, active scale tap feedback, 3-column grid).
  - `src/components/Navbar.module.css`: Height 56px (50px di mobile) dengan layout ringkas.

### 2. Fitur Entertainment: Pixel Cat (Kucing Pixel Interaktif)
- **Komponen**: `src/components/PixelCat.tsx` & `src/components/PixelCat.module.css`
- **Fitur**:
  - Animasi sprite SVG pixel art (Walk 4-frame cycle, Sit with wagging tail, Sleep with floating Zzz, Jump happy state).
  - Autonomous behavior cycle (jalan bolak-balik kiri-kanan di atas footer, duduk, tidur, meong).
  - Interaksi klik/tap: Kucing melompat gembira, memunculkan hati melayang (❤️), bubble meow interaktif, dan efek suara chiptune 8-bit retro sintetis (Web Audio API tanpa dependency file audio eksternal).
  - Terintegrasi di atas footer pada dashboard utama.

### 3. Default Tema Putih (Light Mode) untuk Pengguna Baru
- **Keputusan**: Seluruh pengguna baru yang pertama kali membuka portal akan otomatis mendapatkan tema Putih (*Light Mode*), mengabaikan setting preferensi OS dark mode (*prefers-color-scheme*).
- **Implementasi**: Penyesuaian skrip inisialisasi di `src/app/layout.tsx` dan fallback state di `src/components/ThemeToggle.tsx`. Hanya jika user secara manual menekan tombol tema gelap maka setting dark mode akan disimpan di `localStorage.setItem('portal_theme', 'dark')`.

### 4. Penanganan Hydration Warning dari Ekstensi Browser
- **Isu**: Ekstensi browser (seperti Bitdefender Anti-track) menginjeksi atribut `bis_skin_checked="1"` ke DOM sebelum hidrasi React selesai.
- **Solusi**: Menambahkan `suppressHydrationWarning` pada tag `<body suppressHydrationWarning>` di `src/app/layout.tsx`.
