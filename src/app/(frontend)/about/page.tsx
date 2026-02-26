import React from 'react'
import { VisionMission } from '../../../components/home/VisionMission'
import { Leadership } from '../../../components/home/Leadership'
import { Achievements } from '../../../components/home/Achievements'
import { GridMap } from '../../../components/home/GridMap'
import { AlumniSpotlight } from '../../../components/home/AlumniSpotlight'

export const metadata = {
  title: 'Tentang Kami - PPIDK Timtengka',
  description: 'Sejarah, Visi Misi, dan Struktur Organisasi PPIDK Timur Tengah & Afrika',
}

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="py-20 lg:py-28 text-center space-y-4 px-6">
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Tentang Kami
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Mengenal lebih dekat Sinergi Pelajar Indonesia di kawasan Timur Tengah dan Afrika.
        </p>
      </div>

      {/* Profil Section */}
      <section id="profil" className="scroll-mt-24 py-16 lg:py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-10 text-center">
            Profil
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-6">
            <p>
              Perhimpunan Pelajar Indonesia Dunia Kawasan Timur Tengah dan Afrika (PPIDK Timtengka)
              merupakan organisasi kawasan yang mewadahi dan menghimpun diaspora pelajar serta
              mahasiswa Indonesia yang sedang menempuh pendidikan di berbagai negara di kawasan
              Timur Tengah dan Afrika. PPIDK Timtengka hadir sebagai wadah koordinasi, penyaluran
              aspirasi, dan pengembangan kapasitas pelajar Indonesia di luar negeri, sekaligus
              sebagai ruang konsolidasi kontribusi diaspora bagi kepentingan bangsa.
            </p>
            <p>
              Dalam menjalankan perannya, PPIDK Timtengka secara konsisten menginisiasi dan
              menyelenggarakan berbagai kegiatan strategis yang merespons dinamika kawasan dan
              isu-isu global, mulai dari simposium kawasan, konferensi pelajar, hingga lokakarya
              tematik lintas negara. Kegiatan-kegiatan tersebut dirancang untuk memperkuat jejaring
              intelektual, meningkatkan kapasitas kepemimpinan dan keilmuan pelajar, serta mendorong
              kontribusi nyata diaspora pelajar Indonesia bagi kepentingan nasional dan global.
            </p>
            <p>
              PPIDK Timtengka menjadi jembatan yang menghubungkan diaspora pelajar Indonesia yang
              tersebar di 19 negara.
            </p>
          </div>
        </div>
      </section>

      {/* Sejarah Section */}
      <section id="sejarah" className="scroll-mt-24 py-16 lg:py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-10 text-center">
            Sejarah
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-6">
            <p>
              Sejarah pergerakan pelajar Indonesia di luar negeri merupakan bagian tak terpisahkan
              dari perjalanan panjang bangsa dalam membangun kesadaran nasional, solidaritas, dan
              jejaring intelektual lintas negara. Sejak awal abad ke-20, pelajar Indonesia di luar
              negeri tidak hanya hadir sebagai penimba ilmu, tetapi juga sebagai aktor penting dalam
              pergulatan ide, perumusan identitas kebangsaan, dan perjuangan menuju kemerdekaan.
            </p>
            <p>
              Tonggak awal pergerakan tersebut bermula pada tahun 1922 di Leiden, Belanda, ketika
              Indische Vereeniging didirikan oleh Mohammad Hatta bersama rekan-rekannya. Organisasi
              ini kemudian bertransformasi menjadi Persatoean Peladjar Indonesia (PPI), yang
              berperan sebagai wadah perjuangan intelektual dan politik pelajar Indonesia di luar
              negeri. PPI memiliki posisi historis yang sangat penting, antara lain sebagai
              satu-satunya organisasi pelajar luar negeri yang terlibat secara resmi dalam Kongres
              Pemuda II pada 28 Oktober 1928, sebuah peristiwa monumental dalam sejarah kebangsaan
              Indonesia.
            </p>
            <p>
              Memasuki era pascakemerdekaan dan globalisasi pendidikan, jumlah serta persebaran
              pelajar Indonesia di berbagai belahan dunia semakin meluas. Kondisi ini melahirkan
              kebutuhan akan sebuah wadah global yang mampu mengoordinasikan potensi, aspirasi,
              serta kontribusi pelajar Indonesia lintas negara secara lebih terstruktur. Upaya
              tersebut mulai menemukan bentuknya pada 11 September 2004 melalui penyelenggaraan Temu
              Ilmiah Internasional Mahasiswa Indonesia (TIIMI) di London, Inggris. Forum ini
              melahirkan manifesto &ldquo;Tekad London 2004&rdquo;, yang menandai berdirinya
              Perhimpunan Pelajar Indonesia Internasional (PPI Internasional).
            </p>
            <p>
              Transformasi kelembagaan selanjutnya terjadi pada 9 September 2007, melalui Konferensi
              Internasional Pelajar Indonesia (KIPI) di University of New South Wales (UNSW),
              Sydney, Australia. Forum ini menjadi tonggak penting perubahan PPI Internasional
              menjadi Perhimpunan Pelajar Indonesia Dunia (PPI Dunia)—yang juga dikenal sebagai
              Overseas Indonesian Students Association Alliance (OISAA)—sebagai wadah resmi
              komunikasi, koordinasi, dan konsolidasi PPI Negara di seluruh dunia.
            </p>
            <p>
              Seiring dengan semakin kompleksnya dinamika global dan meningkatnya jumlah PPI Negara,
              PPI Dunia kemudian melakukan penguatan struktur organisasi berbasis kawasan. Dalam
              Simposium Internasional PPI Dunia III yang diselenggarakan di Kuala Lumpur, Malaysia,
              pada 16–19 Februari 2012, ditetapkan pembagian PPI Dunia ke dalam tiga kawasan besar,
              yaitu:
            </p>
            <ol className="list-decimal list-inside space-y-2 pl-4">
              <li>Kawasan Amerika dan Eropa</li>
              <li>Kawasan Asia dan Oseania</li>
              <li>Kawasan Timur Tengah dan Afrika</li>
            </ol>
            <p>
              Keputusan strategis ini menjadi dasar pembentukan Perhimpunan Pelajar Indonesia Dunia
              Kawasan Timur Tengah dan Afrika (PPIDK Timtengka) sebagai entitas kawasan yang
              berfungsi mengoordinasikan komunikasi, program, serta inisiatif PPI Negara di kawasan
              Timur Tengah dan Afrika. PPIDK Timtengka hadir sebagai penghubung antara PPI Negara,
              PPI Dunia, dan pemangku kepentingan nasional, sekaligus sebagai ruang konsolidasi
              gagasan, penguatan jejaring, dan pengembangan kontribusi diaspora pelajar Indonesia di
              kawasan yang memiliki signifikansi historis, geopolitik, dan peradaban yang strategis.
            </p>
            <p>
              Hingga kini, PPIDK Timtengka menaungi 19 PPI Negara di kawasan Timur Tengah dan
              Afrika. Sebagai wadah komunikasi, koordinasi, dan advokasi kawasan, PPIDK Timtengka
              secara konsisten menginisiasi dan menyelenggarakan berbagai program strategis, antara
              lain simposium dan konferensi pelajar tingkat kawasan, lokakarya serta diskusi tematik
              lintas negara, program penguatan kapasitas, kepemimpinan, dan keilmuan pelajar, serta
              inisiatif advokasi dan kontribusi sosial bagi Indonesia dan masyarakat global.
            </p>
          </div>
        </div>
      </section>

      <VisionMission />
      <GridMap />
      <Leadership />
      <Achievements />
      {/* <AlumniSpotlight /> */}
    </div>
  )
}
