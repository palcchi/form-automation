const GOOD = [
  'Sudah baik.',
  'Penyampaian materi jelas.',
  'Materi cukup mudah dipahami.',
  'Penjelasan dosen terstruktur dan mudah diikuti.',
  'Contoh yang diberikan membantu memahami materi.',
  'Interaksi di kelas sudah berjalan dengan baik.',
  'Materi relevan dengan tujuan pembelajaran.',
  'Penyampaian materi cukup runtut dan tidak membingungkan.',
  'Dosen menjelaskan konsep utama dengan jelas.',
  'Suasana kelas cukup nyaman untuk belajar dan berdiskusi.',
  'Materi disampaikan dengan bahasa yang mudah dipahami.',
  'Contoh kasus membuat materi lebih mudah dipahami.',
  'Penjelasan materi dan alur pembelajaran sudah cukup baik.',
  'Dosen memberikan kesempatan bertanya dan berdiskusi.',
  'Penyampaian materi cukup sistematis dan interaktif.',
  'Materi, contoh, dan diskusi saling mendukung sehingga pembelajaran terasa jelas.',
  'Penjelasan konsep dilakukan secara bertahap sehingga materi lebih mudah diikuti.',
  'Pengelolaan kelas cukup tertib dan komunikasi dengan mahasiswa berjalan baik.',
  'Materi disampaikan secara terstruktur, contoh yang diberikan relevan, dan mahasiswa memiliki ruang untuk bertanya.',
  'Secara keseluruhan penyampaian materi sudah baik, terutama karena penjelasan cukup runtut dan contoh yang digunakan membantu memahami konsep.'
];

const IMPROVE = [
  'Tidak ada catatan khusus.',
  'Tempo penjelasan bisa sedikit diperlambat.',
  'Contoh latihan bisa ditambah.',
  'Beberapa materi dapat dijelaskan lebih detail.',
  'Waktu diskusi dapat diperbanyak.',
  'Materi yang cukup sulit sebaiknya diberi contoh tambahan.',
  'Pembahasan latihan dapat dibuat lebih rinci.',
  'Beberapa bagian materi terasa cukup cepat.',
  'Interaksi kelas dapat lebih sering dilakukan.',
  'Ringkasan materi di akhir pertemuan dapat ditambahkan.',
  'Contoh praktis dapat diperbanyak agar konsep lebih mudah diterapkan.',
  'Bagian yang kompleks sebaiknya dijelaskan dengan tempo yang lebih perlahan.',
  'Pembagian waktu antara penjelasan, latihan, dan diskusi dapat dibuat lebih seimbang.',
  'Materi sudah baik, tetapi beberapa topik akan lebih mudah dipahami jika disertai contoh tambahan.',
  'Proses pembelajaran dapat dibuat lebih interaktif dengan lebih banyak pertanyaan atau latihan singkat.',
  'Beberapa bagian materi dapat diulang secara singkat sebelum berpindah ke pembahasan berikutnya.',
  'Penjelasan pada topik yang lebih kompleks sebaiknya dilengkapi ilustrasi atau contoh kasus sederhana.',
  'Pengelolaan waktu dapat ditingkatkan agar pembahasan materi dan sesi tanya jawab sama-sama mendapat porsi yang cukup.',
  'Materi pada beberapa pertemuan terasa padat, sehingga akan lebih nyaman jika penjelasan dibagi menjadi bagian-bagian yang lebih kecil dan diselingi latihan.',
  'Secara umum sudah baik, tetapi beberapa konsep yang cukup sulit dapat dijelaskan lebih perlahan dengan tambahan contoh agar mahasiswa tidak tertinggal.'
];

