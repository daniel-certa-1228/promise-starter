console.log( "lego-factory.js" );

"use strict";

var Legos = ( (originalLegos) => {

	let legoItems = [];

	let parseData = (data) => {
		data.LegoColorss.forEach ((element) => {
			legoItems.push(element);
		})

		return legoItems;
	}

	originalLegos.getLegos = () => {
		return legoItems;
	}

	originalLegos.loadLegos = () => {
		return new Promise((resolve, reject) => {
			let request = new XMLHttpRequest();
			request.onload = function () {
				if (request.status === 200) {
					//success
					let data = JSON.parse(request.responseText);
					// console.log( "data", data );
					resolve(parseData(data));
					// resolve(request.responseText)
					// console.log( "newData", responseText );
				}  else  {
					//something went wrong
					reject(new Error("XMLHttpRequest Error", request.statusText))
				}
			};

			request.open("GET", "../lego-colors.json")
			request.send();
		});
	};

	return originalLegos;

})(Legos || {})