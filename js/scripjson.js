let key = 'fc23152951ef43369c756cdb3b88c32a';
let pais='us'
let url = `https://newsapi.org/v2/top-headlines?country=${pais}&apiKey=${key}`

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

