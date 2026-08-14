# Design System & Style Guide — Portal NG

> **Dokumen Resmi Panduan Desain & Antarmuka (UI/UX)**  
> Versi: `1.0.0` | Terakhir Diperbarui: 2026-08-14  
> Platform: **Next.js (App Router) + CSS Modules + Vanilla CSS Tokens**

---

## 1. Filosofi & Karakter Visual

Portal NG dirancang sebagai **Enterprise Application Launcher & Internal Portal** dengan standar estetika modern, minimalis, dan fungsional (terinspirasi dari antarmuka Apple & Vercel).

### Pilar Desain Utama:
1. **Clean & High Contrast**: Hierarki informasi tegas, warna netral monokromatik dengan keterbacaan tinggi.
2. **Dual-Theme First-Class**: Dukungan penuh mode Terang (*Light*) dan Gelap (*Dark*) tanpa *flash of unstyled content* (FOUC).
3. **Glassmorphism & Depth**: Penggunaan `backdrop-filter: blur()`, border semi-transparan, dan bayangan (*box-shadow*) halus multi-layer untuk kedalaman visual.
4. **Micro-Interactions**: Transisi halus (0.2s ease), *hover lift* pada kartu, animasi ambien lembut, dan umpan balik interaktif pada tombol/input.
5. **Aksesibilitas & Responsif**: Fokus keyboard terlihat jelas, kontras warna memenuhi standar WCAG AA, dan layout adaptif untuk mobile hingga desktop.

---

## 2. Design Tokens (Variabel CSS Global)

