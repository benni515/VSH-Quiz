// Ég veit að þetta er hardkóðað, en Þetta er bara gert útaf það er ekki tilbúið form til að búa til

/*

1. Array af objectum fyrir spurningar
	Tjékk

2. 2% Láttu spurningar birtast handahófskennt í vefappinu.
	Tjékk
3. 5% Nota dom
	Tjékk

4. 2% Notandi á að geta notað mús og lyklaborð til að velja svarmöguleika og fara þannig á milli
spurninga (Events).
	Ekki Tjékk

5. 2% Notandi á að sjá hvort að valinn svarmöguleiki var réttur eða rangur (validation). Notaðu
JavaScript eða jQuery animation og effects.
	Ekki Tjékk

6. 3% Eftir síðustu spurningu þá á notandu að sjá lokaskor (rétt / fj.spurninga). Hún á aðeins að sýna
lokaskor, ekki spurningar og svarmöguleika. Bættu við hnapp svo hægt sé að byrja aftur á byrjun í
vefappinu.
	Ekki Tjékk

7. 5% Hugaðu að viðmóti og útliti á vefappi t.d. með jQuery UI componentum eða JS library. Gerðu
vefappið viðmótsvænt.
	Fokking dreptu mig

8. 4% Uppsetning og frágangur. Kóði á að vera vel uppsettur (skrár eru aðskildar) og commentaður.
JavaScript kóði á að vera skýr (declarative), þ.e. notuð eru lítil og fleiri föll fremur en fá og stór.
Notað er IIFE til að keyra Quiz. Ekki er vera að nota harðkóðaðar lausnir. 
	Mehh hann dæmir, ekkert hardkóðað
 AUKA
	• Láttu svarmöguleikar birtast handahófskennt með spurningu
		Willdo
	• Web storage API til að vista score notanda í vaframinnið.
		Tjékk
	• Bættu við niðurteljara ásamt refsingu.
		Willdo
	• Back takki til að breyta val á svarmöguleika
	• Swipe til að sleppa spurningu
	• object literal structure fyrir kóðauppsetningu
 TODO
 	* Make the Createq shorter with the CreateTag function

*/

// Object contructor
function q_con(question, awnsers, rightawnser,theanwser) {
	this.q = question;
	this.a = awnsers;
	this.r = rightawnser;
	this.t = theanwser
}

// First set of questions
q1 = new q_con("What is 2 * 2",["5","6","7","4"],"4",null);
q2 = new q_con("What programming langues is the best",["Python","C#","C++","Javascript"],"Javascript",null);
q3 = new q_con("What is an int",["Its a text","Its a ballon","Its somthing cool","Its a number"],"Its a number",null);
q4 = new q_con("What year is it",["2015","2014","2017","2016"],"2016",null);
q5 = new q_con("What month is it",["February","March","April","January"],"January",null);
q6 = new q_con("What country is the best",["Norway","England","Sweden","Iceland"],"Iceland",null);
allq = [q1,q2,q3,q4,q5,q6];

//Harkóðað hérna líka því við erum basically enþá að prufa keyra
UserDetails = ["Bernhard Linn Hilmarsson", "Bennilinn@live.com"]
start(allq,UserDetails,"Test Essay");

//A function that takes in the questins and user details and runs the whole app
function start(allq,UserDetails,essayname) {
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
		SaveScore : function(Score, name, email,essay) {
			var name = essay;
			var num = 1;
			while(true) {
				if (getCookie(essay+num)) {
					num += 1;
				} else {
					break;
				}
			}
			name += num;
			var Value = name + ":" + Score;
			setCookie(name,Value,365);
			this.GetScores(essay);
		},
		GetScores : function(essay) {
			var scores = [];
			var name = essay;
			var num = 1;
			while(true) {
				if (getCookie(essay+num)) {
					scores.push(getCookie(essay+num));
					num += 1;
				} else {
					break;
				}
			}
			this.FindHighScore(scores);
		},
		FindHighScore : function(scores) {
			var numbers = [];
			for (var i = 0; i < scores.length; i++) {
				var thestuff = scores[i].split(":");
				numbers.push(thestuff[1]);
			}
			numbers.sort();
			this.PostHighScores(numbers);
		},
		PostHighScores : function(scores) {
			for (var i = scores.length; i > scores.length - 6; i--) {
				if (scores[i]) {
					CreateTag("div",ThisUser.name + " Got " + scores[i],"Box","Highscore");
				}
			}
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
				ThisUser.status += 1;
				if (ThisUser.start == ThisUser.awnsersarray.length-1) {
					ThisUser.start = 0;
				} else {
					ThisUser.start += 1;
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
			//If he has awnserd the last question then the program is over
			if (ThisUser.status == ThisUser.awnsersarray.length && Type == "Forward") {
				this.ClearAll();
				this.CalculateScore(ThisUser.name, ThisUser.awnsersarray);
			}
		},
		//This function is called if hes finishing the test
		CalculateScore : function(Name,Awnsers) {
			//Caluclates the right awners and prints them out with the name and score
			var score = 0;
			for (var i = 0; i < Awnsers.length; i++) {
				for (var a = 0; a < allq.length; a++){
					if (Awnsers[i] == allq[a].r) {
						score ++;
					}
				}
			}
			this.ShowScore(score);
		},
		ShowScore : function(score) {
			//Made a function that lets the code get shorter with a CreateTag function
			var restartclick = function() {
				alert("gona restart the game")
			};
			var menuclick = function() {
				alert("Going to the menu");
			};
			CreateTag("h1",ThisUser.name,"Box");
			CreateTag("h2",score + " out of " + ThisUser.awnsersarray.length + " are right","Box","thescore");
			this.SaveScore(score, ThisUser.name, ThisUser.email, essayname);
			CreateTag("div","Restart Game","Box","button", null, restartclick);
			CreateTag("div","Main Page","Box","button",null,menuclick);
		},
		RestartGame : function() {
			Start();
		},
		ClearAll : function() {
			var div = document.getElementById("Box");
			while(div.firstChild){
		    	div.removeChild(div.firstChild);
			}
		},
		Clearq : function() {
			var div = document.getElementById("rads");
			while(div.firstChild){
		    	div.removeChild(div.firstChild);
			}
		},//Have to make this Create q, a bit shorter with my Create Tag
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