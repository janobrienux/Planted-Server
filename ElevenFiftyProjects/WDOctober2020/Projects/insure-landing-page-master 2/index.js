let navBtn = document.querySelector(".nav-button");

const toggleMenu = () => {
	document.querySelector(".top").classList.toggle("top-active");
	document.querySelector(".middle").classList.toggle("middle-active");
	document.querySelector(".bottom").classList.toggle("bottom-active");
	document.querySelector(".nav-menu").classList.toggle("active");
};

navBtn.addEventListener("click", () => {
	toggleMenu();
});