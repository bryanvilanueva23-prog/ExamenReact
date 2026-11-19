import { useEffect, useState } from 'react'


function CuentaRegresiva() {
  const [fecha, setFecha] = useState('')
  const [ahora, setAhora] = useState(Date.now)
  const objetivo = new Date(fecha).getTime()
  const fechaValida = Number.isFinite(objetivo)

  useEffect(() => {
    if (!Number.isFinite(objetivo) || objetivo <= Date.now()) return

    const intervalo = setInterval(() => {
      const tiempoActual = Date.now()
      setAhora(tiempoActual)
      if (tiempoActual >= objetivo) clearInterval(intervalo)
    }, 1000)


    return () => clearInterval(intervalo)
  }, [objetivo])

  const restante = fechaValida ? Math.max(0, Math.ceil((objetivo - ahora) / 1000)) : 0
  const dias = Math.floor(restante / 86400)
  const horas = Math.floor((restante % 86400) / 3600)
  const minutos = Math.floor((restante % 3600) / 60)
  const segundos = restante % 60

  return (
    <main className="container py-5 panel-simple">
      <h1 className="h2 mb-4">Cuenta regresiva</h1>
      <div className="card p-4 shadow-sm">
      <label className="form-label d-block mb-4">
        Fecha y hora de destino
        <input
          className="form-control mt-2" type="datetime-local"
          value={fecha}
          onChange={(e) => {
            setFecha(e.target.value)
            setAhora(Date.now())
          }}
        />
      </label>
      {!fechaValida ? (
        <p>Selecciona una fecha y hora.</p>
      ) : restante === 0 ? (
        <p className="alert alert-success" role="status">¡Fin del tiempo!</p>
      ) : (
        <p className="alert alert-success fs-4" role="timer">
          {dias} dias, {horas} horas, {minutos} minutos y {segundos} segundos
        </p>
      )}
      </div>
    </main>
  )
}

export default CuentaRegresiva


