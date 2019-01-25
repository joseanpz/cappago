// require html2canvas
// require jsPDF

// to be used
function genPDF() {
	html2canvas(document.getElementById("my-pdf-div"), {
		onrendered: function (canvas) {
			var img = canvas.toDataURL("image/url");
			var doc = new jsPDF();
			doc.addImage(img, 'JPEG', 20, 20);
			doc.save('test.pdf');
		}
	});
}