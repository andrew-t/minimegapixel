// https://davidwalsh.name/resize-image-canvas

var startUpload = once(function startUpload() {
	var target = document.getElementById("drop-target");
	target.addEventListener("dragover", function(e) {
		e.preventDefault();
		target.classList.add('hover');
	}, true);
	target.addEventListener("drop", function(e) {
		e.preventDefault(); 
		loadImage(e.dataTransfer.files[0]);
		target.classList.remove('hover');
	}, true);
	target.addEventListener("dragleave", function(e) {
		e.preventDefault();
		target.classList.remove('hover');
	}, true);
	var input = document.getElementById('upload-input');
	input.addEventListener("change", function(e) {
		e.preventDefault();
		loadImage(input.files[0]);
	}, true);
});

function loadImage(src) {
	// Prevent any non-image file type from being read.
	if (!src.type.match(/image.*/)){
		console.log("The dropped file is not an image: ", src.type);
		return;
	}

	// Create our FileReader and run the results through the render function.
	var reader = new FileReader();
	reader.onload = function(e){
		render(e.target.result);
	};
	reader.readAsDataURL(src);
}

var MAX_HEIGHT = 1000;
function render(src) {
	var image = new Image();
	image.onload = function(){
		var canvas = document.getElementById("upload-target");
		if (image.height > MAX_HEIGHT) {
			image.width *= MAX_HEIGHT / image.height;
			image.height = MAX_HEIGHT;
		}
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		canvas.width = image.width;
		canvas.height = image.height;
		ctx.drawImage(image, 0, 0, image.width, image.height);
		nextStep();
	};
	image.src = src;
}