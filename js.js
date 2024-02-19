function change_theme(button, theme) {
	document.querySelector("#options .current").classList.remove("current");
	button.classList.add("current");

	document.documentElement.className = "";
	document.documentElement.classList.add(theme, "transitioning");
	setTimeout(function (){
		document.documentElement.classList.remove("transitioning")
	}, 2000);

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

const glitchables = document.querySelectorAll(":is(a,p,button,h1,h2,label,input)");
let glitched_element = null;

function glitch() {
	glitched_element = glitchables[Math.floor(Math.random()*glitchables.length)];
	glitched_element.classList.add("glitch");

	setTimeout(function(){
		glitched_element.classList.remove("glitch");
	}, 20);
}

function apply_random_border_classes() {
	// so two neighbor elements do not have visually the same corner with same shape
	const random_border_elements = document.querySelectorAll(":is(section, img, button, input, textarea)");
	for (let i = 0; i < random_border_elements.length; i++) {
		random_border_elements[i].classList.add("random_slime_"+(i%8 +1));
	}
}
apply_random_border_classes();

function slime_borders() {
	document.documentElement.style.setProperty(
		'--random_radius_'+Math.floor(Math.random()*8+1), Math.floor(Math.random()*5+2) + "em");
}