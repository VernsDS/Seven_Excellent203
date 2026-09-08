# Seven Excellent 203

**Website resmi Kelas 7E SMPN 203 Jakarta.**

Seven Excellent 203 adalah website yang gw bikin khusus buat kelas 7E. Tujuannya simpel, yaitu bikin tempat digital yang bisa nyimpen berbagai hal tentang kelas kita dalam satu tempat.

Mulai dari data siswa, foto, kegiatan kelas, jadwal pelajaran, sampai berbagai informasi lainnya yang mungkin suatu saat bakal berguna buat kita.

Project ini gw bikin **dari nol dan tanpa dipungut biaya**. Gw pengen kelas kita punya sesuatu yang bukan cuma sekadar website biasa, tapi juga bisa jadi arsip digital yang masih bisa dibuka dan dilihat lagi di kemudian hari.

> Dibuat sepenuh hati untuk 7E.

---

## Tentang Project

Awalnya project ini cuma dibuat sebagai website kelas.

Tapi makin lama, gw kepikiran buat bikin website ini lebih dari sekadar halaman yang berisi informasi kelas.

Gw pengen Seven Excellent 203 punya sistem yang nantinya bisa dipakai siswa buat berinteraksi satu sama lain, punya akun masing-masing, dan punya beberapa fitur yang memang dibuat khusus buat kebutuhan kelas.

Jadi project ini masih terus berkembang.

Beberapa fitur mungkin sudah ada, beberapa masih dalam tahap development, dan beberapa lainnya masih ada di roadmap.

Gw juga pengen website ini tetap terasa seperti website yang dibuat manusia, bukan template sekolah yang isinya cuma tulisan formal dan tabel.

Karena itu dari awal gw lebih fokus ke desain, experience, dan bagaimana website ini bisa terasa nyaman ketika dibuka.

---

## Yang Sudah Ada

Untuk versi yang sekarang, website ini sudah memiliki beberapa bagian utama:

- Profil 36 siswa kelas 7E
- Arsip foto siswa
- Galeri kegiatan kelas
- Jadwal pelajaran
- Informasi tentang kelas
- Responsive layout untuk desktop dan mobile
- Animasi dan interaksi pada beberapa bagian website
- Struktur project yang dibuat supaya masih gampang dikembangkan lagi

Data dan konten yang ada di website juga bisa terus diperbarui seiring berjalannya waktu.

---

## Yang Lagi Gw Rencanain

Website ini belum selesai.

Masih ada beberapa hal yang pengen gw masukin ke Seven Excellent 203.

### Sistem akun siswa

Gw pengen setiap siswa dari absen 1 sampai 36 punya akun masing-masing.

Konsepnya bukan register bebas seperti website biasa.

Setiap nomor absen hanya akan punya satu akun.

Rencananya proses login akan menggunakan sistem seperti:

```text
LOGIN
  ↓
Pilih nomor absen
  ↓
Verifikasi
  ↓
Akun aktif
  ↓
Session tersimpan
  ↓
Login otomatis di kunjungan berikutnya
```

Dengan sistem ini, akun siswa bisa dibuat lebih terkontrol dan tidak gampang dipakai oleh orang lain.

### Verifikasi siswa

Salah satu konsep yang lagi gw kembangin adalah sistem verifikasi menggunakan kamera.

Jadi ketika pertama kali memilih akun, siswa bisa melakukan verifikasi melalui foto.

Foto tersebut nantinya akan masuk ke sistem untuk diperiksa sebelum akun diaktifkan.

Gw juga pengen tetap menyediakan metode alternatif untuk siswa yang keberatan atau tidak bisa menggunakan metode verifikasi tersebut.

Jadi bukan cuma satu jalan untuk masuk ke akun.

### Chat kelas

Ini salah satu fitur yang paling gw pengen tambahin.

Rencananya siswa bisa ngobrol langsung lewat website.

Bisa berupa:

- chat kelas
- private chat antar siswa
- status online
- pesan realtime
- profile siswa
- dan beberapa fitur tambahan lainnya

Jadi website ini nantinya bukan cuma tempat lihat informasi, tapi juga bisa jadi salah satu tempat komunikasi kelas.

---

## Tech Stack

Project ini dibangun menggunakan teknologi web modern.

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Development

Project ini dikembangkan menggunakan workflow Git dan GitHub.

Selama development, gw juga menggunakan AI coding agent sebagai alat bantu untuk mempercepat beberapa bagian pekerjaan.