const SUGGEST = [
  'Pertahankan metode yang sekarang.',
  'Tambahkan latihan singkat.',
  'Perbanyak contoh kasus.',
  'Beri lebih banyak waktu untuk diskusi.',
  'Tambahkan rangkuman di akhir kelas.',
  'Gunakan variasi contoh yang lebih dekat dengan praktik.',
  'Adakan kuis singkat untuk mengecek pemahaman.',
  'Tambahkan sesi tanya jawab setelah materi utama.',
  'Berikan latihan bertahap dari mudah ke sulit.',
  'Materi pendukung dapat dibagikan sebelum kelas.',
  'Lebih banyak diskusi kelompok dapat membantu mahasiswa memahami materi.',
  'Contoh praktis dan latihan singkat dapat ditambahkan di setiap topik.',
  'Sesi review singkat di awal atau akhir kelas dapat membantu mengingat materi sebelumnya.',
  'Pembelajaran dapat dibuat lebih interaktif dengan pertanyaan, diskusi, dan latihan selama penyampaian materi.',
  'Akan lebih baik jika setiap topik ditutup dengan rangkuman singkat serta satu atau dua latihan untuk memastikan pemahaman.',
  'Materi yang kompleks dapat disertai contoh visual atau studi kasus agar mahasiswa lebih mudah menghubungkan teori dengan praktik.',
  'Porsi diskusi dan praktik dapat sedikit ditambah supaya mahasiswa tidak hanya menerima materi tetapi juga aktif menerapkannya.',
  'Kualitas pembelajaran dapat ditingkatkan dengan kombinasi penjelasan singkat, contoh, latihan, lalu pembahasan sehingga mahasiswa dapat mengecek pemahamannya secara langsung.',
  'Akan membantu jika materi inti diberikan lebih terstruktur, kemudian mahasiswa diberi waktu mencoba latihan sebelum pembahasan bersama dilakukan.',
  'Ke depannya pembelajaran dapat mempertahankan struktur yang sudah ada sambil menambah variasi latihan, diskusi, dan contoh kasus agar suasana kelas tetap aktif.'
];

const OTHER = [
  'Tidak ada.',
  'Cukup baik.',
  'Semoga dipertahankan.',
  'Secara keseluruhan sudah baik.',
  'Terima kasih atas pembelajarannya.',
  'Tidak ada masukan tambahan.',
  'Semoga pembelajaran berikutnya semakin baik.',
  'Sudah cukup baik dan nyaman diikuti.',
  'Metode pembelajaran saat ini sudah cukup membantu.',
  'Secara umum tidak ada kendala berarti selama pembelajaran.',
  'Semoga pola pembelajaran yang baik dapat terus dipertahankan.',
  'Secara keseluruhan proses pembelajaran berjalan cukup baik dan terarah.',
  'Tidak ada tambahan khusus, pembelajaran sejauh ini sudah cukup nyaman diikuti.',
  'Semoga penyampaian materi yang terstruktur dan kesempatan berdiskusi tetap dipertahankan.',
  'Secara keseluruhan pembelajaran sudah berjalan baik, hanya perlu penyesuaian kecil pada tempo dan porsi latihan.',
  'Tidak ada masukan tambahan yang signifikan. Proses pembelajaran secara umum sudah cukup jelas dan kondusif.',
  'Pembelajaran sejauh ini sudah baik dan semoga kualitas interaksi serta variasi latihan dapat terus ditingkatkan.',
  'Secara umum proses belajar sudah berjalan dengan baik, dan penambahan latihan atau contoh akan membuatnya semakin mudah diikuti.',
  'Tidak ada catatan tambahan yang besar. Struktur pembelajaran sudah cukup jelas dan suasana kelas juga mendukung proses belajar.',
  'Secara keseluruhan pengalaman pembelajaran cukup positif. Penyampaian materi, interaksi, dan pengelolaan kelas sudah berjalan baik dan dapat terus disempurnakan.'
];

function mulberry32(seed) {
  return function () {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(rand, arr) {
  return arr[Math.floor(rand() * arr.length)];
}

function cleanEssay(text) {
  return String(text || '').replace(/\./g, '').replace(/\s+/g, ' ').trim();
}

function weightedScale(rand, profile) {
  const distributions = {
    positive: [3, 4, 4, 4, 5, 5, 5, 5],
    balanced: [2, 3, 3, 4, 4, 4, 5],
    critical: [1, 2, 2, 3, 3, 4],
    mixed: [1, 2, 3, 3, 4, 4, 5]
  };
  return pick(rand, distributions[profile] || distributions.balanced);
}

export function makeQaResponse(index = 1) {
  const safeIndex = Math.max(1, Number(index) || 1);
  const rand = mulberry32(9173 + safeIndex * 7919);
  const types = ['positive', 'balanced', 'mixed', 'balanced', 'positive', 'critical'];
  const profile = types[(safeIndex - 1) % types.length];
  const runId = `TEST-QA-${String(safeIndex).padStart(3, '0')}`;
  const scales = Array.from({ length: 26 }, () => weightedScale(rand, profile));

  return {
    index: safeIndex,
    runId,
    profile,
    scales,
    essays: [
      cleanEssay(pick(rand, GOOD)),
      cleanEssay(pick(rand, IMPROVE)),
      cleanEssay(pick(rand, SUGGEST)),
      cleanEssay(pick(rand, OTHER))
    ]
  };
}

export function makeQaBatch(count = 100) {
  const n = Math.max(1, Math.min(1000, Number(count) || 100));
  return Array.from({ length: n }, (_, i) => makeQaResponse(i + 1));
}
