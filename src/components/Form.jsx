import React from 'react';

export const Form = ({ book, setBook }) => {

    const handleChange = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        })

    }
    let {titulo, autor, edicion } = book;

    const handleSubmit = () =>{
        edicion = parseInt(edicion, 10);
        //Validación de los datos
        if(titulo === '' || autor === '' || edicion <= 0){
            alert('Todos los campos son obligatorios');
            return;
        }

        //consulta
        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(book)
        }

        fetch('http://localhost:9000/api', requestInit)
        .then(res => res.text())
        .then(res => console.log(res))

        //reiniciando el state del libro
        setBook({
            titulo: '',
            autor: '',
            edicion: 0
        });

    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label"><strong>Titulo</strong></label>
                <input value={titulo} onChange={handleChange} name="titulo" type="text" id="title" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="author" className="form-label"><strong>Autor</strong></label>
                <input value={autor} onChange={handleChange} name="autor" type="text" id="author" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="edition" className="form-label"><strong>Edición</strong></label>
                <input value={edicion} onChange={handleChange} name="edicion" type="number" id="edition" className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary">Agregar</button>
        </form>
    )
}
