function change_theme(button) {
	let theme = button.dataset.theme;
	if(localStorage.getItem("theme") == theme){
		return false;
	}
	document.querySelector("#options .current").classList.remove("current");
	button.classList.add("current");

	document.documentElement.className = theme;

	localStorage.setItem("theme", theme);

	theme_based_actions()
}

const glitchables = document.querySelectorAll(":is(span,img,a,p,button,h1,h2,label,input)");
let glitched_element = glitchables[0];
function glitch() {
	if(Math.random()>.5){
		return
	}
	glitched_element.classList.remove("glitch");
	glitched_element = glitchables[Math.floor(Math.random()*glitchables.length)];

	glitched_element.classList.add("glitch");
	setTimeout(function(){
		glitched_element.classList.remove("glitch");
	}, 550);
}

const slime_elements = Array.from(document.querySelectorAll('section, img, button, input, textarea'));
function slime_borders() {
	const random_half = slime_elements
	.sort(() => Math.random() - 0.5)
	.slice(0, Math.floor(slime_elements.length / 2));

	random_half.forEach(element => {
		element.style.setProperty(
			'--variable_radius_'+Math.floor(Math.random()*4+1),
			(Math.random()*6+1) + "em");
	});
}

let noir_light = {x: 100, y: 200}
function noir_mouse_events(event) {
	noir_light.x  = event ? event.clientX : noir_light.x;
	noir_light.y = event ? event.clientY : noir_light.y;

	document.documentElement.style.setProperty('--light_x', noir_light.x+window.scrollX + "px");
	document.documentElement.style.setProperty('--light_y', noir_light.y+window.scrollY + "px");

	document.querySelectorAll("section,img,button,input,textarea,h1,h2,p").forEach(element => {
		let rect = element.getBoundingClientRect()
		let distanceX = noir_light.x - (rect.left + rect.width/2);
		let distanceY = noir_light.y - (rect.top + rect.height/2);

		if((distanceX*distanceX+distanceY*distanceY)<300000){
			// check distance to affect just those near enough, too much lag otherwise
			element.style.setProperty('--distanceX_from_mouse', distanceX + "px");
			element.style.setProperty('--distanceY_from_mouse', distanceY + "px");
		}
	});
}

let loop_timer = null
function theme_based_actions() {
	let theme = localStorage.getItem("theme")
	clearInterval(loop_timer)

	if(theme == "cyber"){
		loop_timer = setInterval(glitch, 1010);
	}
	if(theme == "slime"){
		loop_timer = setInterval(slime_borders, 1010);
	}
	if(theme == "noir"){
		document.addEventListener("mousemove", noir_mouse_events)

		function update_without_mouse() {
			noir_mouse_events()
		}

		window.addEventListener("scroll", update_without_mouse);
		window.addEventListener("resize", update_without_mouse);

		update_without_mouse();
	}else{
		document.removeEventListener("mousemove", noir_mouse_events);
		window.removeEventListener("scroll", update_without_mouse);
		window.removeEventListener("resize", update_without_mouse);
	}
}
theme_based_actions()