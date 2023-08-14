import { useState } from 'react'
import './App.css'
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, getDoc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const firebaseConfig = {
  apiKey: "AIzaSyCoxFcVBqJN--MvXQ96oOKDExrhRuUS9bQ",
  authDomain: "formulario-89379.firebaseapp.com",
  projectId: "formulario-89379",
  storageBucket: "formulario-89379.appspot.com",
  messagingSenderId: "32102135086",
  appId: "1:32102135086:web:3abe685d2c906d362476bf"
};

const db = getFirestore(initializeApp(firebaseConfig));


function App() {
  const valores = {
    nombre: '',
    apellido: '',
    email: '',
    dni: '',
    empresa: '',
  }

  const [datos, setDatos] = useState(valores)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setDatos({ ...datos, [name]: value })
  }

  const enviarDatos = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, "usuarios"), {
        ...datos,
      })
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        title: <p>Gracias por participar</p>,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#000',
      })
    } catch (error) {
      console.log(error);
    }
    setDatos({ ...valores })
  }

//mostrar los datos en formato de tabla en pantalla debajo del formulario
  const verDatos = async (e) => {
    e.preventDefault()
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title: <p>Participantes</p>,
      html: `<table>
      <tr>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Email</th>
        <th>DNI</th>
        <th>Empresa</th>
      </tr>
      ${querySnapshot.docs.map(doc => `
      <tr>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().apellido}</td>
        <td>${doc.data().email}</td>
        <td>${doc.data().dni}</td>
        <td>${doc.data().empresa}</td>
      </tr>
      `).join('')}
    </table>`,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#000',
    })
  }


  return (
    <>
      <div className='contenedor-img'>
        <img src="../public/bylett.png" alt="logo" />
      </div>
      <main className='contenedor'>
        <section className='section'>
          <h2>Ingrese sus datos</h2>

          <form onSubmit={enviarDatos} action="" className="formulario" id="form">
            <label className='label' >Nombre</label>
            <input className='input' type="text" name="nombre" id="nombre" placeholder="Lett" required onChange={handleInputChange} value={datos.nombre} />
            <label className='label' >Apellido</label>
            <input className='input' type="text" name="apellido" id="apellido" placeholder="Comercial" required onChange={handleInputChange} value={datos.apellido} />
            <label className='label' >E-mail</label>
            <input className='input' type="email" name="email" id="email" placeholder="ByLett@lettcomercial.com"
              required onChange={handleInputChange} value={datos.email} />

            <label className='label' >DNI</label>
            <input className='input' type="text" name="dni" id="dni" placeholder="XXXXXXXX" required onChange={handleInputChange} value={datos.dni} />

            <label className='label' >Nombre Empresa</label>
            <input className='input' type="text" name="empresa" id="emrpesa" placeholder="LettComercial"  required onChange={handleInputChange} value={datos.empresa} />


            <button id="guardar" className='btn' type="submit" >PARTICIPAR</button>
          </form>

          <h1 id="imprimir"></h1>
        </section>
      </main>
    </>
  )
}

export default App
