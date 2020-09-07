window.addEventListener('load',()=>{
 let long;
 let lat;
 let tempdesc=document.querySelector(".temp-desc");
 let tempdeg=document.querySelector(".degree");
 let loc=document.querySelector(".loc-tz");
let tempsec=document.querySelector(".temp");
const tempspan=document.querySelector(".temp span");


 if(navigator.geolocation){
   navigator.geolocation.getCurrentPosition(position=>{
   	long= position.coords.longitude;
   	lat=position.coords.latitude;

   	
    const proxy = 'https://cors-anywhere.herokuapp.com/';

    const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
    
       fetch(api)
     .then(response=>{
     	return response.json();
     })
     .then(data=>{
     	//console.log(data);
     	const {temperature, summary, icon}= data.currently;
        tempdeg.textContent=temperature;
        tempdesc.textContent=summary;
        loc.textContent=data.timezone;

        let cel=(temperature-32)*(5/9);

         setIcons(icon, document.querySelector('.icon'));

         tempsec.addEventListener("click",()=>{
         	if(tempspan.textContent==='F'){
         		tempspan.textContent="C";
         		tempdeg.textContent=Math.floor(cel);
         	}
         	else{
         		tempspan.textContent="F";
         		tempdeg.textContent=temperature;
         	}
         })
     });
   });
 }

 function setIcons(icon, iconId){
 	const skycons =new Skycons({color: "white"});
 	const curIcon= icon.replace(/-/g,"_").toUpperCase();
 	skycons.play();
 	return skycons.set(iconId, Skycons[curIcon]);
 }
});
