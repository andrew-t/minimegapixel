function startCrop() {
	var image = document.getElementById('upload-target'),
		cropper = new Cropper(image, {
			aspectRatio: width / height,
			viewMode: 1
		});
	document.getElementById('crop-button')
		.addEventListener('click', function(e) {
			resize(cropper.getCroppedCanvas());
			e.preventDefault();
		});
	
	function resize(canvasIn) {
		var image = new Image();
		image.onload = function(){
			var canvas = document.getElementById("cropped-image");
			image.width = width;
			image.height = height;
			var ctx = canvas.getContext("2d");
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			canvas.width = image.width;
			canvas.height = image.height;
			ctx.drawImage(image, 0, 0, image.width, image.height);
			nextStep();
		};
		image.src = canvasIn.toDataURL();
	}
}