Semua token didefinisikan di [`src/app/globals.css`](file:///d:/Kerjaan/portal%20NG/src/app/globals.css) dan diakses menggunakan `var(--nama-token)`.

### 2.1 Palet Warna (Color Palette)

| Token CSS | Light Mode (`:root`) | Dark Mode (`[data-theme="dark"]`) | Deskripsi Penggunaan |
| :--- | :--- | :--- | :--- |
| `--color-bg` | `#FFFFFF` | `#0C0C0E` | Background halaman utama / canvas |
| `--color-surface` | `#F8F8F8` | `#17171C` | Background sekunder / badge icon / container elemen kecil |
| `--color-card-bg` | `#FFFFFF` | `#141418` | Background kartu aplikasi & input form |
| `--color-border` | `#E5E5E5` | `#26262E` | Border default komponen, divider, dan input |
| `--color-border-hover` | `#D4D4D4` | `#3B3B47` | Border state saat di-hover / aktif |
| `--color-text-primary` | `#111111` | `#F4F4F6` | Heading (H1, H2, H3) & teks utama |
| `--color-text-secondary` | `#6B6B6B` | `#9E9EA9` | Subtitle, deskripsi, dan label form |
| `--color-text-muted` | `#ABABAB` | `#62626E` | Placeholder, teks footer, dan info pasif |
| `--color-btn` | `#111111` | `#F4F4F6` | Background tombol CTA utama & badge logo |
| `--color-btn-text` | `#FFFFFF` | `#0C0C0E` | Teks tombol CTA utama & teks badge logo |
| `--color-btn-hover` | `#333333` | `#E4E4E7` | Background tombol CTA saat di-hover |
| `--color-nav-bg` | `rgba(255, 255, 255, 0.85)` | `rgba(12, 12, 14, 0.85)` | Navbar sticky dengan efek blur |
| `--color-glass-bg` | `rgba(255, 255, 255, 0.85)` | `rgba(20, 20, 24, 0.85)` | Modal / kartu login glassmorphism |
| `--color-glass-border` | `rgba(229, 229, 229, 0.8)` | `rgba(38, 38, 46, 0.8)` | Border luar komponen glassmorphism |
| `--color-blob-1` | `#EBEBEB` | `#1B1B26` | Warna gradien blob ambien pertama |
| `--color-blob-2` | `#F5F5F5` | `#141824` | Warna gradien blob ambien kedua |

#### Warna Status & Feedback:
- **Error / Danger**:
  - Teks/Ikon: `#EF4444` (Red-500)
  - Background: `rgba(229, 62, 62, 0.1)`
  - Border: `rgba(229, 62, 62, 0.25)`
- **Focus Ring**:
  - `box-shadow: 0 0 0 3px rgba(120, 120, 120, 0.15)`

---

### 2.2 Tipografi (Typography)

* **Font Family Utama**: `Inter` via Next.js Font Optimization (`--font-inter`, sans-serif).

```css
font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

#### Skala Teks & Hirarki:

| Peran Tipografi | Ukuran (`rem` / `px`) | Weight | Line Height | Letter Spacing | Contoh Penggunaan |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display / Hero H1** | `1.875rem` (30px) | `700` (Bold) | `1.2` | `-0.03em` | "Selamat datang" di Dashboard |
| **Page Title / Modal H1**| `1.5rem` (24px) | `700` (Bold) | `1.25` | `-0.03em` | Judul "Portal NG" di Halaman Login |
| **Section Title / Brand** | `1.0625rem` (17px) | `700` (Bold) | `1.3` | `-0.02em` | Logo Text Navbar |
| **Card Title (H3)** | `1.0rem` (16px) | `600` (SemiBold) | `1.35` | `-0.01em` | Nama Aplikasi di AppCard |
| **Body / Input Text** | `0.9375rem` (15px) | `400` / `500` | `1.5` | Normal | Input text, tombol submit |
| **Body Small / Subtitle** | `0.875rem` (14px) | `400` / `500` | `1.45` | Normal | Subtitle halaman, nama user |
| **Description** | `0.84375rem` (13.5px) | `400` (Regular) | `1.45` | Normal | Deskripsi modul di AppCard |
| **Label / Action Small** | `0.8125rem` (13px) | `500` (Medium) | `1.4` | `0.01em` | Label form input, tombol logout |
| **Caption / Footer** | `0.75rem` - `0.8125rem` | `400` (Regular) | `1.4` | Normal | Teks hak cipta footer, petunjuk form |

---

### 2.3 Radius Sudut (Border Radius)

| Token CSS | Nilai | Penggunaan |
| :--- | :--- | :--- |
| `--radius-sm` | `8px` | Tombol CTA, input form, icon wrapper kecil, logout button, error banner |
| `--radius-md` | `12px` | Kartu aplikasi (`AppCard`), logo badge di halaman login |
| `--radius-lg` | `16px` | Container modal login (`glass-card`) |
| `Pill / Circle` | `50%` | Avatar pengguna, loading spinner |

---

### 2.4 Elevasi & Bayangan (Shadows)

| Token CSS | Light Mode | Dark Mode | Penggunaan |
| :--- | :--- | :--- | :--- |
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.04)` | `0 1px 3px rgba(0,0,0,0.3)` | Kartu dalam kondisi diam (*idle*) |
| `--shadow-md` | `0 4px 16px rgba(0,0,0,0.05)` | `0 4px 16px rgba(0,0,0,0.4)` | Kartu modal glassmorphism, tombol saat hover |
| `--shadow-hover`| `0 10px 25px -5px rgba(0,0,0,0.08)` | `0 10px 25px -5px rgba(0,0,0,0.6)` | Kartu aplikasi saat kursor hover |

---

### 2.5 Animasi & Transisi (Motion & Transition)

- **Transisi Standar Elemen Interaktif**:
  ```css
  --transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  ```

- **Micro-Interactions**:
  - **AppCard Hover**: Mengangkat kartu ke atas sebesar `translateY(-2px)` dan memindahkan ikon panah luar ke `translate(2px, -2px)`.
  - **Tombol CTA Hover/Active**:
    - Hover: `transform: translateY(-1px)` + `box-shadow: var(--shadow-md)`
    - Active (Klik): `transform: translateY(0)`
  - **Ambient Blobs**: Animasi mengapung (*floating animation*) durasi 18s `ease-in-out infinite alternate`.
  - **Spinner Loading**: Rotasi memutar durasi 0.6s `linear infinite`.

---

## 3. Sistem Layout & Grid

### 3.1 Container Layout
- **Max Width Konten**: `1120px` (terpusat dengan `margin: 0 auto;`).
- **Padding Horizontal**: `1.5rem` (24px) di desktop, `1rem` (16px) di layar kecil.
- **Padding Vertikal Konten**: `3rem 1.5rem 5rem` di desktop.

### 3.2 Grid Aplikasi Dashboard

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem; /* 20px */
}

