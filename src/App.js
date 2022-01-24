import React, { useState, useEffect } from 'react';
import { BookList } from './components/BookList';
import { Form } from './components/Form';
import { NavBar } from './components/NavBar';

function App() {

  const brand = 'Aplicación de Libros';

  const [book, setBook] = useState({
    titulo: '',
    autor: '',
    edicion: 0
  });

  const [books, setBooks] = useState( [] );
  
  const [listUpdated, setListUpdated] = useState( false );


  useEffect(() => {
    const getBooks = () => {
      fetch('http://localhost:9000/api')
      .then(res => res.json())
      .then(res => setBooks(res))
    }
    getBooks();

    setListUpdated(false);
  }, [listUpdated])

  return (
      <>
        <NavBar brand={ brand } />
        <div className="conatiner">
          <div className="row">
            <div className="col-7">
              <h2 style={{ textAlign: 'center' }}> Lista de Libros</h2>
              <BookList book={ book } setBook={ setBook } books={ books } setListUpdated={ setListUpdated }/>

            </div>
            <div className="col-5">
              <h2 style={{ textAlign: 'center' }}>Registro de Libro</h2>
              <Form book={ book } setBook={ setBook } />

            </div>

          </div>

        </div>
      </>
      
  );
}

export default App;
