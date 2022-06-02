let eventos=[]
let checkedArray=[] 
let inputSearch='' 
//console.log(dataEventos);
//console.log(currentDate);
//console.log(eventos);

async function dataFromApi(){
    //metodo fetch para consultar a la api/ await espera la respuesta y controla el asincronismo
    //fetch hace una promesa
    await fetch('https://amazing-events.herokuapp.com/api/events')
    // con el then saco su respuesta en formato json
    .then(response=> response.json())
    .then(json=> eventos=json)
    
nuevosCheckbox()

var checkboxes=document.querySelectorAll('input[type=checkbox]')
checkboxes.forEach(checkinput=>checkinput.addEventListener('click', (evento)=>{
    
    if(evento.target.checked){
        checkedArray.push(evento.target.value)
        filtrado()
    }
    else{
        checkedArray=checkedArray.filter(uncheck=>uncheck !== evento.target.value)
        filtrado()
    }
    //console.log(checkedArray);
}))

filtrado()
}

dataFromApi()


const nuevosCheckbox=()=>{
    var checkboxes= document.getElementById('checkboxes') 
    var categoriasAll= eventos.events.map(eventos=>eventos.category) 
    //console.log(categoriasAll);

    var eliminarRepetidas= new Set(categoriasAll) 
    //console.log(eliminarRepetidas);
    var categorias= [...eliminarRepetidas] 
    //console.log(categorias);

    var imputCheckbox="" 
    categorias.forEach(category=>{     
        imputCheckbox+=`
        <label><input class="busqueda-check" type="checkbox" value="${category}"> ${category}</label> `
    })
    checkboxes.innerHTML=imputCheckbox 

    var id=1
    eventos.events.map(eventos=>eventos.id=id++)
    
}

//IMPUT SEARCH
var input=document.getElementById('search')
input.addEventListener('keyup', (evento)=>{
    inputSearch= evento.target.value//lo que el usuario escribe
    //console.log(inputSearch);
    filtrado()
})


function filtrado(){
   
    let arrayCheck=[]
    if(checkedArray.length>0 && inputSearch !==""){
        checkedArray.forEach(category=>{
            arrayCheck.push(...eventos.events.filter(eventos=>eventos.name.toLowerCase().includes(inputSearch.trim().toLowerCase())&& eventos.category==category))
        })
    }
    else if(checkedArray.length>0 && inputSearch ===""){
        checkedArray.forEach(category=>{
            arrayCheck.push(...eventos.events.filter(eventos=>eventos.category==category))
    })
    }
    else if(checkedArray.length==0 & inputSearch !==""){
        arrayCheck.push(...eventos.events.filter(eventos=>eventos.name.toLowerCase().includes(inputSearch.trim().toLowerCase())))
    }
    
    else{arrayCheck.push(...eventos.events)}
    
    
    displayCards(arrayCheck)
    
}
//4 opciones:
//1-que los dos tenga valores(1 check tildado y 1 busqueda)
//2-que el check esta tildado y la busqueda este vacia
//3- que el check no tenga nada y la busqueda si
//4- que ninguno de los dos tenga nada
function displayCards(arrayCheck){
    var cards= document.querySelector('#maincards')
    var templateHtml=''
    
    if(arrayCheck.length !==0 ){
        for(var i=0; i< arrayCheck.length; i++ ){
            templateHtml+=`
            <div class="col-12 col-sm-12 col-md-6 col-xl-4 col-xxl-3 d-flex justify-content-center">
            <div class="card-borde">
                <div>
                <img class="card-img-top" src=${arrayCheck[i].image}>
                </div>
                <div class="card-body">
                    <div class="card-info">
                        <h3 class="card-title">${arrayCheck[i].name}</h3>
                        <p class="card-subtitulo">Date: ${arrayCheck[i].date}</p>
                        
                    </div>
                </div>
                <div class="card-price-vermas">
                        <h4 class="price">Price:$${arrayCheck[i].price}</h4>
                        <a href="./details.html?id=${arrayCheck[i].id}" class="btn btn-secondary">See more</a>
                </div>
            </div>
        </div>
        `
        
        }
    }
    else{cards.innerHTML=templateHtml=` <div class="alert alert-secondary" role="alert">
                                             <h3 class="h3-Noresults">No results were found for your search</h3>
                                        </div>`}
    
    cards.innerHTML=templateHtml
}




    

    





















  
