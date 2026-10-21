import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import CategoryBar from './components/CategoryBar.jsx'
import Gallery from './components/Gallery.jsx'
import AddPhotoModal from './components/AddPhotoModal.jsx'
import FiltersOffcanvas from './components/FiltersOffcanvas.jsx'
import Footer from './components/Footer.jsx'
import photos from './data/photos.json'
import './App.css'

function App() {
  const [zdjecia, setZdjecia] = useState(photos)
  const [aktywnaKategoria, setAktywnaKategoria] = useState('wszystkie')

  const widoczne =
    aktywnaKategoria === 'wszystkie'
      ? zdjecia
      : zdjecia.filter(z => z.category === aktywnaKategoria)

  return (
    <>
      <Navbar />

      <header className="container py-4 py-lg-5">
        <div className="row align-items-center g-3">
          <div className="col-12 col-lg-8">
            <h1 className="mb-2">Galeria zdjęć</h1>
            <p className="lead text-body-secondary mb-0">
              Zdjęcia z wypraw w góry, nad morze i po mieście. Wybierz kategorię,
              żeby zawęzić widok – albo powiększ zdjęcie, które Ci się spodoba.
            </p>
          </div>
        </div>
      </header>

      <main className="container">
        <CategoryBar aktywna={aktywnaKategoria} onWybierz={setAktywnaKategoria} />

        <p className="text-body-secondary">
          Wyświetlono {widoczne.length} z {zdjecia.length} zdjęć
        </p>

        {widoczne.length === 0 && (
          <div className="alert alert-warning">
            Nie znaleziono zdjęć w tej kategorii.
          </div>
        )}

        <Gallery zdjecia={widoczne} />
      </main>

      <Footer />
      <AddPhotoModal />
      <FiltersOffcanvas aktywna={aktywnaKategoria} onWybierz={setAktywnaKategoria} />
    </>
  )
}

export default App