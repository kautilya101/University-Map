
let unis = [];

const fetchdata = async () => {
    url = 'http://localhost:4800/v1/data/unis'
    let data = await fetch(url);
    let response = await data.json()
    console.log(response);
    // let locationObj = {}
    loadData(response);
}

const fetchunis = async (course,control) => {
    url = `http://localhost:4800/v1/data/unisfiltered/?control=${control}&course=${course}`;
    let data = await fetch(url);
    let response = await data.json()
    loadDataIn(response);
}

const submit = document.querySelector('#submitBtn');
submit.addEventListener("click", (e) => {
    e.preventDefault();
    const courses = document.querySelector('#courses');
    const control = document.querySelector('#control');
    // window.location.href = `http://127.0.0.1:5500/assessmentEx2/client/?control=${control.value}&course=${courses.value}`;
    fetchunis(courses.value,control.value);
  });
  

async function fetchCourse(){
    let url = 'http://localhost:4800/v1/data/unisdata';
    let data = await fetch(url);
    let response = await data.json();
    console.log(response);
    var select = document.querySelector('#courses');
    var opt = document.createElement("option");
        opt.textContent = 'None';
        opt.value = 'None';
        select.appendChild(opt);

    for(let item in response) {
        var val = response[item].creddesc;
        console.log(val);
        var opt = document.createElement("option");
        opt.textContent = val;
        opt.value = val;
        select.appendChild(opt);
    }
}

async function fetchinst(){
    let url = 'http://localhost:4800/v1/data/unis';
    let data = await fetch(url);
    let response = await data.json();
    console.log(response);
    let  select = document.querySelector('#inst');
    response.sort();
    for(let item in response) {
        var val = response[item];
        console.log(val);
        var opt = document.createElement("option");
        opt.textContent = val;
        opt.value = val;
        select.appendChild(opt);
    }
}


async function fetchtype(){
    let url = 'http://localhost:4800/v1/data/unistype';
    let data = await fetch(url);
    let response = await data.json();
    console.log(response);
    var select = document.querySelector('#control');
    var opt = document.createElement("option");
        opt.textContent = 'None';
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
    for(let item in data){
        location_search = data[item].instnm;   
        let api = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location_search}.json?access_token=pk.eyJ1Ijoia2F1dGlseWExMDEiLCJhIjoiY2xlY255bHhhMDA2ZzQzbno3M2N2eGtheiJ9.8Lq-s3jWtnJCw6jR0zH3dw`
        let apiData = await fetch(api);
        let apiResponse = await apiData.json();
        data[item]['long'] = await Number(apiResponse.features[0].center[0]);
        data[item]['lat'] = await Number(apiResponse.features[0].center[1]);
        console.log(data[item]);
    }
    // console.log(data);
    addMarker(data);
    }
    catch(err){
        console.log(`error in finding location ${err}`);
    }
    

}
async function loadData(data){
    let newobj = {};
    try{
    for(let item in data){
        location_search = data[item];   
        let api = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location_search}.json?access_token=pk.eyJ1Ijoia2F1dGlseWExMDEiLCJhIjoiY2xlY255bHhhMDA2ZzQzbno3M2N2eGtheiJ9.8Lq-s3jWtnJCw6jR0zH3dw`
        let apiData = await fetch(api);
        let apiResponse = await apiData.json();
        let coordinates = {}
        coordinates['long'] = await Number(apiResponse.features[0].center[0]);
        coordinates['lat'] = await Number(apiResponse.features[0].center[1]);
        
        newobj[location_search] = coordinates;
        // console.log(`${data[item]} : ${coordinates.long} ${coordinates.lat}`)
    }
    }
    catch(err){
      console.log(`error in finding location ${err}`);
    }
    console.log(newobj);
    addMarker(newobj);
}

function addMarker(response){
    const map = new mapboxgl.Map({
        container: 'map',
        // projection: 'naturalEarth',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [12.550343, 55.665957],
        zoom: 3
      });
    for(let item in response){
        const markList = document.createElement('div');
        markList.className = 'markList'
        const mark = document.createElement('div');
        mark.className = 'marker';
        markList.appendChild(mark);
        // try{
        new mapboxgl.Marker(markList)
        .setLngLat([response[item].long,response[item].lat])
        .setPopup(
            new mapboxgl.Popup({offset: 25})
            .setHTML(
                `<h3>${response[item].instnm}</h3>`
            )
        )
        .addTo(map)   
    }
}



// fetchinst();
fetchtype();
fetchCourse();
// fetchdata();