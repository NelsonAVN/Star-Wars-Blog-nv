
import './App.css'
import CharacterGalery from './assets/Components/CharacterGalery'
import Navbar from './assets/Components/Navbar'
import PlanetGalery from './assets/Components/PlanetGalery'
import VehicleGalery from './assets/Components/VehicleGalery'


function App() {

  return (
    <>
      <Navbar />
      <div className='container-fluid py-5'>
        <CharacterGalery />
        <PlanetGalery />
        <VehicleGalery />
      </div>
    </>
  )
}

export default App