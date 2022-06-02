let eventos=[]
let sortPorcentaje;
let sortCapacidad;

async function estadisticaEvento(){
    await fetch('https://amazing-events.herokuapp.com/api/events')
    .then(response=>response.json())
    .then(json=>eventos=json)
    let datoEventos= eventos.events
    //console.log(datoEventos);
    //let fechaActual=eventos.currentDate
    let eventStatistics= datoEventos.filter(evento=>evento.assistance)
    //console.log(eventStatistics);

    eventStatistics.map(e=>{
        var porcentaje= ((e.assistance/e.capacity)*100).toFixed()
        e.porcentaje= porcentaje
        //console.log(porcentaje);
    })
    sortPorcentaje= eventStatistics.sort((a,b)=> b.porcentaje - a.porcentaje)
    //console.log(sortPorcentaje);

    sortCapacidad= eventStatistics.filter(e=>e.capacity).sort((a,b)=> b.capacity - a.capacity)
    //console.log(sortCapacidad);
   
    function PorcentajeCapacidad(sortPorcentaje,sortCapacidad){
        templateHtml=`
                <td class="bordes">${sortPorcentaje[0].name}:${sortPorcentaje[0].porcentaje}%</td>
                <td class="bordes">${sortPorcentaje[sortPorcentaje.length -1].name}: ${sortPorcentaje[sortPorcentaje.length -1].porcentaje} %</td>
                <td class="bordes">${sortCapacidad[0].name}: ${sortCapacidad[0].capacity}</td>
            `
        document.getElementById('tablastatics').innerHTML=templateHtml
    }
    PorcentajeCapacidad(sortPorcentaje,sortCapacidad)
    
}
estadisticaEvento()


async function upcomingEvents(){
    await fetch('https://amazing-events.herokuapp.com/api/events')
    .then(response=>response.json())
    .then(json=>eventos=json)
    //console.log(eventos);
    let datoEventos= eventos.events
    let fechaActual=eventos.currentDate
    //console.log(datoEventos)
    let eventoFuturos=datoEventos.filter(evento=>fechaActual<evento.date)
    //console.log(eventoFuturos);
    var categorias= datoEventos.map(e=>e.category)
    //console.log(category);
    categorias= new Set(categorias)
    //console.log(categorias);
    var categoriasFuturas=[...categorias]
    //console.log(categoriasFuturas);

    let arrayCategory=[] //declaro variable y la inicializo como array
    // a las categorias las mapeo y el array que declare le hago un push en categorias y eventos
    categoriasFuturas.map(category=>
        arrayCategory.push({
            category:category,
            eventos: eventoFuturos.filter(evento=>evento.category===category)
        }))
        //console.log(arrayCategory);

    let datosFuturos=[]
    arrayCategory.map(datos=>{
        datosFuturos.push({
            category:datos.category,
            estimate:datos.eventos.map(e=>e.estimate),
            capacity:datos.eventos.map(e=>e.capacity),
            revenue:datos.eventos.map(e=>e.estimate * e.price)
        })
        
    })

    datosFuturos.forEach(category=>{
        let estimateFuturos= 0
        category.estimate.forEach(estimate=>estimateFuturos+=Number(estimate))
        category.estimate= estimateFuturos
        //console.log(estimateFuturos);
        let capacidadFuturos=0
        category.capacity.forEach(capacity=>capacidadFuturos += Number(capacity))
        category.capacity=capacidadFuturos
        //console.log(capacidadFuturos);
        let revenueFuturos=0
        category.revenue.forEach(revenue=>revenueFuturos += revenue)
        category.revenue=revenueFuturos
        //console.log(revenueFuturos);
        category.porcentajeAsistencia= ((estimateFuturos*100)/capacidadFuturos).toFixed(2)
    })
    //console.log(datosFuturos);
    
    function upcomingTable(){
        templateHtml=`
        <tr>
         <td class="bordes">Categories</td>
         <td class="bordes">Revenue</td>
         <td class="bordes">Percentage Of Attendance</td>
        </tr>`

      datosFuturos.forEach(evento => {
        templateHtml += `
      <tr>
         <td class="bordes">${evento.category}</td>
         <td class="bordes">$${evento.revenue}</td>
         <td class="bordes">${evento.porcentajeAsistencia}%</td>
         
      </tr>
    `
                                               
    })
        document.getElementById('tablaUpcoming').innerHTML=templateHtml
    }
    upcomingTable()

}
upcomingEvents()

async function pastEvents(){
    await fetch('https://amazing-events.herokuapp.com/api/events')
    .then(response=>response.json())
    .then(json=>eventos=json)
    let datoEventos= eventos.events
    let fechaActual=eventos.currentDate
    //console.log(datoEventos)
    let eventoPasados= datoEventos.filter(evento=>fechaActual>evento.date)
    //console.log(eventoPasados);
    var categoriasPasadas= datoEventos.map(e=>e.category)
    //console.log(categoriasPasadas);
    categoriasPasadas= new Set(categoriasPasadas)
    //console.log(categoriasPasadas);
    var categoryPast=[...categoriasPasadas]
    //console.log(categoryPast);

    let arrayCategory=[] //declaro variable y la inicializo como array
    // a las categorias las mapeo y el array que declare le hago un push en categorias y eventos
    categoryPast.map(category=>
        arrayCategory.push({
            category:category,
            eventos: eventoPasados.filter(evento=>evento.category===category)
        }))
        //console.log(arrayCategory);

    let datosPasados=[]
    arrayCategory.map(datos=>{
        datosPasados.push({
            category:datos.category,
            assistance:datos.eventos.map(e=>e.assistance),
            capacity:datos.eventos.map(e=>e.capacity),
            revenue:datos.eventos.map(e=>e.assistance * e.price)
        })
    })
    //console.log(datosPasados);

    datosPasados.forEach(category=>{
        let assistancePasados= 0
        category.assistance.forEach(assistance=>assistancePasados +=Number(assistance))
        category.assistance= assistancePasados
        //console.log(assistancePasados);
        let capacidadPasados=0
        category.capacity.forEach(capacity=>capacidadPasados += Number(capacity))
        category.capacity=capacidadPasados
        //console.log(capacidadPasados);
        let revenuePasados=0
        category.revenue.forEach(revenue=>revenuePasados += revenue)
        category.revenue=revenuePasados
        //console.log(revenuePasados);
        category.porcentajeAsistencia= ((assistancePasados*100)/capacidadPasados).toFixed(2)
    })
    //console.log(datosPasados);
    
    function pastTable(){
        templateHtml=`
        <tr>
         <td class="bordes">Categories</td>
         <td class="bordes">Revenue</td>
         <td class="bordes">Percentage Of Attendance</td>
        </tr>`

      datosPasados.forEach(evento => {
        templateHtml += `
      <tr>
         <td class="bordes">${evento.category}</td>
         <td class="bordes">$${evento.revenue}</td>
         <td class="bordes">${evento.porcentajeAsistencia}%</td>
         
      </tr>
    `
    })
    document.getElementById('tablePast').innerHTML=templateHtml
    }
    pastTable()
}
pastEvents()



