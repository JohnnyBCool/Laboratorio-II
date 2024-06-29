let book_shelf = {
    book1 : {
        title: 'El amor en los tiempos del cólera',
        author: 'Gabriel García Márquez'
    },
    book2 : {
        title: 'Por quien doblan las campanas',
        author: 'Ernest Hemingway'
    },
    book3 : {
        title: 'El extranjero',
        author: 'Albert Camus'
    },
}

//async-await
const fs= require('node:fs/promises');

//Interface
const read = require ('node:readline');
const myRl = read.createInterface({
   input: process.stdin,
   output: process.stdout 
});

const askQuestion = (message) => {
        return new Promise((resolve, reject) => {
            myRl.question(message, (answer) => {
                answer ? resolve(answer) :reject('There was some issue');
            });
        });
}

//Notas: La base de datos se modifica en el objeto, no en el archivo. :P


class currentBook {
    constructor(title, author, sample){
        this.title = title;
        this.author = author;
        this.sample_text = sample;
    }  
}


console.log('\n');
console.log('1 - Leer el book shelf.');
console.log('2 - Agregar un libro.');
console.log('3 - Retirar un libro');
console.log('\n');

(async () => {
    const opcion = await askQuestion('Seleccione una opción:')  
    console.log(opcion);
    
    switch (opcion){
        case '1':
            console.log(book_shelf);
            break;
        
        case '2':
            //Agrega libro
            (async () => {

                const title=await askQuestion('Libro:');
                console.log(title);
                const author = await askQuestion('Autor:');
                console.log(author);
                const sample_text = await askQuestion('Muestra de texto:');
                console.log(sample_text);

                let newBook= new currentBook (title, author, sample_text);

                console.log('\n',newBook);

                book_shelf.book={title : newBook.title, author : newBook.author, sample_text : newBook.sample_text};
                updateIndices();
                console.log(book_shelf);
                
            })();

            
        break;

        case '3':
            console.log(book_shelf);
            
            (async () => {
                const borraLibro=await askQuestion('\n¿Qué libro deseas retirar?.\n');
                if (book_shelf.hasOwnProperty(borraLibro)){ //Verifica si existe el libro solicitado.
                delete book_shelf[borraLibro];
                
                updateIndices(); //Se actualizan los indices para que sean consecutivos book1, book2, book3...
             
                console.log('\n');
                console.log('Se borró el elemento ',borraLibro);
                console.log('\n');
                console.log(book_shelf);
                }else{
                    console.log('El elemento que deseas borrar no existe.')
                }
                
            })();

        break;

        default: 

    }
   
})();

//Renombrar los IDs de los libros después de modificar la estructura de datos.
function updateIndices(){

    let updated_book_shelf = {};
    Object.keys(book_shelf).forEach((key, index)=> {
    var newKey=`book${index+1}`;
    updated_book_shelf[newKey]=book_shelf[key];
    //console.log(updated_book_shelf); //Esta línea se utilizo para hacer pruebas en la terminal.
    });

    book_shelf = updated_book_shelf;
    
}

//Modificar book_shelf
//Chaquetas mentales
/*
//Concatenar de forma correcta y continua los arreglos, implementar JSON si es posible.
const librosLeidos = async () => {
    try{
        const archivoLeido = await readTXTFile();
        const myObject = archivoLeido;
         
        const otro_libro = {book7:{title:'otro', author:'Otro'}};
              
        //const myObject_A = JSON.parse(myObject);
        //console.log(myObject_A);
        const myObjAppend = {...myObject,...otro_libro };
       //myObject=myObjAppend.split('\n'); quitar los key elements con \n y etc
        console.log(myObject);
        
        //console.log(myObject_A); //Es una cadena de caracteres JSON
        //console.log(book_shelf); //Es un objeto de verdad
       
        return myObjAppend;
        
        //console.log(myObjAppend);
        //return myObjAppend;
    }catch(error){
        console.log('No se pudo extraer la información');

    }
}
librosLeidos();
*/
    
