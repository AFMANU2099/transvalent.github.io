
let url = "./json/datos.json"

const contenedor1 = document.getElementById('contenedor1');
const errorDv=document.getElementById('errorDv');


fetch(url)
    .then(response => response.json())
    .then(data=>{
        console.log(data)
        let noticias =(data.articles);
        noticias.forEach(articulos => {
            contenedor1.innerHTML +=`
            <div class='articulos'>
            <img style="max-width:250px" src=${articulos.urlToImage}><br>
            <h1>${articulos.title}</h1><br>
            <h2>${articulos.description}</h2>
            <h3>${articulos.url}</h3>
            </div>
            `
        });
        
    })

