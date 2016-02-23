var q1 = new q_con("What is 2 * 2",["5","6","7"],"4",0);
var q2 = new q_con("What programming langues is the best",["Python","C#","C++"],"Javascript",0);
var q3 = new q_con("What is an int",["Its a text","Its a ballon","Its somthing cool"],"Its a number",0);
var q4 = new q_con("What year is it",["2015","2014","2017"],"2016",0);
var q5 = new q_con("What month is it",["February","March","April"],"January",0)
var q6 = new q_con("What country is the best",["Norway","England","Sweden"],"Iceland",0)
/*SETJA ALLT I ARRAY ÞANNIG ÞÆGINLEGRA ER AÐ VINNA UR ÞESSU*/
var allq = [q1,q2,q3,q4,q5,q6];
/*BYRJANDA STAÐURINN OG HVERSU LANGT ER KOMIÐ*/
var stats = 0;
var start = Math.floor((Math.random() * 6));
/*SVÖRINN*/
var awnsersarray = ["","","","","",""];
/* TELJARI FYRIR */
var rightawnser = 0;
/*TIL AÐ GET BACKTRACKAÐ OG FARIÐ AFTUR FRAMM EF BUIÐ ER AÐ RANDOMIZA SPURNINGUNA*/
var laststuff = [];
/*OJBECT CONTRUCTOR*/
function q_con(question,awnsers,rightawnser,did) {
	this.q = question;
	this.a = awnsers;
	this.r = rightawnser;
	this.d = did;
}
/*Þetta er functionið sem byr til questionsins, svo er annað til að fara aftur á bak enn það væri hægt að sameina þau, bara hugsaði ekki nogu vel úti þetta. Og tíma eyðsla að breyta nuna*/
function createrad(q) {
	clearrad();
	isitrue = false;
	for (var i = 0; i < laststuff.length; i++) {
		if (laststuff[i][0] == start) {
			var rnd = laststuff[stats][1];
			var rndstart = laststuff[stats][2]
			isitrue = true;
		};
	}
	if (!isitrue) {
		var rnd = Math.floor((Math.random() * q.a.length)+1);
		var rndstart = Math.floor((Math.random() * (rnd+1)));
		laststuff.push([start,rnd,rndstart]);
	}
	var nums = 0
	for (var i = 0; i <= rnd; i++) {
		if (i == rndstart) {
			if (awnsersarray[start] == q.r) {
				creatingrad(q.r,true);
			} else {
				creatingrad(q.r);
			}
		} else {
			if (awnsersarray[start] == q.a[nums]) {
				creatingrad(q.a[nums],true);
			} else {
				creatingrad(q.a[nums]);
			}
			nums += 1;
		}	};
}
/*Þetta byr til takkana í alvöru*/
function creatingrad(string,hehe) {
	var div = document.createElement("div");
	var h2 = document.createElement("h2");
	div.id = "none";
	h2.innerHTML = string;
	div.appendChild(h2);
	if (hehe) {
		div.className = "selected";
		div.id = "selected";
	} else {
		div.className = "awnsers";
	}
	div.onclick = function() {
    	if (div.id == "none"){
    		var elements = document.getElementById("selected");
    		if (elements) {
    			elements.id = "none";
				elements.className = "awnsers";
    		};
    		div.id = "selected";
    		div.className = "selected";
    	} else if (div.id == "selected") {
    		div.id = "none";
    		div.className = "awnsers";
    	};
	}
	document.getElementById("rads").appendChild(div);
}
/*Þetta eyðir út öllum fyrirverandi tökkum*/
function clearrad() {
	var div = document.getElementById("rads");
	while(div.firstChild){
    	div.removeChild(div.firstChild);
	}
}
/*initalize inn gerir svona dót sem er nice til að byrja með*/
function init() {
	document.getElementById("q").innerHTML = allq[start].q;
	createrad(allq[start]);
	document.getElementById("button").onclick = function() {
		var elements = document.getElementById("selected");
		if (elements) {
			awnsersarray[start] = elements.firstChild.innerHTML;
			if (stats == awnsersarray.length-2) {
				document.getElementById("buttonn").innerHTML = "Finish exam";
			} 
			if (stats == awnsersarray.length-1) {
				// Here are the Questions over
				Score();
			} else {
				stats += 1;
				if (start == awnsersarray.length-1) {
					start = 0;
				} else {
					start += 1;
				}
				nextq();
			}
		} else {
			alert("Please pick an awnser")
		}
	}
	document.getElementById("back").onclick = function() {
		document.getElementById("buttonn").innerHTML = "Next Question";
		if (stats == 0) {
			alert("This is the first Question");
		} else {
			if (start == 0) {
				start = 5
			}else {
				start -= 1;
			}
			stats -= 1;
			lastq(allq[start]);
			document.getElementById("q").innerHTML = allq[start].q;
		}
	}
}
/*Þetta er það sem er hægt að sameina með createrad, þetta vinnur úr lastrnd og setur upp gömlu spurningarnar*/
function lastq(q) {
	clearrad();
	var nums = 0
	for (var i = 0; i < laststuff.length; i++) {
		if (laststuff[i][0] == start) {
			var rnd = laststuff[stats][1];
			var rndstart = laststuff[stats][2]
			isitrue = true;
		};
	}
	for (var i = 0; i <= rnd; i++) {
		if (i == rndstart) {
			if (awnsersarray[start] == q.r) {
				creatingrad(q.r,true);
			} else {
				creatingrad(q.r);
			}
		} else {
			if (awnsersarray[start] == q.a[nums]) {
				creatingrad(q.a[nums],true);
			} else {
				creatingrad(q.a[nums]);
			}
			nums += 1;
		}
	};
}
/*milliliður til að gera næstu spurningu utaf það er ekki hægt að hafa initilze sem það*/
function nextq() {
	document.getElementById("q").innerHTML = allq[start].q;
	createrad(allq[start]);
}
/*Þetta vinnur úr gögnum og kikjir hvort eitthvað sé rétt og segjir svo hversu mikið rétt var*/
function Score() {
	var div = document.getElementById("Box");
	while(div.firstChild){
    	div.removeChild(div.firstChild);
	}
	for (var i = 0; i < allq.length; i++) {
		if (awnsersarray[i] == allq[i].r) {
			rightawnser += 1;
		};
	}
	var h1 = document.createElement("h1");
	h1.innerHTML = "You got " + rightawnser + " of " + (allq.length) + " Questions";
	document.getElementById("Box").appendChild(h1);
}
/*Kveikjir bara á init og byrjar allt forritið*/
init();

