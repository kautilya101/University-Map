
let body = document.querySelector('body')
let drop = document.querySelector('.dropdown');
body.onclick=()=>{
    let drop = document.querySelector('.dropdown');
    if(drop && drop.style.display!=="none"){
        drop.style.display="none"
    }
}
// body.addEventListener('click',() => {
//     let droplist = document.querySelector('.droplist');
//     droplist.style.display = 'none';
// })

let unis = [];

const fetchdata = async () => {
    url = 'http://localhost:4800/v1/data/unis'
    let data = await fetch(url);
    let response = await data.json()
    loadData(response);
}

const fetchunis = async (course,control) => {
    url = `http://localhost:4800/v1/data/unisfiltered/?control=${control}&course=${course}`;
    let data = await fetch(url);
    let response = await data.json()
    console.log(url);
    loadDataIn(response);
}

const submit = document.querySelector('#submitBtn');
submit.addEventListener("click", (e) => {
    e.preventDefault();
    const courses = document.querySelector('#courses');
    const control = document.querySelector('#control');
    fetchunis(courses.value,control.value);
});
  

async function fetchCourse(){  // fetch all courses
    let url = 'http://localhost:4800/v1/data/unisdata';
    let data = await fetch(url);
    let response = await data.json();
    var select = document.querySelector('#courses');
    var opt = document.createElement("option");
        opt.textContent = 'Courses';
        opt.value = 'None';
        select.appendChild(opt);

    for(let item in response) {
        var val = response[item].creddesc;
        var opt = document.createElement("option");
        opt.textContent = val;
        opt.value = val;
        select.appendChild(opt);
    }
}

document.querySelector('#inst').addEventListener('keyup',search)


function search(){
    let droplist = document.querySelector('.droplist');
    droplist.innerHTML = '';
    let drop = document.createElement('ul');
    drop.className = 'dropdown';
    droplist.appendChild(drop);
    let searchInput = document.querySelector('.search');
    console.log(searchInput.value);
    let flag = 0;
    if(searchInput.value != ''){
        for(let item in newobj){
            if(item.toLowerCase().includes(searchInput.value.toLowerCase()) && item.toLowerCase().indexOf(searchInput.value.toLowerCase())==0){
                let li = document.createElement('li');
                li.innerHTML = item;
                drop.style.display = 'block';
                drop.appendChild(li);
                li.addEventListener('click', () => {
                    let val = li.innerHTML;
                    addunis(val);
                });
                
            }
            
        }
    }
}


async function fetchinst(){ // fetch unis
    let url = 'http://localhost:4800/v1/data/unis';
    let data = await fetch(url);
    let response = await data.json();
    let  select = document.querySelector('#inst');
    for(let item in response) {
        var val = response[item].instnm;
        var opt = document.createElement("option");
        opt.textContent = val;
        opt.value = val;
        select.appendChild(opt);
    }
}

async function fetchinstData(instnm){    // fetch university wise courses
    // const instnm = e.target.value;
    url = `http://localhost:4800/v1/data/instnmData/?instnm=${instnm}`;
    let data = await fetch(url);
    let response = await data.json()
    // loadDataIn(response);
    console.log(response);
    let sidebar = document.querySelector('#sidebar');
    sidebar.innerHTML = "";
    let div = document.createElement('div');
    for(let item in response){
        let el = document.createElement('h3');
        el.innerHTML = "";
        el.innerHTML = '> ' + response[item].creddesc;
        div.appendChild(el);
    }
    sidebar.appendChild(div);
    console.log(newobj[instnm]);
    // addunis(instnm);
}

async function fetchtype(){
    let url = 'http://localhost:4800/v1/data/unistype';
    let data = await fetch(url);
    let response = await data.json();
    console.log(response);
    var select = document.querySelector('#control');
    var opt = document.createElement("option");
        opt.textContent = 'Own Type';
        opt.value = 'None';
        select.appendChild(opt);
    for(let item in response) {
        var val = response[item].control;
        console.log(val);
        var opt = document.createElement("option");
        opt.textContent = val;
        opt.value = val;
        select.appendChild(opt);
    }
}

mapboxgl.accessToken = 'pk.eyJ1Ijoia2F1dGlseWExMDEiLCJhIjoiY2xlY255bHhhMDA2ZzQzbno3M2N2eGtheiJ9.8Lq-s3jWtnJCw6jR0zH3dw';
const map = new mapboxgl.Map({
    container: 'map',
    // projection: 'naturalEarth',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [12.550343, 55.665957],
    zoom: 3
});                                 

