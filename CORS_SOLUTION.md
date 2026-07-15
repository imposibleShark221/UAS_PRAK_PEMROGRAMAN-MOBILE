# Solusi CORS Error - Koneksi di Web Platform

## Masalah CORS

Ketika aplikasi dijalankan di web (Expo Web / `npm start -- --web`), browser akan memblokir request ke `dummyjson.com` karena **CORS (Cross-Origin Resource Sharing)** policy.

Error yang muncul:
```
ERR_NETWORK: Network Error
[API Error] No response received: { code: "ERR_NETWORK", message: "Network Error" }
```

## Solusi 1: Gunakan CORS Proxy (Recommended untuk Development)

### Opsi A: cors-anywhere.herokuapp.com (Default)

1. Buka https://cors-anywhere.herokuapp.com/corsdemo
2. Klik tombol "Request temporary access to the demo server"
3. Tunggu approval (instant atau beberapa saat)
4. Aplikasi akan otomatis menggunakan proxy ini untuk web platform

**Keuntungan:**
- Mudah disetup
- Gratis
- Sudah dikonfigurasi di `src/config/env.js`

**Kerugian:**
- Memerlukan aktivasi manual
- Limited request quota
- Tidak untuk production

### Opsi B: Alternatif CORS Proxy

Tersedia di `src/config/env.js` di dalam `CORS_PROXIES` array:

```javascript
CORS_PROXIES: [
  'https://cors-anywhere.herokuapp.com/',           // Default
  'https://thingproxy.freeboard.io/fetch/',        // Alternative 1
  'https://api.allorigins.win/raw?url=',           // Alternative 2
]
```

Untuk menggunakan proxy lain, edit `CORS_PROXY_DEFAULT` di `src/config/env.js`:

```javascript
CORS_PROXY_DEFAULT: 'https://thingproxy.freeboard.io/fetch/',
```

## Solusi 2: Setup Backend Proxy (Recommended untuk Production)

Buat backend endpoint yang proxy-kan request ke dummyjson.com:

```javascript
// Contoh: Backend Node.js dengan Express
app.get('/api/proxy/:path*', async (req, res) => {
  try {
    const response = await fetch(`https://dummyjson.com${req.params.path}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

Kemudian update `src/config/env.js`:

```javascript
BASE_URL: process.env.NODE_ENV === 'production' 
  ? 'https://your-api.com/api/proxy'
  : 'https://dummyjson.com'
```

## Solusi 3: Gunakan Backend di Development

Jalankan backend server lokal yang handle CORS, kemudian point API ke backend tersebut.

## Solusi 4: Disable CORS Check (Development Only - NOT RECOMMENDED)

Hanya untuk testing lokal dengan browser tertentu:

```bash
# Chrome dengan CORS disabled (NOT for production)
chrome --disable-web-security --disable-gpu
```

⚠️ **JANGAN gunakan untuk production!**

## Konfigurasi di Kode

### Untuk Web Platform (Automatic)

File `src/api/api.js` sudah dikonfigurasi untuk otomatis menggunakan CORS proxy di web:

```javascript
const USE_CORS_PROXY = Platform.OS === 'web';
const api = axios.create({
  baseURL: USE_CORS_PROXY ? CORS_PROXY_DEFAULT + BASE_URL : BASE_URL,
  // ...
});
```

### Untuk Mobile Platform (Direct)

iOS dan Android tidak memiliki CORS restriction, jadi direct call ke `dummyjson.com` akan berhasil.

## Testing

### Test di Web
```bash
npm start -- --web
# atau
expo start --web
```

### Test di Android
```bash
npm start -- --android
# atau
expo start --android
```

### Test di iOS
```bash
npm start -- --ios
# atau
expo start --ios
```

## Error Messages & Solutions

### Error: ERR_NETWORK
**Penyebab:** CORS proxy tidak accessible atau tidak di-activate
**Solusi:** 
- Aktivasi cors-anywhere.herokuapp.com
- Atau gunakan alternative proxy
- Atau setup backend proxy

### Error: 429 Too Many Requests
**Penyebab:** Quota CORS proxy sudah habis
**Solusi:** Tunggu beberapa jam atau gunakan proxy lain

### Error: 403 Forbidden
**Penyebab:** CORS proxy tidak authorize request
**Solusi:** Ganti dengan proxy alternative

## Monitoring & Logging

Semua API requests di-log di console dengan format:

```
[API Request] GET /products?limit=100
[API Response] 200 https://cors-anywhere.herokuapp.com/https://dummyjson.com/products?limit=100
```

Lihat Expo logs untuk debugging:
```bash
expo start --web
# Lihat console di browser (F12) untuk logs
```

## Rekomendasi untuk Production

1. **Setup dedicated backend proxy** - Handle CORS di backend, frontend hanya call backend
2. **Negotiate dengan API provider** - Request mereka untuk enable CORS untuk domain Anda
3. **API Gateway** - Gunakan API gateway (AWS API Gateway, Cloudflare, dll) untuk proxy
4. **Alternative API** - Cari API provider yang sudah support CORS

## References

- [MDN - CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [React Native - Platform Specific Code](https://reactnative.dev/docs/platform-specific-code)
- [Axios - Creating an instance](https://axios-http.com/docs/instance)