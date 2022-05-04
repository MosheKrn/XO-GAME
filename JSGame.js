var currentPlayer = "X";
var player1;
var player2;
var color1;
var color2;
var firstArray = new Array();
var timeleft = 10000;





function buildBoard() {
	var rows = document.getElementById("selRowNum").value;
	var cols = document.getElementById("selColNum").value;

	var board = document.getElementById("board");
	arr = new Array(selRowNum.value);
	for (var i = 0; i < selRowNum.value; i++) {
		arr[i] = new Array(selRowNum.value);
	}

	//clear board
	if (board.hasChildNodes()) {
		board.removeChild(board.firstChild);
	}
	//create new table
	var table = document.createElement("table");
	table.setAttribute("id", "myTable");
	board.appendChild(table);
	//add rows and columns
	var rowNum;
	var colNum;
	document.getElementById("turnNow").innerHTML = player1 + " it's your turn now!"
	for (rowNum = 0; rowNum < rows; rowNum++) {
		var row =   document.createElement("tr");
		table.appendChild(row);
		for (colNum = 0; colNum < cols; colNum++) {
			var cell = document.createElement("td");
			cell.rowNow = rowNum;	
			cell.colNow = colNum;
			row.appendChild(cell);
			//cell.innerHTML = rowNum + "," + colNum;

			cell.onclick = function () { dosomething() };
		}
	}
}

function dosomething() {

	var cell = event.srcElement;
	
	if (cell.innerHTML != "O" && cell.innerHTML != "X") {

		if (currentPlayer == "X") {
			cell.innerHTML = currentPlayer;
			//setInterval(function(){currentPlayer = "O"}, 10000);
			//setInterval(function() {currentPlayer = "O", document.getElementById("turnNow").innerHTML = "it's your PLAYER 2 turn now!"}, 5000);
			currentPlayer = "O";
			document.getElementById("myTable").rows[cell.rowNow].cells[cell.colNow].style.backgroundColor = color1;
			document.getElementById("turnNow").innerHTML = player2 + " it's your turn now!"
		}

		else {
			setInterval(function(){
				if(currentPlayer = "O"){
				  currentPlayer = "X";
				}
			  }, 1000);
			//setInterval(function() {currentPlayer = "X", document.getElementById("turnNow").innerHTML = "it's your PLAYER 1 turn now!"}, 5000);
			cell.innerHTML = currentPlayer;
			currentPlayer = "X";
			console.log(color2);
			document.getElementById("myTable").rows[cell.rowNow].cells[cell.colNow].style.backgroundColor = color2;
			document.getElementById("turnNow").innerHTML = player1 + " it's your turn now!";
		}
	}
}

function restart() {
    sizeGame = 0;
    leftCells = 0;
    winX = 0;
    winY = 0;

    for (var q = 0; q < arr.length; q++) {
        for (var x = 0; x < arr.length; x++) {
            arr[q][x] = "";
            document.getElementById("myTable").rows[q].cells[x].innerHTML = "";
            document.getElementById("myTable").rows[q].cells[x].style.backgroundColor = 000000;
            document.getElementById("myTable").rows[q].cells[x].style.color = "#ffffff";
			document.getElementById('myTable').rows[q].cells[x].style.removeProperty("background-color");
           
        }
    }
}

function Timer()
			{

				
				document.getElementById("countdown").style.visibility="visible";
				CountDown=setInterval(function(){
					TimeToChangeTurn -= 1000
					var seconds = Math.floor((TimeToChangeTurn % (1000 * 60)) / 1000);
						if (turn == 'X') {
							document.getElementById("countdown").innerHTML = turn + "'s Turn <br>"
								+ seconds + " seconds remaining";
						}
						else{
							document.getElementById("countdown").innerHTML = turn + "'s Turn <br>"
								+ seconds + " seconds remaining";
						}

						if(seconds <=3)
						{
							document.getElementById("countdown").style.color ="red";
						}
						else
						document.getElementById("countdown").style.color ="white";
						if (TimeToChangeTurn == 0) {
							if(robot === true)
							{
								autoTurn(false);
								
							}
							
							changeTurn();
						}
					}
					,1000)
	//function checkCol(x, y) {
	//	var count = 0;
	//	player = arr[x][y];

	//	for (v = 0; v <= (selRowNum.value % 4) + 1; v++) {
		//	count = 0;
		//	for (m = v; m < 4 + v; m++) {

			//	if (arr[m][y] == player) {
			//		count++;
			//	}
				//if (count == 4) {
				//	alert("win " + player);
				//	if (player == "X")
					//	winX++;
				//	else
//winY++;
			//	}
			//}

	//	}
//}


	//greeting
	function greeting() {

		var date = new Date();
		var HourNow = date.getHours();
		var timeNow = date.getTime();
		var a = "";
		if (HourNow < 12) {
			a = "Morning";
		}
		else if (HourNow > 12 || HourNow < 18) {
			a = "afternoon";
		}
		else if (HourNow > 18) {
			a = "evening";
		}

		document.getElementById("greeting").innerHTML = " good " + a + " " + player1 + " and " + player2 + " it's " + timeNow;

	}

	function names() {
		player1 = document.getElementById("name1").value;
		player2 = document.getElementById("name2").value;

		var date = new Date();
		var HourNow = date.getHours();
		var minutesNow = date.getMinutes();
		var SecondsNow = date.getSeconds();
		var ampm = "AM";
		var dayTime = "";
		if (HourNow < 12) {
			dayTime = "Morning";
		}
		else if (HourNow > 12 && HourNow < 18) {
			dayTime = "afternoon";
			ampm = "PM";
		}
		else if (HourNow > 18) {
			dayTime = "evening";
			ampm = "PM";
		}

		document.getElementById("greeting").innerHTML = " Good " + dayTime + " " + player1 + " and " + player2 + " it's " + HourNow + ":" + minutesNow + ":" + SecondsNow + " " + ampm;

		color1 = document.getElementById("color1").value;
		document.getElementById("color1").innerHTML = color1;
		color2 = document.getElementById("color2").value;
		document.getElementById("color2").innerHTML = color2;
	}

	function checkCol(x, y) {
		var count = 0;
		player = arr[x][y];

		for (v = 0; v <= (selRowNum.value % 4) + 1; v++)// num rizot
		{
			count = 0;
			for (m = v; m < 4 + v; m++) {

				if (arr[m][y] == player) {
					count++;
				}
				if (count == 4) {
					alert("win " + player);
					if (player == "X")
						winX++;
					else
						winY++;
				}
			}

		}
	}
