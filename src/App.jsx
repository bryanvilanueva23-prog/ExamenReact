import { useState } from 'react'
import Operaciones from './components/Operaciones.jsx'
import CuentaRegresiva from './pregunta2/cuentaregresiva.jsx'
import ApiRest from './components/ApiRest.jsx'
import './App.css'

const opciones = [
  { id: 'operaciones', nombre: 'Operaciones' },
  { id: 'cuenta', nombre: 'Cuenta regresiva' },
  { id: 'api', nombre: 'API REST' },
]

function App() {
  const [seccion, setSeccion] = useState('operaciones')
  const [apiVisitada, setApiVisitada] = useState(false)

  function cambiarSeccion(id) {
    setSeccion(id)
    if (id === 'api') setApiVisitada(true)
  }

  return (
    <>
      <nav className="bg-white border-bottom shadow-sm" aria-label="Menú principal">
        <div className="container py-3 d-flex flex-wrap align-items-center gap-3">
          <span className="fw-bold fs-5 me-md-auto">Mis ejercicios React</span>
          <ul className="nav nav-pills gap-2">
            {opciones.map((opcion) => (
              <li className="nav-item" key={opcion.id}>
                <button
                  type="button"
                  className={`nav-link ${seccion === opcion.id ? 'active' : ''}`}
                  aria-current={seccion === opcion.id ? 'page' : undefined}
                  aria-controls={`vista-${opcion.id}`}
                  onClick={() => cambiarSeccion(opcion.id)}
                >
                  {opcion.nombre}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div id="vista-operaciones" hidden={seccion !== 'operaciones'}><Operaciones /></div>
      <div id="vista-cuenta" hidden={seccion !== 'cuenta'}><CuentaRegresiva /></div>
      <div id="vista-api" hidden={seccion !== 'api'}>{apiVisitada && <ApiRest />}</div>
    </>
  )
}

export default App
