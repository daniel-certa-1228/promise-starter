console.log( "main.js" );

"use strict";

let greetingPromise = () => {
	new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve("World")
		}, 2000);
	})
	.then((resolve) => {
		console.log( "resolve", resolve );
	})
}

greetingPromise()
console.log( "Hello" );

///////////////////////////////////////////////

let showItems = (legosData) => {

	let legoDisplay = document.getElementById("lego-display");
	legosData.forEach((lego) => {
		let legoBlock = buildLego(lego);
		legoDisplay.innerHTML += legoBlock;
	})
}

let buildLego = (lego) => {
    //building a string to create the visual display

    //each seperated by comma
    let block = "",
        wrapper = `<section class="block-wrapper" style="border: 2px solid #000000; background-color:#${lego.ColorHex}">`,
        title = `<h3>Name: ${lego.LegoName}</h3>`,
        years = `<div class="block-years">Manufactured ${lego.YearFrom} - ${lego.YearTo}</div>`;
        // image = `<div class="card-img" style="background-image: url('images/${car.image}')"></div>`,
        let link = lego.ColorstreamLinkImage;
        if (link){
            block += `<a href="${link}">${wrapper + title + years}</section></a>`;
        }else{
            block += `${wrapper + title + years}</section>`;
        }
      return block;
}

//Version 1

// let colorPromise = Legos.loadLegos()
// .then(
// 	(resolve) => {
// 		//do some stuff
// 		let newItem = {LegoName: "Brenda's Pick", ColorHex: "a3a3d1", YearFrom: "2009", YearTo: "Present"}
// 		resolve.push(newItem);
// 		showItems(resolve);
// 	},
// 	(reject) => {
// 		console.error( "OOPS", reject );
// 		// do something else here - backup plan
// 	})

//Version 2 with additional .then 

let colorPromise = Legos.loadLegos()
.then(
	(resolve) => {
		let newItem = {LegoName: "Brenda's Pick", ColorHex: "a3a3d1", YearFrom: "2009", YearTo: "Present"}
		resolve.push(newItem);
		return resolve;
	},
	(reject) => {
		console.log( "OOPS", reject );
		//backup plan function
	}).then(
	(resolve) => {
		console.log( "One for the road", resolve );
		showItems(resolve)
	},
	() => {
		//default to catch anything
		console.log( "there was an error" );
	})


//Promise All
var p1 = Promise.resolve(3);
// var p1 = Promise.reject("I don't like peas");
var p2 = 1337;
var p3 = new Promise((resolve, reject) => {
	setTimeout(resolve, 1000, 'foo');
});

Promise.all([p3,p1,p2])
.then(
	(resolve) => {
		console.log( "resolve values", resolve );
	},	(reason) => {
		console.log( "reason", reason );
	});

//Promise Race
//as soon as something arrives, it'll do something

var p11 = new Promise((resolve, reject) => {
	setTimeout(resolve, 1000, "one");
})

var p22 = new Promise((resolve, reject) =>{
	setTimeout(resolve, 2000, "two");
})

var p33 = new Promise ((resolve, reject) => {
	setTimeout(resolve, 3000, "three");
})

var p44 = new Promise ((resolve, reject) => {
	setTimeout(resolve, 400, "four");
})

var p55 = new Promise ((resolve, reject) => {
	setTimeout(resolve, 1005, "five");
	// reject("I really hate peas")
})

Promise.race([p11, p22, p33, p44, p55])
.then((winner) => {
	console.log( "winner", winner );
	console.log( "show me the legoArray", Legos.getLegos() );
},
(reject) => {
	console.log( "reject", reject );
})















