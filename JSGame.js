var currentPlayer = "X";
var player1;
var player2;
var color1;
var color2;
var colorWinArr = new Array();
var TimeToChangeTurn = 10000 + 1000;
var player = "X";
var winX = 0;
var winO = 0;
var countClick = 0;
var sizeBoard;
var winnerName;


function buildBoard() {
	var rows = document.getElementById("selRowNum").value;
	var cols = document.getElementById("selColNum").value;
    var board = document.getElementById("board");
	sizeBoard = rows * cols;
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
	

	arr = new Array();
	for (rowNum = 0; rowNum < rows; rowNum++) {
		var row = document.createElement("tr");
		table.appendChild(row);
		arr[rowNum] = new Array();
		
		for (colNum = 0; colNum < cols; colNum++) {
			var cell = document.createElement("td");
			cell.rowNow = rowNum;
			cell.colNow = colNum;
			row.appendChild(cell);
			cell.innerHTML = rowNum + "," + colNum;
			arr[rowNum][colNum] = undefined;	
			cell.onclick = function () { dosomething() };
		}
	}


	//array for paint win color cells
	for (var i = 0; i < rowNum; i++) {
		colorWinArr[i] = new Array(colNum);
	}
		
	console.log(arr);
	console.log(colorWinArr);
	TimeToChangeTurn = 10000;
	Timer();
}

function dosomething() {

	var cell = event.srcElement;
	var isXPlayer = currentPlayer == "X";

	var players = ["X", "O"];

	if (cell.innerHTML != players[1] && cell.innerHTML != players[0]) {
		cell.innerHTML = currentPlayer;

		currentPlayer = isXPlayer ? players[1] : players[0];
		var currentColor = isXPlayer ? color1 : color2

		document.getElementById("myTable").rows[cell.rowNow].cells[cell.colNow].style.backgroundColor = currentColor;
	}

	TimeToChangeTurn = 10000 + 1000;
    countClick++;
	arr[cell.rowNow][cell.colNow] = isXPlayer? players[0] : players[1];
	console.log(arr);
	rowWin(cell.rowNow, cell.colNow, isXPlayer? player1 : player2);
	colWin(cell.rowNow, cell.colNow, isXPlayer? player1 : player2);
	diagnolRightDownLeftUpTest(cell.rowNow, cell.colNow, isXPlayer? player1 : player);
	diagnolLeftDownRightUpTest(cell.rowNow, cell.colNow, isXPlayer? player1 : player);
	results(winX, winO);
	

}

//test the rows
function rowWin(rowNumber, colNumber, playerName) {
	var rowCounter = 0;
	var winner = false;
	var rows = document.getElementById("selRowNum").value;

	//test row to right
	for (i = colNumber + 1; i <= rows && !winner;i++) {
		if (arr[rowNumber][colNumber] == arr[rowNumber][i]) {
			rowCounter++;
			colorWinArr[rowNumber][colNumber] = arr[rowNumber][colNumber];
			colorWinArr[rowNumber][i] = arr[rowNumber][colNumber];
			
		}
		else break;
	}


	//test row to left
	for (i = colNumber - 1; i >= 0 && !winner ;i--){
		if (arr[rowNumber][colNumber] == arr[rowNumber][i]) {
			rowCounter++;
			colorWinArr[rowNumber][colNumber] = arr[rowNumber][colNumber];
			colorWinArr[rowNumber][i] = arr[rowNumber][colNumber];
		}
		else break;
	}


	if (rowCounter == 3) {

		for (i = colNumber + 1; i <= rows && !winner;i++) {
			if (arr[rowNumber][colNumber] == arr[rowNumber][i]) {
				document.getElementById("myTable").rows[rowNumber].cells[colNumber].style.backgroundColor = "blue";
				document.getElementById("myTable").rows[rowNumber].cells[i].style.backgroundColor = "blue";
			}
			else break;
		}
		for (i = colNumber - 1; i >= 0 && !winner ;i--){
			if (arr[rowNumber][colNumber] == arr[rowNumber][i]) {
				document.getElementById("myTable").rows[rowNumber].cells[colNumber].style.backgroundColor = "blue";
				document.getElementById("myTable").rows[rowNumber].cells[i].style.backgroundColor = "blue";
			}
			else break;
		}
		winner = true;
		countWin(playerName);
		alert(playerName + " is the winner(ROW)");
	}
}

