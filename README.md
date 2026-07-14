# KampusMarket

**Marketplace Mahasiswa Indonesia** -- Aplikasi mobile marketplace yang dibangun menggunakan React Native dan Expo, dirancang untuk kebutuhan jual-beli di lingkungan kampus.

---

## Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Fitur Utama](#fitur-utama)
- [Tech Stack](#tech-stack)
- [Arsitektur Proyek](#arsitektur-proyek)
- [Struktur Folder](#struktur-folder)
- [Prasyarat](#prasyarat)
- [Instalasi dan Menjalankan](#instalasi-dan-menjalankan)
- [Akun Demo](#akun-demo)
- [API yang Digunakan](#api-yang-digunakan)
- [Daftar Screen](#daftar-screen)
- [Komponen Reusable](#komponen-reusable)
- [Lisensi](#lisensi)

---

## Tentang Proyek

KampusMarket adalah aplikasi mobile marketplace yang ditujukan untuk mahasiswa Indonesia. Aplikasi ini memungkinkan pengguna untuk menelusuri katalog produk, mencari berdasarkan nama atau kategori, melihat detail lengkap produk, serta menyimpan produk favorit ke dalam wishlist. Aplikasi menggunakan DummyJSON sebagai backend API untuk keperluan demonstrasi.

Proyek ini dibuat sebagai tugas UAS Praktikum Pemrograman Mobile.

---

## Fitur Utama

- **Autentikasi Pengguna** -- Login dengan validasi form dan session persistence menggunakan AsyncStorage. Sesi pengguna dipertahankan meskipun aplikasi ditutup.
- **Registrasi Akun** -- Form pendaftaran lengkap dengan validasi nama, email, password, dan konfirmasi password.
- **Katalog Produk** -- Menampilkan daftar produk dari API dengan gambar, harga, rating bintang, dan badge diskon.
- **Pencarian dan Filter** -- Pencarian real-time berdasarkan nama produk, kategori, atau brand. Filter kategori menggunakan chip horizontal yang dapat di-scroll.
- **Detail Produk** -- Halaman detail lengkap dengan galeri gambar (thumbnail picker), informasi harga, stok, brand, deskripsi, dan rating.
- **Wishlist** -- Simpan dan kelola produk favorit. Data wishlist tersimpan secara lokal menggunakan AsyncStorage dan ditampilkan dengan badge counter pada tab navigasi.
- **Profil Pengguna** -- Menampilkan informasi akun, avatar inisial, statistik (wishlist, pesanan, ulasan), dan menu pengaturan.
- **Pull-to-Refresh** -- Tarik layar ke bawah pada halaman beranda untuk memuat ulang data produk.
- **Error Handling** -- Tampilan khusus untuk kondisi error jaringan dengan tombol retry, serta empty state untuk pencarian tanpa hasil.

---

## Tech Stack

| Teknologi | Versi | Keterangan |
|---|---|---|
| React Native | 0.86.0 | Framework utama |
| Expo | ~57.0.4 | Build toolchain dan development server |
| React | 19.2.3 | UI library |
| React Navigation | v7 | Navigasi (native stack + bottom tabs) |
| Axios | ^1.18.1 | HTTP client untuk komunikasi API |
| AsyncStorage | 2.2.0 | Penyimpanan lokal untuk sesi dan wishlist |
| Lucide React Native | ^1.24.0 | Ikon SVG |
| React Native Safe Area Context | ~5.7.0 | Penanganan safe area pada perangkat modern |
| React Native Screens | 4.25.2 | Optimasi layar native |

---

## Arsitektur Proyek

Aplikasi menggunakan arsitektur berbasis Context API untuk state management global. Berikut alur kerja utama:

```
App.js
  |
  +-- AuthProvider (Context)
        |
        +-- RootNavigator
              |
              +-- [Belum Login] --> AuthNavigator
              |                       |-- LoginScreen
              |                       |-- RegisterScreen
              |
              +-- [Sudah Login] --> MainTabNavigator
                                      |-- HomeStack
                                      |     |-- HomeScreen
                                      |     |-- DetailScreen
                                      |-- WishlistScreen
                                      |-- ProfileScreen
```

**Alur Autentikasi:**

1. Saat aplikasi dibuka, `AuthProvider` memeriksa token yang tersimpan di AsyncStorage.
2. Jika token ditemukan, pengguna langsung diarahkan ke `MainTabNavigator`.
3. Jika tidak ada token, pengguna diarahkan ke `AuthNavigator` (halaman login).
4. Setelah login berhasil, token dan data pengguna disimpan ke AsyncStorage dan state diperbarui, sehingga navigasi otomatis berpindah ke halaman utama.

---

## Struktur Folder

```
Mobile/
|-- App.js                          # Entry point, membungkus app dengan AuthProvider
|-- index.js                        # Registrasi root component untuk Expo
|-- app.json                        # Konfigurasi Expo
|-- package.json                    # Dependencies dan scripts
|-- assets/                         # Ikon, splash screen, favicon
|-- src/
    |-- api/
    |   |-- api.js                  # Instance Axios dengan base URL DummyJSON
    |-- components/
    |   |-- ButtonPrimary.js        # Tombol utama (solid/outline) dengan loading state
    |   |-- EmptyState.js           # Tampilan ketika daftar kosong
    |   |-- ErrorState.js           # Tampilan error jaringan dengan retry
    |   |-- InputField.js           # Input form dengan label, error, dan toggle password
    |   |-- Loading.js              # Loading spinner full-screen atau overlay
    |   |-- ProductCard.js          # Kartu produk dengan gambar, rating, dan wishlist
    |-- context/
    |   |-- AuthContext.js          # Context untuk auth state, token, dan wishlist
    |-- navigation/
    |   |-- AuthNavigator.js        # Stack navigator untuk login dan register
    |   |-- MainTabNavigator.js     # Bottom tab navigator (Beranda, Wishlist, Profil)
    |   |-- RootNavigator.js        # Root navigator, switch antara auth dan main
    |-- screens/
    |   |-- DetailScreen.js         # Halaman detail produk
    |   |-- HomeScreen.js           # Halaman beranda dengan daftar produk
    |   |-- LoginScreen.js          # Halaman login
    |   |-- ProfileScreen.js        # Halaman profil pengguna
    |   |-- RegisterScreen.js       # Halaman registrasi
    |   |-- WishlistScreen.js       # Halaman daftar wishlist
    |-- services/
    |   |-- auth.js                 # Service untuk login API call
    |   |-- product.js              # Service untuk fetch produk
    |-- utils/
        |-- validation.js           # Fungsi validasi form (email, password, nama)
```

---

## Prasyarat

Pastikan perangkat pengembangan sudah memiliki:

- **Node.js** versi 18 atau lebih baru
- **npm** atau **yarn**
- **Expo CLI** (opsional, sudah termasuk dalam `npx`)
- **Expo Go** terinstal di perangkat fisik (Android/iOS), atau emulator/simulator

---

## Instalasi dan Menjalankan

1. **Clone repository:**

   ```bash
   git clone https://github.com/imposibleShark221/UAS_PRAK_PEMROGRAMAN-MOBILE.git
   cd UAS_PRAK_PEMROGRAMAN-MOBILE
   ```

2. **Instal dependencies:**

   ```bash
   npm install
   ```

3. **Jalankan development server:**

   ```bash
   npm start
   ```

4. **Buka di perangkat:**

   - Scan QR code yang muncul di terminal menggunakan aplikasi Expo Go.
   - Atau tekan `a` untuk membuka di emulator Android, `i` untuk simulator iOS, `w` untuk browser.

**Script tersedia:**

| Perintah | Keterangan |
|---|---|
| `npm start` | Menjalankan Expo development server |
| `npm run android` | Langsung buka di emulator Android |
| `npm run ios` | Langsung buka di simulator iOS |
| `npm run web` | Buka versi web di browser |

---

## Akun Demo

Aplikasi menggunakan DummyJSON sebagai backend, sehingga login dilakukan dengan akun demo yang tersedia:

| Username | Password |
|---|---|
| `emilys` | `emilyspass` |

Catatan: Pada form login, pengguna dapat memasukkan email (contoh: `emilys@email.com`) atau langsung username. Aplikasi secara otomatis mengekstrak bagian sebelum `@` jika input berupa email.

---

## API yang Digunakan

Seluruh data produk dan autentikasi menggunakan [DummyJSON](https://dummyjson.com):

| Endpoint | Method | Keterangan |
|---|---|---|
| `/auth/login` | POST | Autentikasi pengguna, mengembalikan token dan data user |
| `/products?limit=100` | GET | Mengambil daftar produk (maksimal 100 item) |

Base URL: `https://dummyjson.com`

Timeout: 10 detik

---

## Daftar Screen

### LoginScreen

Halaman login dengan form email/username dan password. Terdapat validasi input, hint akun demo, dan tautan ke halaman registrasi.

### RegisterScreen

Form pendaftaran dengan field nama lengkap, email, password, dan konfirmasi password. Validasi dilakukan secara real-time saat pengguna mengetik.

### HomeScreen

Halaman utama yang menampilkan katalog produk dalam bentuk kartu. Dilengkapi search bar, filter kategori horizontal, pull-to-refresh, dan penanganan empty state.

### DetailScreen

Menampilkan informasi lengkap satu produk: galeri gambar dengan thumbnail picker, nama, brand, kategori, rating bintang, harga dengan badge diskon, status stok, deskripsi, dan tombol simpan ke wishlist di bagian bawah layar.

### WishlistScreen

Daftar produk yang telah disimpan pengguna. Setiap item menampilkan gambar, nama, harga, dan tombol hapus. Navigasi ke detail produk tersedia dari setiap item.

### ProfileScreen

Menampilkan avatar inisial, nama lengkap, email, username, statistik akun, menu pengaturan, informasi versi aplikasi, dan tombol logout dengan konfirmasi dialog.

---

## Komponen Reusable

| Komponen | Fungsi |
|---|---|
| `ButtonPrimary` | Tombol aksi utama dengan dua varian (solid dan outline), mendukung loading state |
| `InputField` | Input form dengan label, pesan error, dan toggle visibilitas password |
| `ProductCard` | Kartu produk dengan gambar, badge diskon, rating bintang, dan tombol wishlist |
| `Loading` | Spinner loading full-screen atau overlay transparan |
| `EmptyState` | Tampilan ketika data kosong dengan ikon, judul, dan subjudul |
| `ErrorState` | Tampilan error dengan ikon, pesan, dan tombol retry |

---

## Lisensi

Proyek ini menggunakan lisensi MIT. Lihat file [LICENSE](LICENSE) untuk detail lengkap.