async function loadDataIn(data){
    try{
        let map = createMap()
        for(let item in data){   //{instnm : name}
            location_search = data[item].instnm;   
            let api = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location_search}.json?access_token=pk.eyJ1Ijoia2F1dGlseWExMDEiLCJhIjoiY2xlY255bHhhMDA2ZzQzbno3M2N2eGtheiJ9.8Lq-s3jWtnJCw6jR0zH3dw`
            let apiData = await fetch(api);
            let apiResponse = await apiData.json();
            data[item]['long'] = Number(apiResponse.features[0].center[0]);
            data[item]['lat'] = Number(apiResponse.features[0].center[1]);
            addMarker(data[item],map);
        }
    }
    catch(err){
        console.log(`error in finding location ${err}`);
    }
    
}

let newobj = {};
async function loadData(data){ 
    try{
        // console.log(response);
        let newMap = createMap();
        for(let item in data){
            location_search = data[item].instnm;   // 0: name
            let api = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location_search}.json?access_token=pk.eyJ1Ijoia2F1dGlseWExMDEiLCJhIjoiY2xlY255bHhhMDA2ZzQzbno3M2N2eGtheiJ9.8Lq-s3jWtnJCw6jR0zH3dw`
            let apiData = await fetch(api);
            let apiResponse = await apiData.json();
            let coordinates = {};
            data[item]['long'] = coordinates['long'] = Number(apiResponse.features[0].center[0]);
            data[item]['lat'] = coordinates['lat'] = Number(apiResponse.features[0].center[1]);
            newobj[location_search] = coordinates;
            addMarker(data[item],newMap);
        }
    }
    catch(err){
      console.log(`error in finding location ${err}`);
    }
    // addMarker(data);
}

function createMap(){
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [12.550343, 55.665957],
        zoom: 3
      });
    return map;
}

function addunis(response){
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [newobj[response].long,newobj[response].lat],
        zoom: 3
      });
        const markList = document.createElement('div');
        markList.className = 'markList'
        const mark = document.createElement('div');
        mark.className = 'marker';
        markList.appendChild(mark);
        let marker = new mapboxgl.Marker(markList)
        .setLngLat([newobj[response].long,newobj[response].lat])
        .setPopup(
            new mapboxgl.Popup({offset: 25})
            .setHTML(
                `<h3>${response}</h3>`
            )
        )
        .addTo(map)  
        let markerel = marker.getElement()
        markerel.addEventListener('click',() =>{
            fetchinstData(response);
            console.log('working fine');
        }) 
}



function addMarker(response,map){
    // console.log(response);
    // const map = new mapboxgl.Map({
    //     container: 'map',
    //     style: 'mapbox://styles/mapbox/streets-v11',
    //     center: [12.550343, 55.665957],
    //     zoom: 3
    //   });
        const markList = document.createElement('div');
        markList.className = 'markList'
        const mark = document.createElement('div');
        mark.className = 'marker';
        markList.appendChild(mark);
        let marker = new mapboxgl.Marker(markList)
        .setLngLat([response.long,response.lat])
        .setPopup(
            new mapboxgl.Popup({offset: 25})
            .setHTML(
                `<h3>${response.instnm}</h3>`
            )
        )
        .addTo(map)   
        let markerel = marker.getElement()
        markerel.addEventListener('click',() =>{
            fetchinstData(response.instnm);
            console.log('working fine');
        })
    
}

// function addMarker(response){
//     console.log(response);
//     const map = new mapboxgl.Map({
//         container: 'map',
//         style: 'mapbox://styles/mapbox/streets-v11',
//         center: [12.550343, 55.665957],
//         zoom: 3
//       });
//     for(let item in response){
//         const markList = document.createElement('div');
//         markList.className = 'markList'
//         const mark = document.createElement('div');
//         mark.className = 'marker';
//         markList.appendChild(mark);
//         // try{
//         let marker = new mapboxgl.Marker(markList)
//         .setLngLat([response[item].long,response[item].lat])
//         .setPopup(
//             new mapboxgl.Popup({offset: 25})
//             .setHTML(
//                 `<h3>${response[item].instnm}</h3>`
//             )
//         )
//         .addTo(map)   
//         let markerel = marker.getElement()
//         markerel.addEventListener('click',() =>{
//             fetchinstData(response[item].instnm);
//             console.log('working fine');
//         })
//     }
// }

// fetchinst(); 
fetchtype();
fetchCourse();
fetchdata();