//test the columns
function colWin(rowNumber, colNumber, playerName) {
	var colCounter = 0;
	var winner = false;
	var rows = document.getElementById("selRowNum").value;


	//test the columns down
	for (i = rowNumber + 1 ; i < arr[0].length && !winner ; i++) {
		if (arr[rowNumber][colNumber] == arr[i][colNumber]) {
			colCounter++;
		}
		else break;
	}


	//test the columns upwards
	for (i = rowNumber - 1; i >= 0 && !winner ;i--){
		if (arr[rowNumber][colNumber] == arr[i][colNumber]) {
			colCounter++;
		}
		else break;
	}

	if (colCounter >= 3) {
		for (i = rowNumber + 1 ; i < arr[0].length && !winner ; i++) {
			if (arr[rowNumber][colNumber] == arr[i][colNumber]) {
				document.getElementById("myTable").rows[rowNumber].cells[colNumber].style.backgroundColor = "blue";
				document.getElementById("myTable").rows[i].cells[colNumber].style.backgroundColor = "blue";
			}
			else break;
		}
		for (i = rowNumber - 1; i >= 0 && !winner ;i--){
			if (arr[rowNumber][colNumber] == arr[i][colNumber]) {
				document.getElementById("myTable").rows[rowNumber].cells[colNumber].style.backgroundColor = "blue";
				document.getElementById("myTable").rows[i].cells[colNumber].style.backgroundColor = "blue";
			}
			else break;
		}
		winner = true;
		countWin(playerName);
		
		alert(playerName + " is the winner(COL)");
	}

}


//test diagnol to right down and left up
function diagnolRightDownLeftUpTest(rowNumber, colNumber, playerName){
	var winner = false;
	var cell = event.srcElement;
	var counter = 0;
var y = colNumber + 1;
var z = colNumber - 1;
	
	//right down
	for (x = rowNumber + 1; x < arr[0].length ; x++){
		for (y ; y < arr.length ; y++){
			if (arr[rowNumber][colNumber] == arr[x][y]){
				counter++;
				console.log("right down: counter: " + counter + " rowNumber: " + rowNumber + " colNumber: " + colNumber + " x: " + x + " y: " + y + "" + arr[rowNumber][colNumber] + "" + arr[x][y]);
				y++;
			}
			else y++;
			break;
		}

	}
	
	//left up
	for (x = rowNumber - 1; x >= 0  ; x--){
		for (z ; z >= 0 ; z--){
			if (arr[rowNumber][colNumber] == arr[x][z]){
				counter++;
				console.log("left up counter: " + counter + " rowNumber: " + rowNumber + " colNumber: " + colNumber + " x: " + x + " y: " + y + "" + arr[rowNumber][colNumber] + "" + arr[x][y]);
				z--;
			}
			else z--;
			break;
		}
	}

	if (counter >= 3) {

		
        //paint right down
		y = colNumber + 1;
		for (x = rowNumber + 1; x < arr[0].length ; x++){
			for (y ; y < arr.length ; y++){
				if (arr[rowNumber][colNumber] == arr[x][y]){
					document.getElementById("myTable").rows[rowNumber].cells[colNumber].style.backgroundColor = "blue";
					document.getElementById("myTable").rows[x].cells[y].style.backgroundColor = "blue";
					y++;
				}
				else y++;
				break;
				}	
			}

            //paint left up
			z = colNumber - 1;
			for (x = rowNumber - 1; x >= 0  ; x--){
				for (z ; z >= 0 ; z--){
					if (arr[rowNumber][colNumber] == arr[x][z]){
						document.getElementById("myTable").rows[rowNumber].cells[colNumber].style.backgroundColor = "blue";
						document.getElementById("myTable").rows[x].cells[z].style.backgroundColor = "blue";
						z--;
					}
		else z--;
		break;
	}
}
		winner = true;
		countWin(playerName);
		alert(playerName + " is the winnerׂ(diagnol to right down and left up)");
	

	}
}

