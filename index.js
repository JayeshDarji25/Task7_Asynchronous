let fr = document.getElementById("frm");
let id = document.querySelector("input");
const imgg = document.querySelector('#image');
const lod = document.querySelector("#loading");

console.log("Start");

async function details(e){
    imgg.removeAttribute("src");

    try {
        document.querySelector(".info").style.opacity = 1;
        document.getElementById("err").style.display = "none";
        
        e.preventDefault();
        
        const raw = await fetch(`https://jsonplaceholder.typicode.com/users/${id.value}`);
        const data = await raw.json();
        const {name,email,phone,website,  address: {city,street,zipcode, geo:{lat,lng} }} = data;
        document.getElementById("uname").innerText = `Name: ${name}`;
        document.getElementById("email").innerText =`Email: ${email}`;
        document.getElementById("contact").innerText = `contact: ${phone}`;
        document.getElementById("website").innerText = `website: ${website}`;
        document.getElementById("city").innerText = `city: ${city}`;
        document.getElementById("street").innerText = `Street: ${street}`;
        document.getElementById("zipcode").innerText = `zipcode: ${zipcode}`;
        document.getElementById("location").innerText = `Location: lat: ${lat} & lng: ${lng}`;
        

    } catch (err) {
        console.log("Some error occured");
        document.getElementById("uname").innerText = "";
        document.getElementById("email").innerText ="";
        document.getElementById("contact").innerText = "";
        document.getElementById("website").innerText = "";
        document.getElementById("city").innerText = "";
        document.getElementById("street").innerText = "";
        document.getElementById("zipcode").innerText = "";
        document.getElementById("location").innerText = "";
        document.getElementById("err").style.display = "block";
        document.querySelector(".info").style.opacity = 0; 
        lod.innerText = "";
    }
    
    //Promise

    console.log("Middle");

    const fetchWithPromise = new Promise( (res,rej) => {
        

        if(id.value>10 || id.value<1)  rej("Some Error in Promise");
        else {
            lod.innerText = "Loading..."; 
            setTimeout(() => {
                console.log("inside promise settimout");

                res(fetch(`https://jsonplaceholder.typicode.com/photos/${id.value}`)); 
            },1000);
            console.log("inside promise");
        }    
    });
    fetchWithPromise.then( response => { return response.json() })
    .then( imgData => {
        const {thumbnailUrl} = imgData;
        imgg.setAttribute("src",thumbnailUrl);
        console.log("inside then");
        imgg.addEventListener("load", (e)=> {
            lod.innerText = "";
        })
    })
    .catch( (e) => {
        console.log(e);
        imgg.removeAttribute("src");
        lod.innerText = "";
    })

    /* fetch json 
    const url = `https://jsonplaceholder.typicode.com/photos/${id.value}`;
    fetch(url).then( (response) => response.json())
    .then( imgData => {
        const {thumbnailUrl} = imgData;
        imgg.setAttribute("src",thumbnailUrl);
        imgg.addEventListener("load", (e)=> {
            lod.innerText = "";
        })
    })
    .catch( (e) => {
        console.log(e);
        imgg.removeAttribute("src");
        lod.innerText = "";
    })
    .finally(() => console.log("All Done"));
    */

    /*Async Await
    const url = `https://jsonplaceholder.typicode.com/photos/${id.value}`;
    const myPromise = async () => {
        const response = await fetch(url);
        const data = await response.json();
        const {thumbnailUrl} = data;
        imgg.setAttribute("src",thumbnailUrl);
        imgg.addEventListener("load", (e)=> {
            lod.innerText = "";
        })
    }
    myPromise().catch( e => {
        console.log(e);
        imgg.removeAttribute("src");
        lod.innerText = "";
    })
    */
}


//console.log are used for event loop demonstrate

fr.addEventListener("submit", details);


console.log("End");