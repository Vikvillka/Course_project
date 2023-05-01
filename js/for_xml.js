const requestURL = "https://raw.githubusercontent.com/Vikvillka/Course_project/master/xml/for_zone.xml"; 

function Open(){
const xhr = new XMLHttpRequest(); 
 
xhr.open('GET',requestURL , false); 
xhr.send(); 
 
let xmlData = xhr; 
xmlData = (new DOMParser()).parseFromString(xhr.responseText, "text/xml"); 

let hashA = window.location.hash.substring(1);
let zone = xmlData.getElementById(hashA); 

document.getElementById('title').textContent=zone.getElementsByTagName('title')[0].textContent;
document.getElementById('info_about_zone').textContent=zone.getElementsByTagName('info_about_zone')[0].textContent;

document.getElementById('hour_1').textContent=zone.getElementsByTagName('hour_1')[0].textContent;
document.getElementById('hour_2').textContent=zone.getElementsByTagName('hour_2')[0].textContent;
document.getElementById('hour_3').textContent=zone.getElementsByTagName('hour_3')[0].textContent;

document.getElementById('cost_1').textContent=zone.getElementsByTagName('cost_1')[0].textContent;
document.getElementById('cost_2').textContent=zone.getElementsByTagName('cost_2')[0].textContent;
document.getElementById('cost_3').textContent=zone.getElementsByTagName('cost_3')[0].textContent;
let slid = document.querySelector('.slider .carousel');

			function changeImages(xmlData) {
				let images = zone.getElementsByTagName("slider");
				for (let i = 0; i < images.length; i++) {
					let imageUrl = images[i].textContent;
					let imageElement = slid.getElementsByTagName("img")[i];
					imageElement.setAttribute("src", imageUrl);
				}
			};
	changeImages(xmlData);
	
for (let i = 0; i < 8; i++){
 
    
    document.getElementById("li_content_" + (i+1)).textContent=zone.getElementsByTagName("li_content")[i].textContent;
  
};


}

window.addEventListener('hashchange', Open);
Open();
