# 📅 Room Scheduler API & Frontend

Aplikasi ini digunakan untuk mengecek ketersediaan ruangan berdasarkan tanggal maupun rentang tanggal, serta menampilkan jadwal penggunaan ruangan secara real-time.

---

# 🚀 Fitur

* ✅ Cek jadwal ruangan per tanggal
* ✅ Cek ketersediaan semua ruangan
* ✅ Cek ketersediaan dalam **range tanggal**
* ✅ Menampilkan jam penggunaan ruangan
* ✅ Tampilan matrix (seperti kalender sederhana)

---

# 🧱 Tech Stack

* Backend: Node.js + Express
* Frontend: HTML + TailwindCSS
* HTTP Client: Axios

---

# 📦 Instalasi

## 1. Clone Repository

```bash
git clone <repo-url>
cd <nama-folder>
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Setup Environment Variable

Buat file `.env` di root project:

```env
EVENTS_URL=<minta_ke_admin>
PORT=3000
```

⚠️ **Catatan:**

* `EVENTS_URL` harus diminta ke admin
* Jangan commit file `.env`

---

# ▶️ Menjalankan Backend

```bash
node index.js
```

atau kalau pakai nodemon:

```bash
npx nodemon index.js
```

Server akan berjalan di:

```text
http://localhost:3000
```

---

# 🌐 Menjalankan Frontend

1. Buka file `index.html`
2. Klik kanan → **Open with Live Server**

Atau jika pakai VS Code:

* Install extension **Live Server**
* Klik tombol **Go Live**

Frontend akan berjalan di:

```text
http://127.0.0.1:5500
```

---

# 🔗 API Endpoint

## 1. Ambil event per ruangan (1 hari)

```http
GET /rooms/:id/events?date=YYYY-MM-DD
```

---

## 2. Cek semua ruangan (1 hari)

```http
GET /rooms/available?date=YYYY-MM-DD
```

---

## 3. Cek semua ruangan (range tanggal)

```http
GET /rooms/range?start=YYYY-MM-DD&end=YYYY-MM-DD
```

---

# 📊 Contoh Response (Range)

```json
{
  "success": true,
  "data": {
    "start": "2026-04-11",
    "end": "2026-04-13",
    "rooms": [
      {
        "room_name": "GSG: VIP A",
        "availability": {
          "2026-04-12": [
            {
              "acara": "Meeting",
              "start": "10:00",
              "end": "12:00"
            }
          ]
        }
      }
    ]
  }
}
```

---

# ⚠️ Catatan Penting

* Endpoint `/range` lebih efisien dibanding looping per tanggal
* Pastikan urutan route di Express:

  * `/available`
  * `/range`
  * `/:id/...`
* Pastikan CORS sudah diaktifkan di backend

---

# 🧠 Tips Pengembangan

* Gunakan range maksimal 7–14 hari untuk performa optimal
* Bisa dikembangkan jadi:

  * 📆 Calendar view
  * 🤖 Auto booking suggestion
  * 🔍 Pencarian slot kosong

---

# 👨‍💻 Author

Developed for internal room scheduling system.
