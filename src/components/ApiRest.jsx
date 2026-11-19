import { useEffect, useState } from 'react'


const API_URL = 'https://jsonplaceholder.typicode.com/users'

function ApiRest() {
  const [usuarios, setUsuarios] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function cargarUsuarios() {
      setCargando(true)
      setError('')
      try {
        // Consumimos la API REST y convertimos la respuesta JSON en datos.
        const respuesta = await fetch(API_URL, { signal: controller.signal })
        if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`)
        const datos = await respuesta.json()
        if (!Array.isArray(datos)) throw new Error('Respuesta inesperada de la API')
        if (!controller.signal.aborted) setUsuarios(datos)
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(`No se pudieron cargar los usuarios. ${err.message}`)
        }
      } finally {
        if (!controller.signal.aborted) setCargando(false)
      }
    }

    cargarUsuarios()
    return () => controller.abort()
  }, [intento])

  const filtro = busqueda.trim().toLocaleLowerCase('es')
  const usuariosFiltrados = usuarios.filter((usuario) =>
    `${usuario.name} ${usuario.email} ${usuario.company?.name ?? ''}`
      .toLocaleLowerCase('es').includes(filtro),
  )

  return (
    <main className="container py-5">
      <header className="mb-4">
        <h1 className="h2 mb-4">Directorio de usuarios</h1>
       
      
      </header>

      <section className="card shadow-sm mb-4" aria-label="Buscar usuarios">
        <div className="card-body d-flex flex-column flex-md-row gap-3 align-items-md-end">
          <div className="flex-grow-1">
            <label htmlFor="busqueda" className="form-label fw-semibold">Buscar un contacto</label>
            <input
              id="busqueda"
              type="search"
              className="form-control"
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-success"
            disabled={cargando}
            onClick={() => setIntento((valor) => valor + 1)}
          >
            {cargando ? 'Cargando...' : 'Actualizar datos'}
          </button>
        </div>
      </section>

      {cargando ? (
        <div className="text-center py-5" role="status">
          <span className="spinner-border text-success" aria-hidden="true" />
          <p className="mt-3 text-secondary">Consultando la API...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          <p>{error}</p>
          <button className="btn btn-outline-danger" onClick={() => setIntento((valor) => valor + 1)}>
            Reintentar
          </button>
        </div>
      ) : (
        <section aria-label="Resultados de usuarios">
          <p className="text-secondary" role="status">
            {usuariosFiltrados.length} de {usuarios.length} usuarios
          </p>
          {usuariosFiltrados.length === 0 ? (
            <div className="alert alert-info">No se encontraron usuarios para esta búsqueda.</div>
          ) : (
            <div className="row g-4">
              {usuariosFiltrados.map((usuario) => (
                <div className="col-12 col-md-6 col-xl-4" key={usuario.id}>
                  <article className="card h-100 shadow-sm">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center gap-3 mb-4">
                        <span className="avatar" aria-hidden="true">
                          {usuario.name.split(' ').map((parte) => parte[0]).slice(0, 2).join('')}
                        </span>
                        <div>
                          <h2 className="h5 mb-1">{usuario.name}</h2>
                          <span className="text-secondary">@{usuario.username}</span>
                        </div>
                      </div>
                      <dl className="mb-0 contact-details">
                        <dt>Correo electrónico</dt>
                        <dd><a href={`mailto:${usuario.email}`}>{usuario.email}</a></dd>
                        <dt>Teléfono</dt>
                        <dd>{usuario.phone}</dd>
                        <dt>Empresa</dt>
                        <dd>{usuario.company?.name ?? 'Sin empresa'}</dd>
                        <dt>Ciudad</dt>
                        <dd className="mb-0">{usuario.address?.city ?? 'Sin ciudad'}</dd>
                      </dl>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

    </main>
  )
}

export default ApiRest


