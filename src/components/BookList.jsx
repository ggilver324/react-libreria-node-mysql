import React from 'react'

export const BookList = ({ book, setBook, books, setListUpdated }) => {

    const handleDelete = (id)=> {
      
        const requestInit = {
            method: 'DELETE'
        }

        fetch('http://localhost:9000/api/' + id, requestInit)
        .then(res => res.text())
        .then(res => console.log(res))

        setListUpdated(true);

    }

    let {titulo, autor, edicion } = book;

    const handleUpdate = (id) =>{
         edicion = parseInt(edicion, 10);
        //Validación de los datos
        if(titulo === '' || autor === '' || edicion <= 0){
            alert('Todos los campos son obligatorios');
            return;
        }

        //consulta
        const requestInit = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(book)
    }

    fetch('http://localhost:9000/api/' + id, requestInit)
    .then(res => res.text())
    .then(res => console.log(res))

    //reiniciando el state del libro
    setBook({
        titulo: '',
        autor: '',
        edicion: 0
    });

    setListUpdated(true);

    }



    return (
        <table className="table">
            <thead>
                <tr className="tr-f">
                    <th>ID</th>
                    <th>Titulo</th>
                    <th>Autor</th>
                    <th>Edición</th>
                </tr>
            </thead>
            <tbody>
                {books.map( (book, i) => (
                    <tr key={ book.id }>
                        <td><strong>{ i + 1 }</strong></td>
                        <td><strong>{ book.titulo }</strong></td>
                        <td><strong>{ book.autor }</strong></td>
                        <td><strong>{ book.edicion }</strong></td>
                        <td>
                            <div className="mb-3">
                                <button onClick={ () => handleDelete(book.id) } className="btn btn-danger">Eliminar</button>
                            </div>
                            <div className="mb-3">
                                <button onClick={ () => handleUpdate(book.id) } className="btn btn-dark">Actualizar</button>
                            </div>
                        </td>

                    </tr>
                ))}

            </tbody>
            
        </table>
    )
}
