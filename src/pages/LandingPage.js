import React from 'react'
import {Button} from 'react-bootstrap'

const LandingPage = () => {
  return (
    <div style={{textAlign: 'center'}} className='containter'>
      <h1 >Bienvenido</h1>
      <p>Por Favor, Elija una Opción:</p>
      <Button variant="primary" href='/todolist'>Mostrar ToDo List</Button>
    </div>
  )
}

export default LandingPage