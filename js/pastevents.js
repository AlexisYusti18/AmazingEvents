let eventos=[]
let checkedArray=[] 
let inputSearch='' 

async function dataFromApi(){
    await fetch("https://amazing-events.herokuapp.com/api/events")
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
}))

filtrado()
}

dataFromApi()


const nuevosCheckbox=()=>{
    var checkboxes= document.getElementById('checkboxes') 
    var categoriasAll= eventos.events.map(eventos=>eventos.category) 

    var eliminarRepetidas= new Set(categoriasAll) 
    var categorias= [...eliminarRepetidas] 

    var imputCheckbox="" 
    categorias.forEach(category=>{     
        imputCheckbox+=`
        <label><input class="busqueda-check" type="radio" value="${category}"> ${category}</label> `
    })
    checkboxes.innerHTML=imputCheckbox 

    var id=1
    eventos.events.map(eventos=>eventos.id=id++)
    
}

//IMPUT SEARCH
var input=document.getElementById('search')
input.addEventListener('keyup', (evento)=>{
    inputSearch= evento.target.value
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

function displayCards(arrayCheck){
    var cards= document.querySelector('#maincards')
    var templateHtml=''
    
    if(arrayCheck.length!==0){
        for(var i=0; i< arrayCheck.length; i++ ){
            if (arrayCheck[i].date < eventos.currentDate){ 
    
            templateHtml+=`
            
            <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 d-flex justify-content-center align-items-center center">
            <div class="card-borde">
                <div class="img-ctn">
                    <img class="card-img-top" src=${arrayCheck[i].image}>
                </div>
                <div class="card-body">
                        <h3 class="card-title">${arrayCheck[i].name}</h3>
                        <p class="card-subtitulo">Date: ${arrayCheck[i].date}</p>                        
                </div>
                <div class="card-price-vermas">
                        <h4 class="price">$${arrayCheck[i].price}</h4>
                        <a href="./details.html?id=${arrayCheck[i].id}" class="btn-cards">See more</a>
                </div>
            </div>
        </div>
        `
        
        } 
    } 
    } else{cards.innerHTML=templateHtml=`<div class="alert alert-secondary" role="alert">
                                            <h3 class="h3-Noresults">THERE ARE NO RESULTS FOR YOUR SEARCH</h3>
                                         </div>`}
    
    cards.innerHTML=templateHtml
}