/* Tablet (Breakpoint <= 900px) */
@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile (Breakpoint <= 600px) */
@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
```

---

## 4. Standar Komponen (Component Specs)

### 4.1 Navbar ([`Navbar.tsx`](file:///d:/Kerjaan/portal%20NG/src/components/Navbar.tsx))
- **Tinggi**: `64px`
- **Posisi**: `sticky; top: 0; z-index: 100;`
- **Background**: `var(--color-nav-bg)` dengan `backdrop-filter: blur(12px)`.
- **Elemen Penyusun**:
  1. Brand Logo Badge: Kotak `32px x 32px`, `--radius-sm`, background `--color-btn`, ikon `Database` (`16px`).
  2. Judul Brand: Teks `Portal NG` (`1.0625rem`, bold).
  3. User Section: Avatar lingkaran `32px` dengan inisial nama, label nama pengguna.
  4. Theme Toggle Button (`ThemeToggle`).
  5. Tombol Logout: Tipe *ghost/outline* dengan border halus dan ikon `LogOut` (`14px`).

---

### 4.2 Theme Toggle ([`ThemeToggle.tsx`](file:///d:/Kerjaan/portal%20NG/src/components/ThemeToggle.tsx))
- **Dimensi**: `36px x 36px`
- **Radius**: `var(--radius-sm)` (8px)
- **Ikon**: Lucide `Sun` (saat dark mode) / `Moon` (saat light mode), ukuran `16px`, stroke `1.75`.
- **Anti-FOUC Architecture**: Script inline di `<head>` pada [`layout.tsx`](file:///d:/Kerjaan/portal%20NG/src/app/layout.tsx) membaca `localStorage.getItem('portal_theme')` atau `prefers-color-scheme` sebelum DOM selesai di-render.

---

### 4.3 App Card ([`AppCard.tsx`](file:///d:/Kerjaan/portal%20NG/src/components/AppCard.tsx))
- **Min Height**: `160px`
- **Padding**: `1.5rem` (24px)
- **Radius**: `var(--radius-md)` (12px)
- **Struktur**:
  ```
  +---------------------------------------+
  | [Icon Wrapper 44px]     [ExternalIcon]|
  |                                       |
  | Title Aplikasi (1rem, semibold)       |
  | Deskripsi ringkas (0.84375rem, muted) |
  +---------------------------------------+
  ```
- **Interaksi Icon Wrapper**: Saat kartu di-hover, icon wrapper bertransformasi menjadi background `--color-btn` dengan warna ikon `--color-btn-text`.

---

### 4.4 Form & Input Fields ([`LoginForm.tsx`](file:///d:/Kerjaan/portal%20NG/src/components/LoginForm.tsx))
- **Input Field**:
  - Tinggi/Padding: `0.75rem 1rem` (dengan padding kiri `2.625rem` jika menggunakan icon prefix).
  - Background: `var(--color-card-bg)`.
  - Border: `1px solid var(--color-border)`.
  - Focus State: Border berubah menjadi `var(--color-text-primary)` dengan cincin aksen halus `box-shadow: 0 0 0 3px rgba(120, 120, 120, 0.15)`.
- **Tombol Submit (Primary CTA)**:
  - Padding: `0.875rem 1rem`.
  - Background: `var(--color-btn)`.
  - Teks: `var(--color-btn-text)`, font-weight `500`.
  - Disabled / Loading State: Opacity `0.7`, cursor `not-allowed`, disertai spinner animasi.
- **Error Banner**:
  - Warna merah lembut dengan background transparan, border tipis, dan ikon peringatan `AlertCircle` (`16px`).

---

### 4.5 Ambient Background Blobs ([`globals.css`](file:///d:/Kerjaan/portal%20NG/src/app/globals.css))
- Digunakan untuk memberikan aksen gradien organik yang mewah pada halaman seperti login.
- Menggunakan `filter: blur(80px)`, `opacity: 0.45`, dan `pointer-events: none` agar tidak mengganggu interaksi form.

---

## 5. Iconography (Standar Ikon)

* **Library Ikon**: `lucide-react`
* **Standar Stroke Width**:
  - `1.75` untuk seluruh ikon konten, form, navigasi, dan tombol aksi.
  - `2.0` khusus untuk ikon logo / identitas brand.
* **Standar Ukuran Ikon**:
  - `14px` : Ikon pendamping teks kecil (misal: tombol keluar/logout).
  - `16px` : Ikon input form (User, Lock), tombol tema, error banner.
  - `18px` - `20px` : Ikon external link, hero spark icon.
  - `22px` : Ikon utama aplikasi launcher pada AppCard & Logo Login.

---

## 6. Checklist Implementasi Komponen Baru

Ketika membuat fitur atau komponen baru di Portal NG, pastikan mematuhi aturan berikut:

1. [ ] **Gunakan CSS Variables**: Jangan pernah hardcode nilai warna heksadesimal (`#fff`, `#000`, dll) di dalam file CSS baru, selalu rujuk variabel `--color-*`.
2. [ ] **Gunakan CSS Modules**: Buat file `NamaKomponen.module.css` untuk isolasi scope style.
3. [ ] **Dukung Dua Tema**: Uji tampilan pada Mode Terang dan Mode Gelap.
4. [ ] **Status Interaktif Lengkap**: Tentukan style untuk kondisi *default*, *hover*, *active*, *focus-visible*, dan *disabled*.
5. [ ] **Transisi Konsisten**: Terapkan `transition: var(--transition);` pada elemen interaktif.
6. [ ] **Hierarki Tipografi**: Gunakan ukuran dan bobot teks yang telah ditentukan pada tabel tipografi (hindari membuat ukuran font arbitrer baru).
7. [ ] **Aksesibilitas**: Berikan atribut `aria-label` pada tombol yang hanya berisi ikon dan pastikan rasio kontras teks tetap tinggi.
