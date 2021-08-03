const xlsxj = require("xlsx-to-json-lc");

xlsxj({
	input: "./cupboard.xlsx",
	output: "output.json"
}, function(err, result) {
	if(err) {
	  console.error(err);
	}else {
	  //console.dir(result);
	}
});