Tapi konsep, tujuan, struktur fitur, desain, dan keputusan utama project tetap berasal dari gw sendiri.

AI di sini lebih gw anggap sebagai alat bantu kerja, bukan sebagai orang yang bikin project ini dari awal sampai akhir.

---

## Menjalankan Project Secara Lokal

Kalau lu pengen nyobain project ini langsung dari komputer lu, pastikan Node.js sudah terinstall.

Clone repository:

```bash
git clone https://github.com/VernsDS/Seven_Excellent203.git
```

Masuk ke folder:

```bash
cd Seven_Excellent203
```

Install dependency:

```bash
npm install
```

Setelah selesai, jalankan development server:

```bash
npm run dev
```

Biasanya Next.js akan menjalankan project di:

```text
http://localhost:3000
```

Setelah itu tinggal buka alamat tersebut di browser.

Kalau lu mengubah kode saat development, halaman biasanya akan otomatis ikut update.

---

## Struktur Project

Secara garis besar, struktur repository ini kurang lebih seperti ini:

```text
Seven_Excellent203/
│
├── app/
│   └── Halaman utama dan routing Next.js
│
├── components/
│   └── Komponen UI yang digunakan di website
│
├── docs/
│   └── Dokumentasi project
│
├── lib/
│   └── Utility dan logic pendukung
│
├── public/
│   └── Asset statis seperti gambar dan resource lainnya
│
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

Struktur ini masih bisa berubah karena project-nya masih aktif dikembangkan.

---

## Kenapa Gw Bikin Ini?

Karena menurut gw, website kelas itu bisa dibuat lebih menarik daripada sekadar halaman yang berisi nama siswa dan jadwal.

Kita bakal punya banyak momen selama kelas 7E.

Foto kegiatan, orang-orang di kelas, tugas, acara, cerita, sampai hal-hal kecil yang mungkin sekarang terasa biasa aja.

Tapi beberapa tahun lagi, hal-hal tersebut bisa jadi sesuatu yang menarik buat dilihat kembali.

Makanya gw pengen Seven Excellent 203 menjadi semacam arsip digital.

Bukan cuma untuk sekarang.

Tapi juga untuk nanti.

---

## Gratis

Project ini dibuat untuk kelas 7E dan **tidak dipungut biaya**.

Gw bikin ini karena memang pengen bikin sesuatu buat kelas.

Hosting, development, desain, dan hal-hal lainnya gw kerjain sebisa gw sendiri.

Kalau nantinya ada fitur tambahan yang membutuhkan layanan tertentu, gw bakal usahakan tetap menggunakan solusi yang masuk akal dan tidak bikin siswa harus bayar cuma buat menggunakan website kelas.

---

## Status Project

**Active Development**

Project ini masih terus gw kerjain.

Jadi kalau lu nemu bug, tampilan yang aneh, link yang error, atau ada bagian website yang belum berfungsi dengan benar, kemungkinan besar memang masih dalam proses development.

Beberapa fitur yang ada di roadmap juga belum tersedia di versi sekarang.

---

## Website

Website resminya bisa langsung lu buka di:

**https://sevenexcellent203.web.id**

Lu gak perlu clone repository atau install apa pun kalau cuma mau lihat versi live-nya.

---

## Portfolio

Project ini juga nantinya bakal masuk ke portfolio gw.

Portfolio pribadi gw masih **soon**.

Jadi untuk sekarang:

**Portfolio: Coming Soon**

---

## Credits

**Seven Excellent 203**

Dibuat oleh **Rafardhan Athala**

Untuk:

**Kelas 7E  
SMPN 203 Jakarta**

Gw bikin project ini bukan karena disuruh.

Gw bikin karena gw pengen.

Dan gw pengen lihat seberapa jauh website ini bisa berkembang sebelum tahun ajaran selesai.

---

## License

Project ini dibuat untuk kebutuhan dan dokumentasi kelas.

Kalau lu mau belajar dari source code-nya, silakan lihat dan pelajari.

Tapi jangan asal mengambil seluruh project lalu mengaku sebagai pembuatnya.

Kalau ada bagian yang lu suka, lebih baik pelajari cara kerjanya dan bikin versi lu sendiri.

---

<p align="center">
  <strong>Seven Excellent 203</strong>
  <br>
  <sub>Made for 7E, built with heart.</sub>
</p>