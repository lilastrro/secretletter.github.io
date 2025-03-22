window.onload = function () {
	var merrywrap = document.getElementById("merrywrap");
	var box = merrywrap.getElementsByClassName("giftbox")[0];
	var step = 1;
	var stepMinutes = [2000, 2000, 1000, 1000];
	function init() {
		box.addEventListener("click", openBox, false);
	}
	function stepClass(step) {
		merrywrap.className = 'merrywrap';
		merrywrap.className = 'merrywrap step-' + step;
	}
	function openBox() {
		if (step === 1) {
			box.removeEventListener("click", openBox, false);
		}
		stepClass(step);
		if (step === 3) {
		}
		if (step === 4) {
			reveal();
			return;
		}
		setTimeout(openBox, stepMinutes[step - 1]);
		step++;
	}

	init();

};

function reveal() {
	document.querySelector('.merrywrap').style.backgroundColor = 'transparent';
	document.getElementById('video').style.zIndex = '999'
	document.getElementById('video').setAttribute('autoplay', '')
	var w, h;
	if (window.innerWidth >= 1000) {
		w = 295; h = 185;
	} else {
		w = 255; h = 155;
	}
}