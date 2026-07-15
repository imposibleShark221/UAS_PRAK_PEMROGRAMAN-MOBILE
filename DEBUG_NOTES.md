# Debug Notes - Koneksi Error di HomeScreen

## Masalah yang Ditemukan

Aplikasi menampilkan pesan "Koneksi Bermasalah" ("Tidak ada koneksi") ketika membuka halaman utama (HomeScreen).

## Penyebab Root Cause

1. **CORS Error** - Aplikasi dijalankan di web (Expo Web) dan `dummyjson.com` memblokir request dari browser karena CORS policy
2. **React DOM Error** - `NativeSafeAreaProvider` crash saat mencoba menghapus node
3. **Tidak Ada Error Logging** - Error ditangkap tapi tidak di-log ke console
4. **Tidak Ada Error Boundary** - Tidak ada error handling di level aplikasi
5. **Timeout Terlalu Pendek** - API timeout hanya 10 detik

## Perbaikan yang Dilakukan

### 1. `src/api/api.js` - Error Interceptors & CORS Proxy
- ✅ Tambah request interceptor untuk log setiap request
- ✅ Tambah response interceptor dengan 3 tipe error handling:
  - Response Error (4xx, 5xx)
  - No Response Error (Network/Timeout/CORS)
  - Setup Error
- ✅ Naikkan timeout dari 10s menjadi 15s
- ✅ Tambah CORS proxy support untuk web platform
- ✅ Semua error di-log dengan detail lengkap

### 2. `src/config/env.js` - Konfigurasi Environment
- ✅ Buat file konfigurasi terpusat untuk API settings
- ✅ Daftar multiple CORS proxy alternatives
- ✅ Platform-specific configuration (web, iOS, Android)

### 3. `src/components/ErrorBoundary.js` - Error Boundary Component
- ✅ Buat Error Boundary untuk catch JavaScript errors
- ✅ Prevent app crash dengan fallback UI
- ✅ Retry button untuk reload aplikasi
- ✅ Show error details di dev mode

### 4. `App.js` - Wrap dengan Error Boundary
- ✅ Tambahkan ErrorBoundary ke root component
- ✅ Error di child components tidak akan crash seluruh app

### 5. `src/screens/HomeScreen.js` - Error Logging
- ✅ Tambah console.error() di catch block
- ✅ Error terlihat di developer console dengan label `[HomeScreen]`

## Cara Debug

Buka React Native debugger / Expo logs dan lihat output console:

```
[API Request] GET /products?limit=100
[API Error] No response received: {
  message: "Error...",
  code: "ECONNABORTED",
  url: "https://dummyjson.com/products?limit=100"
}
[HomeScreen] Error loading products: ...
```

## Kemungkinan Penyebab "Tidak Ada Koneksi"

1. **Device/Emulator tidak punya internet** → Check network connection
2. **API Server Down** → Cek `https://dummyjson.com/products` di browser
3. **CORS Issue** (jika di web) → Server tidak mengizinkan akses dari origin ini
4. **Timeout** (sudah diperbaiki: 10s → 15s)
5. **DNS Issue** → Device tidak bisa resolve `dummyjson.com`

## Testing

Untuk memverifikasi perbaikan bekerja:

1. Run app: `npm start` (atau `expo start`)
2. Buka device/emulator
3. Lihat HomeScreen
4. Jika masih error, buka Expo logs dan lihat error details
5. Gunakan error details untuk debugging lebih lanjut

## Jika Masih Ada Error

Cek logs console untuk melihat exact error message, maka kita bisa:
- Menambah retry logic dengan exponential backoff
- Menambah offline mode
- Menambah fallback/cache dari previous successful requests