/* 
Bernhard Linn Hilmarsson
THE ACTUALL APP 

//Hlutir til að completea
1. // Tjékk
2. // Tjékk
3. // Tjékk
4. Notandi á að geta notað lyklaborð og mús -vantar

5. Svör validation kemur þegar sýnt er scorið //Animations og effects - vantar
 
6. Sýna rétt/Spurningum þannig þú getur vitað scorið - vantar

7. Fokkit útlit er seinni tíma vandmál í mínum heimi // RANGT

8. Myndi seigja að kóðinn sjé vel uppsettur, það eru 2 stórar skipanir sem eru það því
ég nota svo mikið af dom skipunum til að búa til tög, Svo er eitt stórt function enn það er ekkert vit
í að splitta því upp.   //Tjékk


* Láttu svarmöguleikar birtast handahófskennt með spurningu // Working on it
• Web storage API til að vista score notanda í vaframinnið. // Mun nota cookies
• Bættu við niðurteljara ásamt refsingu. // Working on it
• Back takki til að breyta val á svarmöguleika //Tjékk
• Swipe til að sleppa spurningu // Sure working on it
• object literal structure fyrir kóðauppsetningu // Tjékk

//To much dom vinsla

// TODO LIST
	* Gefa notanda kleyft að skrá nafn og email, svo þegar hann getur valið tests að breyta þeim
	* Leyfa notanda að henda sér aftur inná síðuna til að taka fleirri test
	* Hafa þar sem maður velur test valmöguleika á því að sýna scorin sín - Read from cookies
	* Savea með cookies
	* Sýna alltaf highscore eftir hvert test
	* Setja inn allavega svona 10 tests

// Mögulega
	* Gefa notanda kleyft að ratea tests //Hann sjálfur mun bara sjá rateingið sitt
	* Gera notanda kleyft að búa til test

*/


