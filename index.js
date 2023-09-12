let fr = document.getElementById("frm");

async function datafunc(e){
    try {
        document.querySelector(".info").style.opacity = 1;
        document.getElementById("err").style.display = "none";

        e.preventDefault();
        let id = document.querySelector("input");
        const raw = await fetch(`https://jsonplaceholder.typicode.com/users/${id.value}`);
        const data = await raw.json();
        console.log(data);
        const {name,email,phone,website,  address: {city,street,zipcode, geo:{lat,lng} }} = data;
        document.getElementById("uname").innerText = `Name: ${name}`;
        document.getElementById("email").innerText =`Email: ${email}`;
        document.getElementById("contact").innerText = `contact: ${phone}`;
        document.getElementById("website").innerText = `website: ${website}`;
        document.getElementById("city").innerText = `city: ${city}`;
        document.getElementById("street").innerText = `Street: ${street}`;
        document.getElementById("zipcode").innerText = `zipcode: ${zipcode}`;
        document.getElementById("location").innerText = `Location: lat: ${lat} & lng: ${lng}`;
        const imgg = document.querySelector('#image');
        const lod = document.querySelector("#loading");
        lod.innerText = "Loading...";
        const raw2 = await fetch(`https://jsonplaceholder.typicode.com/photos/${id.value}`);
        const data2 = await raw2.json();
        const {thumbnailUrl} = data2

        
        imgg.setAttribute("src",thumbnailUrl);
        imgg.addEventListener("load", (e)=> {
            lod.innerText = "";
        })

    } catch (e) {
        document.getElementById("err").style.display = "block";
        document.querySelector(".info").style.opacity = 0;
        document.querySelector("#image").removeAttribute("src");
    }
    
}

fr.addEventListener("submit", datafunc);