//test diagnol to left down and right up
function diagnolLeftDownRightUpTest(rowNumber, colNumber, playerName){
	var winner = false;
	var cell = event.srcElement;
	var counter = 0;
	var y = colNumber - 1;
	var z = colNumber + 1;

	//left down
	for (x = rowNumber + 1; x < arr.length ; x++){
		for (y ; y >= 0 ; y--){
			if (arr[rowNumber][colNumber] == arr[x][y]){
				counter++;
				console.log("left down counter: " + counter + " rowNumber: " + rowNumber + " colNumber: " + colNumber + " x: " + x + " y: " + y + "" + arr[rowNumber][colNumber] + "" + arr[x][y]);
				y--;
			}
			else y--;
			break;
		}

	}

	//right up
	for (x = rowNumber - 1; x >= 0 ; x--){
		for (z; z < arr.length ; z++){
			if (arr[rowNumber][colNumber] == arr[x][z]){
				counter++;
				console.log("right up counter: " + counter + " rowNumber: " + rowNumber + " colNumber: " + colNumber + " x: " + x + " y: " + y + "" + arr[rowNumber][colNumber] + "" + arr[x][y]);
				z++;
			}
			else z++;
			break;
		}
	}

	if (counter >= 3) {
        //paint left down
		y = colNumber - 1;
		for (x = rowNumber + 1; x < arr.length ; x++){
			for (y ; y >= 0 ; y--){
				if (arr[rowNumber][colNumber] == arr[x][y]){
					document.getElementById("myTable").rows[rowNumber].cells[colNumber].style.backgroundColor = "blue";
					document.getElementById("myTable").rows[x].cells[y].style.backgroundColor = "blue";
					y--;
				}
				else y--;
			    break;
			}
		}

		//paint right up
		z = colNumber + 1;
		for (x = rowNumber - 1; x >= 0 ; x--){
			for (z; z < arr.length ; z++){
				if (arr[rowNumber][colNumber] == arr[x][z]){
					document.getElementById("myTable").rows[rowNumber].cells[colNumber].style.backgroundColor = "blue";
					document.getElementById("myTable").rows[x].cells[z].style.backgroundColor = "blue";
					z++;
				}
				else z++;
				break;
				
				
			}
		}
		winner = true;
		countWin(playerName);
		alert(playerName + " is the winner (diagnol to left down and right up)");
	}
}


function restart() {
	countClick = 0;
	for (var q = 0; q < arr.length; q++) {
		for (var x = 0; x < arr[0].length; x++) {
			arr[q][x] = "";
			document.getElementById("myTable").rows[q].cells[x].innerHTML = "";
			document.getElementById("myTable").rows[q].cells[x].style.color = "black";
			document.getElementById('myTable').rows[q].cells[x].style.removeProperty("background-color");
		}
	}
}

function Timer() {
	document.getElementById("countdown").style.visibility = "visible";
	CountDown = setInterval(function () {
		TimeToChangeTurn -= 1000
		var seconds = Math.floor((TimeToChangeTurn % (1000 * 60)) / 1000);
		if (currentPlayer == 'X') {
			document.getElementById("countdown").innerHTML = player1 + "'s Turn <br>"
				+ seconds + " seconds remaining";
		}
		else {
			document.getElementById("countdown").innerHTML = player2 + "'s Turn <br>"
				+ seconds + " seconds remaining";
		}

		if (seconds <= 3) {
			document.getElementById("countdown").style.color = "red";
		}
		else
			document.getElementById("countdown").style.color = "black";
		if (TimeToChangeTurn == 0) {
			TimeToChangeTurn = 10000;
			if (currentPlayer == "X") {
				currentPlayer = "O";
				document.getElementById("turnNow").innerHTML = player2 + " it's your turn now!"
			}
			else {
				currentPlayer = "X";
				document.getElementById("turnNow").innerHTML = player1 + " it's your turn now!"
			}
		}
	}
		, 1000)
}


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

function countWin(currentPlayer){
	
	if(currentPlayer == player1){
		winX++;
	}

	else{
		winO++;
	}
}


function results(winX, winO){

	while(countClick == sizeBoard){

	if(winX > winO){
		alert(player1 + " is the winner! " + player1 + ": " + winX + " " + player2 + ": " + winO);
	}

	else if(winX < winO){
		alert(player2 + " is the winner! " + player2 + ": " + winO + " " + player1 + ": " + winO);
	}

	else if(winX == winO){
		alert("draw! " + player1 + ": " + winX + " " + player2 + ": " + winO);
	}
}

}
	