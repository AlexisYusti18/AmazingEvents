let eventos=[]

async function cardsId(){
       await fetch('https://amazing-events.herokuapp.com/api/events')
        .then(response=>response.json())
        .then(json=>eventos=json)
        
        var idEvents = 1
        eventos.events.map(eventos=> eventos.id = idEvents++)
        
        var id=location.search.split('?id=').filter(Number) 
        var selectedId= Number(id[0])
        var eventos= eventos.events.find((eventos)=>{
            return eventos.id==selectedId
        })
        
        var templateHtml=`
            <div class="card-details">
                <img class="img-details" src="${eventos.image}">
                <div class="card-textos">
                    <div class="card-body-details">
                        <div class="h3-titulo">
                            <h3 class="h3-details">${eventos.name}</h3>
                        </div>
                        <p class="p-details-des">${eventos.description}</p>
                        <p class="p-details">Capacity: ${eventos.capacity}</p>
                        <p class="p-details">Place: ${eventos.place}</p>
                        <p class="p-details">Assistance: ${eventos.assistance !== undefined ? eventos.assistance:'No attendance data'} </p>
                        <p class="p-details">Category: ${eventos.category}</p>
                        <p class="p-details">Estimate: ${eventos.estimate !== undefined ? eventos.estimate:"No estimate data"}</p>
                    </div>
                </div>
                <div class="p-details-price">
                    <p class="p-price">Price: $${eventos.price}</p>
                </div>
    
            </div>
         `
        document.querySelector('#maincards').innerHTML = templateHtml
    }
  cardsId()



