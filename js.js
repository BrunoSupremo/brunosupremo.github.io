function change_theme(button) {
	let theme = button.dataset.theme;
	if(localStorage.getItem("theme") == theme){
		return false;
	}
	document.querySelector("#options .current").classList.remove("current");
	button.classList.add("current");

	document.documentElement.className = theme;

	localStorage.setItem("theme", theme);
}

const loop_timer = setInterval(one_second_loop, 1010);
function one_second_loop() {
	//conditionals to avoid running unnecessary lag
	if(document.documentElement.className == "cyber"){
		glitch();
	}
	if(document.documentElement.className == "slime"){
		slime_borders();
	}
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

function apply_random_border_classes() {
	// so adjacent neighbors have different corners settings, avoiding synced animations
	const random_border_sections = document.querySelectorAll("section");
	for (let i = 0; i < random_border_sections.length; i++) {
		random_border_sections[i].classList.add("random_slime_"+(i%8 +1));
	}
	const random_border_elements = document.querySelectorAll(":is(img, button, input, textarea)");
	for (let i = 0; i < random_border_elements.length; i++) {
		random_border_elements[i].classList.add("random_slime_"+(i%8 +1));
	}
}
apply_random_border_classes();

function slime_borders() {
	document.documentElement.style.setProperty(
		'--random_radius_'+Math.floor(Math.random()*8+1), Math.floor(Math.random()*6+1) + "em");
}