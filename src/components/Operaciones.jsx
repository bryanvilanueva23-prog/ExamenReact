import { useState } from 'react'

export default function Operaciones() {
  const [numeroA, setNumeroA] = useState('')
  const [numeroB, setNumeroB] = useState('')
  const [operacion, setOperacion] = useState('suma')
  const [resultado, setResultado] = useState(null)

  function calcular() {
    const a = Number(numeroA)
    const b = Number(numeroB)

    if (numeroA === '' || numeroB === '' || !Number.isFinite(a) || !Number.isFinite(b)) {
      setResultado('Ingresa dos números válidos')
      return
    }

    switch (operacion) {
      case 'suma': setResultado(a + b); break
      case 'resta': setResultado(a - b); break
      case 'multiplicacion': setResultado(a * b); break
      case 'division': setResultado(b === 0 ? 'No se puede dividir entre cero' : a / b); break
    }
  }

  return (
    <main className="container py-5 panel-simple">
      <h1 className="h2 mb-4">Operaciones</h1>
      <div className="card p-4 shadow-sm" onChange={() => setResultado(null)}>
        <label className="mb-3">
          Primer número
          <input
            type="number"
            step="any"
            className="form-control"
            value={numeroA}
            onChange={(e) => setNumeroA(e.target.value)}
          />
        </label>

        <label className="mb-3">
          Operación
          <select className="form-select" value={operacion} onChange={(e) => setOperacion(e.target.value)}>
            <option value="suma">Suma (+)</option>
            <option value="resta">Resta (−)</option>
            <option value="multiplicacion">Multiplicación (×)</option>
            <option value="division">División (÷)</option>
          </select>
        </label>

        <label className="mb-3">
          Segundo número
          <input
            type="number"
            step="any"
            className="form-control"
            value={numeroB}
            onChange={(e) => setNumeroB(e.target.value)}
          />
        </label>

        <button className="btn btn-success" onClick={calcular}>=</button>
        {resultado !== null && <p className="alert alert-success mt-3 mb-0">Resultado: {resultado}</p>}
      </div>
    </main>
  )
}