//A function that takes in the questins and user details and runs the whole app
function start(allq,UserDetails) {
	//This is the Constructor for the user
	function User(Name , Email) {
		this.name = Name;
		this.email = Email;
		this.score = 0;
		this.awnsersarray = ["","","","","",""];
		this.status = 0;
		this.start = Math.floor((Math.random() * allq.length));
	};
	User.prototype = {
		constuctor : User,
		//This function is called at the end of the exam to Save the score as cookies
		SaveScore : function(Score, name, email) {

		},
		//This adds the user awnser to his awnsers
		AddAwnser : function(number,awnser) {
			allq[ThisUser.status].t = awnser;
			this.awnsersarray[number] = awnser;
		},
		//This function tells if its going forward or backwards and sends the right data on its way
		Nextq : function(Type) {
			//If they are going Forward
			if (Type == "Forward") {
				//If its the last question the button changes to finish exam
				if (ThisUser.status == ThisUser.awnsersarray.length-2) {
					document.getElementById("buttonn").innerHTML = "Finish exam";
				}
				//If he has awnserd the last question then the program is over
				if (ThisUser.status == ThisUser.awnsersarray.length-1) {
					this.ClearAll();
					this.ShowScore(ThisUser.name, ThisUser.awnsersarray);
				} else {
					ThisUser.status += 1;
					if (ThisUser.start == ThisUser.awnsersarray.length-1) {
						ThisUser.start = 0;
					} else {
						ThisUser.start += 1;
					}
					//Here he will call the function to really create the new awnsers
				}
			} else { //If they are going Backwards
				//If it was the last question he will change it so it says next Question instead
				document.getElementById("buttonn").innerHTML = "Next Question";
				//Minuses off so hes proberly placed
				ThisUser.status -= 1;
				if (ThisUser.start == 0) {
					ThisUser.start = ThisUser.awnsersarray.length-1;
				} else {
					ThisUser.start -= 1;
				}
			}
			this.Clearq();
			this.Createq(allq);
		},
		ClearAll : function() {
			var div = document.getElementById("Box");
			while(div.firstChild){
		    	div.removeChild(div.firstChild);
			}
		},
		//This function is called if hes finishing the test
		ShowScore : function(Name,Awnsers) {
			//Caluclates the right awners and prints them out with the name and score
			var score = 0;
			for (var i = 0; i < Awnsers.length; i++) {
				for (var a = 0; a < allq.length; a++){
					if (Awnsers[i] == allq[a].r) {
						score ++;
					}
				}
			}
			alert(score);
		},
		RestartGame : function() {
			Start();
		},
		Clearq : function() {
			var div = document.getElementById("rads");
			while(div.firstChild){
		    	div.removeChild(div.firstChild);
			}
		},//Asfsakið að þetta sjé svona stórt function bara væri heimskulegt að splitta henni upp því dom vinsla eru margar línur bara
		Createq : function() {
			document.getElementById("q").innerHTML = allq[ThisUser.start].q;
			for (var i = 0; i < allq[ThisUser.start].a.length; i++) {
				var div = document.createElement("div");
				var h2 = document.createElement("h2");
				div.id = "none";
				h2.innerHTML = allq[ThisUser.start].a[i];
				div.appendChild(h2);
				for (var a = 0; a < this.awnsersarray.length; a++){
					if (this.awnsersarray[a] == allq[ThisUser.start].a[i]) {
						div.className = "selected";
						div.id = "selected";
						break;
					} else {
						div.className = "awnsers"
					}
				}
				div.onclick = function() {
					if (this.id == "none") {
						var elements = document.getElementById("selected");
						if (elements) {
							elements.id = "none";
							elements.className = "awnsers";
						}
						this.id = "selected";
						this.className = "selected";
					} else if (this.id == "selected") {
						this.id = "none";
						this.className = "awnsers";
					}
				}
				document.getElementById("rads").appendChild(div);
			}
		}
	};
	//Self invoking function that creates the next and back buttons
	(function createButtons(){
		//Langur leiðinlegur kóði gæti mögulega stytt einhverjar línur enn óþarfi því þetta býr bara til taka sem þarf
		var div = document.createElement("div");
		div.className = "button";
		div.id = "button"
		var h2 = document.createElement("h2");
		h2.innerHTML = "Next Question";
		h2.id = "buttonn";
		div.appendChild(h2);
		document.getElementById("Box").appendChild(div);
		var div2 = document.createElement("div");
		div2.className = "button";
		div2.id = "back"
		var h22 = document.createElement("h2");
		h22.innerHTML = "Last Question";
		h22.id = "backn";
		div2.appendChild(h22);
		document.getElementById("Box").appendChild(div2);
	})();

	/*    THE CLICKABLE BUTTONS     */
	//Forward button
	document.getElementById("button").onclick = function() {
		//Looks if he has selected a awnser
		var elements = document.getElementById("selected");
		if (elements) {
			//If he has selected the awnser whe put the awnser in the array and ask for a next question.
			ThisUser.AddAwnser(ThisUser.start, elements.firstChild.innerHTML);
			ThisUser.Nextq("Forward");
		} else {
			//This happens if he has not put in the awnser.
			alert("Please pick an awnser");
		}
	}
	//Backwards button
	document.getElementById("back").onclick = function() {
		if (ThisUser.status != 0) {
			var elements = document.getElementById("selected");
			//If he has selected an awnser and is still going back
			if (elements) {
				//Adds the Question to the array
				ThisUser.AddAwnser(ThisUser.start, elements.firstChild.innerHTML);
			}
			ThisUser.Nextq("Backwards");
		} else {
			alert("Cant go back mate");
		}
	}
	/*        Making all this stuff here so all the functinones get initalized       */
	//From the input makes the user whe need
	ThisUser = new User(UserDetails[0],UserDetails[1]);
	//This Basically initlazies it allll
	ThisUser.Createq();
};