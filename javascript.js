var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;
// if we click on the start/reset
document.getElementById('startreset').onclick = function(){
	//if we are playing
	if (playing == true) {
		location.reload();//reload page
	}else{
		// if we are not playing
		//change mode to playing
		playing = true;

		//set score to 0
		score = 0;
		document.getElementById('scorevalue').innerHTML = score;
		
		//show countdown box
		show("timeremaining");		
		timeremaining = 60;
		document.getElementById('timeRemainingValue').innerHTML = timeremaining;

		hide("gameOver");
		//change button to reset
		document.getElementById('startreset').innerHTML = "Reset Game";
		
		//reduce time by 1sec in loops
		startCountDown();
			//generate new Q&A
			generateQA();
	}
}
	
// clicking on the answer box
for(i=1; i<5; i++){
	document.getElementById('box'+i).onclick = function(){
	// if we are playing
	if (playing == true) {
		// yes
		if (this.innerHTML == correctAnswer) {
			// increase score by 1
			score++;
			document.getElementById('scorevalue').innerHTML = score;

			// hide wrong box and show correct box

			hide("wrong");
			show("correct");
			setTimeout(function(){
				hide("correct");
			},1000);

			// generate new Q&A
			generateQA();
		}else {
			// wrong answer
			hide("correct");
			show("wrong");
			setTimeout(function(){
				hide("wrong");
			},1000);
		}
	}
}

}

//if we click on answerbox
	//if we are playing
		//correct?
		//yes
			//increase score
			//show correct box for 1sec
			//generate new Q&A
		//no
			//show try again box for 1sec


// funtions

// start countdown
function startCountDown(){
	action = setInterval(function(){
		timeremaining -= 1;
		document.getElementById('timeRemainingValue').innerHTML = timeremaining;
		if (timeremaining == 0) {
			// gameover
			stopCountDown();
			show("gameOver");
			document.getElementById('gameOver').innerHTML = "<p>Game Over</p><p>Your score is "+ score +".</p>";
			hide('timeremaining');
			hide("correct");
			hide("wrong");
			playing = false;
			document.getElementById('startreset').innerHTML= "Start Game";
		}
	},1000);
} 

// stopCountDown
function stopCountDown() {
	clearInterval(action);
}

// hide an element
function hide(id){
	document.getElementById(id).style.display = "none";
}

// show an element
function show(id){
	document.getElementById(id).style.display = "block";
}

// generate qestion and multiple answers
function generateQA() {
	var x  = 1 + Math.round(9*Math.random());
	var y  = 1 + Math.round(9*Math.random());
	correctAnswer = x * y;
	document.getElementById('question').innerHTML= x + "x" + y;

	var correctPosition = 1 + Math.round(3*Math.random());
	document.getElementById('box'+correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer
	// fill other boxes with wrong answer

	var answers = [correctAnswer];
	for(i=1;i<5;i++){
		if (i != correctPosition) {
			var wrongAnswer;
			do{
			wrongAnswer = (1 + Math.round(9*Math.random()))*(1 + Math.round(9*Math.random()));

		}while(answers.indexOf(wrongAnswer)>-1)
			document.getElementById('box'+i).innerHTML=wrongAnswer;
			answers.push(wrongAnswer);
		}
	}
}