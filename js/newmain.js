// Ég veit að þetta er hardkóðað, en Þetta er bara gert útaf það er ekki tilbúið form til að búa til

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
start(allq,UserDetails);

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