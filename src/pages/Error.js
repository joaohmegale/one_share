import React from 'react'
import { Link } from 'react-router-dom'

function Error() {  
  return (
    <div className='error'>
      <h1>Erro 404</h1>
      <h2>Pagina não encontrada</h2>
      <Link to='/'>Voltar para pagina principal</Link>
    </div>
  )
}

export default Error