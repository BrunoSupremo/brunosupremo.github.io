const element_list = document.querySelectorAll(":is(a,p,button,h1,h2,img)");
let glitched_element = null;

function glitch() {
	glitched_element = element_list[Math.floor(Math.random()*element_list.length)];
	glitched_element.classList.add("glitch");

	setTimeout(unglitch, 20);
	setTimeout(glitch, 1000);
}
function unglitch() {
	glitched_element.classList.remove("glitch");
}

glitch();