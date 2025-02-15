//Array paera almacenar los productos selecionados
let selectproducto = []


//elementos del DOM
const selecionarproducto = document.getElementById("producto")
const presupuestoestimado = document.getElementById("presupuesto")
const contenedorarticuloselecionado=document.getElementById("articulos-selecionado")
const frmFormulario = document.getElementById("frmPresupuesto")
const frmNombre = document.getElementById("nombre")
const frmApellido = document.getElementById("apellido")
const frmTelefono = document.getElementById("telefono")
const frmEmail = document.getElementById("email")
const frmPrivacidad = document.getElementById("condiciones")
const frmEnviarForm = document.getElementById("enviarform")
const frmPlazoenvio = document.getElementById("plazoenvio")

let valida={
    nombre:false,
    apellido:false,
    telefono:false,
    email:false
}

// Mensaje de error
function setErrorFor(input, message) {
    //recibe como parametro input y mensaje
    const formControl = input.parentElement;
    const small = formControl.querySelector("small"); //seleciona donde esta escrito el mensaje
    formControl.className = "form-control error"; //selecciona la clase de css
    small.innerText = message;
}

//si todo esta correcto
function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

//validacion de campo Nombre
frmNombre.addEventListener("blur",()=>{
    let name_re = /^[a-zA-Z ]{2,15}$/

    if(frmNombre.value==''||frmNombre.value==null){
        valida.nombre=false
        setErrorFor(nombre,"No se puede dejar el nombre vacio")
    }else{
        if(!name_re.exec(frmNombre.value)){
            valida.nombre=false
            setErrorFor(frmNombre,"El nombre tiene que tener entre 2 y 15 caracteres")
        }else{
            valida.nombre=true
            setSuccessFor(frmNombre)
        }

    }
})

// Validacion del campo Apellido
frmApellido.addEventListener("blur",()=>{
    let apellido_re = /^[a-zA-Z ]{2,40}$/

    if(frmApellido.value==''||frmApellido.value==null){
        valida.apellido=false
        setErrorFor(frmApellido,"No se puede dejar el apellido vacio")
    }else{
        if(!apellido_re.exec(frmApellido.value)){
            valida.apellido=false
            setErrorFor(frmApellido,"El apellido tiene que tener entre 2 y 40 caracteres")
        }else{
            valida.apellido=true
            setSuccessFor(frmApellido)
        }

    }
})

//Validacion del campo Telefono
frmTelefono.addEventListener("blur",()=>{
    let telefono_re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}$/

    if(frmTelefono.value==''||frmTelefono.value==null){
        valida.telefono=false
        setErrorFor(frmTelefono,"No se puede dejar el telefono vacio")
    }else{
        if(!telefono_re.exec(frmTelefono.value)){
            valida.telefono=false
            setErrorFor(frmTelefono,"El telefono solo puede tener 9 digitos")
        }else{
            valida.telefono=true
            setSuccessFor(frmTelefono)
        }

    }
})

//Validacion del campo Email
frmEmail.addEventListener("blur",()=>{
    let email_re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if(frmEmail.value==''||frmEmail.value==null){
        valida.email=false
        setErrorFor(frmEmail,"No se puede dejar el correo vacio")
    }else{
        if(!email_re.exec(frmEmail.value)){
            valida.email=false
            setErrorFor(frmEmail,"No ingreso un correo valido")
        }else{
            valida.email=true
            setSuccessFor(frmEmail)
        }

    }
})
selecionarproducto.addEventListener('change',()=>  {
    const opcionselecionada = selecionarproducto.options[selecionarproducto.selectedIndex]
    const valorselecionado = opcionselecionada.value

    if(!valorselecionado){
        alert('Selecciona un producto valido')
        return
    }

    const [nombreProducto,precioProducto] = valorselecionado.split(":")
    const precio = parseFloat(precioProducto)

    //agregar el producto al array
    selectproducto.push({nombre:nombreProducto, precio})
    actualizaselecproducto()
})

frmPlazoenvio.addEventListener('change',()=>{
        const plazoenvio = parseInt(frmPlazoenvio.value)
    if(plazoenvio<=0){
        setErrorFor(frmPlazoenvio,"Ingrese un valor valido para el envio")
    }else{
        setSuccessFor(frmPlazoenvio)
        actualizaprecioestimado()
    }

})

frmPlazoenvio.addEventListener('blur',()=>{
    const plazoenvio = parseInt(frmPlazoenvio.value)
if(plazoenvio<0){
    setErrorFor(frmPlazoenvio,"Ingrese un valor valido para el envio")
}else{
    setSuccessFor(frmPlazoenvio)
    actualizaprecioestimado()
}

})
function actualizaselecproducto(){
    //limpiar conatenido previo
    contenedorarticuloselecionado.innerHTML=''
        let totalselctproducto=0

    //mostrar y sumar productos
    selectproducto.forEach((producto, index)=>{
        totalselctproducto  +=producto.precio

        const articuloselecionado= document.createElement('div')
        articuloselecionado.classList.add('articulos-selecionado')
        articuloselecionado.innerHTML= `<br>
            ${producto.nombre} - ${producto.precio.toFixed(2)}
            <button class='eliminar-articulo' data-index='${index}'>Eliminar</button> 
        `
        contenedorarticuloselecionado.appendChild(articuloselecionado)
    })

    // funcionamiento del boton eliminar
     
        document.querySelectorAll('.eliminar-articulo').forEach((boton)=>{
            boton.addEventListener('click', (e) => {
                const index = e.target.dataset.index

        eliminararticulo(index)
    })
})
    actualizaprecioestimado()
}

// eliminar articulos seleccionados

function eliminararticulo(index){

    selectproducto.splice(index,1)
    actualizaselecproducto()
}

//calcular y mostrar precio estimado
function actualizaprecioestimado(){
    let total=selectproducto.reduce((suma, item)=>suma + item.precio,0)
    let plazoenvio = parseInt(frmPlazoenvio.value)
    //sumar precio de los extras
    const extrasselecionados = document.querySelectorAll('.checkbox-extras:checked')
    extrasselecionados.forEach((checkbox)=>{
        const[,precioextra]=checkbox.value.split(":")
        total +=parseFloat(precioextra)
    })
  if (frmPlazoenvio.value=='' || frmPlazoenvio.value==null){
        plazoenvio=0
    }
    total+=parseFloat(plazoenvio)
    presupuesto.value = `${total.toFixed(2)}€`
}

//evento para sumar los extras cuando se seleccione/deseleccione
const checkboxextras= document.querySelectorAll('.checkbox-extras')
checkboxextras.forEach((checkbox)=>{
    checkbox.addEventListener('change',actualizaprecioestimado)
})



frmFormulario.addEventListener("submit",(e)=>{
    e.preventDefault();//paralizar el envio del formulario
    if(!frmPrivacidad.checked){
        setErrorFor(frmPrivacidad, "Tienes que aceptar las condiciones");
        
    }else{
        setSuccessFor(frmPrivacidad);
    }
    let errorV=false

    for(const property in valida){
        if(valida[property]==false){
            errorV=true
        }
    }

    if(errorV==true){
        setErrorFor(frmEnviarForm,"Tienes que llenar la seccion de DATOS")
    }else{
        setSuccessFor(frmEnviarForm)
    }

    if(!errorV){
        frmFormulario.submit()
    }
})
