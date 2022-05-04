var currentPlayer = "X";
var player1;
var player2;
var color1;
var color2;
var firstArray = new Array();
var TimeToChangeTurn = 10000 + 1000;
var player = "X";
var winX;
var winO;





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
	//document.getElementById("turnNow").innerHTML = player1 + " it's your turn now!"
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
	    TimeToChangeTurn = 10000;
            Timer();
	
}

function dosomething() {

	var cell = event.srcElement;

	if (cell.innerHTML != "O" && cell.innerHTML != "X") {

		if (currentPlayer == "X") {
			cell.innerHTML = currentPlayer;
			currentPlayer = "O";
			document.getElementById("myTable").rows[cell.rowNow].cells[cell.colNow].style.backgroundColor = color1;
			//document.getElementById("turnNow").innerHTML = player2 + " it's your turn now!"
			
		}

		else {
			cell.innerHTML = currentPlayer;
			currentPlayer = "X";
			console.log(color2);
			document.getElementById("myTable").rows[cell.rowNow].cells[cell.colNow].style.backgroundColor = color2;
			//document.getElementById("turnNow").innerHTML = player1 + " it's your turn now!";
			
		}
		

		
	}
	TimeToChangeTurn = 10000 + 1000;
	//checkWin(cell.rowNow, cell.colNow);
	
}

function checkWin(x, y) {
    checkRow(x, y);
    checkCol(x, y);
    checkDiagR(x, y);
    // checkDiagL(x, y);
}

function checkCol(x, y) {
    var count = 0;
	player = arr[x][y];

    for (v = 0; v < (selRowNum.value % 4) + 1; v++)// num rizot
    {
        count = 0;
        for (m = v; m < 4 + v; m++) {
            if (arr[m][y] == player) {
                count++;
                if (x == m)
                    var check = true;
                if (count == 1)
                    var temp = m;
                else if (count == 4 && check) {
                    alert("win col " + player);
                    if (player == "X")
                        winX++;
                    else
                        winO++;
                    for (i = temp; i <= m; i++) {
                        document.getElementById("myTable").rows[i].cells[y].style.backgroundColor = "000000";
                        document.getElementById("myTable").rows[i].cells[y].style.color = "#ffffff";
                    }
                }
            }
            else
                m = 4 + v;
        }
        /* if (count == 4 && check) {
             alert("win col " + player);
             if (player == "X")
                 winX++;
             else
                 winO++;
         }*/
    }
}

function checkRow(x, y) {
    var count = 0;
    player = arr[x][y];

    for (v = 0; v < (selRowNum.value % 4) + 1; v++)
    {
        count = 0;
        for (m = v; m < 4 + v; m++) {
            if (arr[x][m] == player) {
                count++;
                if (x == m)
                    var check = true;
                if (count == 1)
                    var temp = m;
                else if (count == 4 && check) {
                    alert("win row " + player);
                    if (player == "X")
                        winX++;
                    else
					winO++;
                    for (i = temp; i <= m; i++) {
                        document.getElementById("myTable").rows[x].cells[i].style.backgroundColor = "000000";
                        document.getElementById("myTable").rows[x].cells[i].style.color = "#ffffff";
                    }
                }
            }
            else {
                m = 4 + v;
                check = false;      
            }
        }
    }
}

function checkDiagR(x, y) {
    var count = 0;
    player = arr[x][y];

    if (x == y) {
        for (v = 0; v < (selRowNum.value % 4) + 1; v++)// num rizot
        {
            count = 0;
            for (m = v; m < v + 4; m++) {
                if (arr[m][m] == player) {
                    count++;
                }
                else
                    m = 4 + v;
            }
            if (count == 4) {
                alert("win diagR up" + player);
                if (player == "X")
                    winX++;
                else
				winO++;
            }
        }
    }
    else if (x > y) {
        for (v = 0; v < 4 - (parseInt(x) - parseInt(y)); v++)// num rizot
        {
            count = 0;
            // for (m = x % 4 - (x - y) + 1; m < v + 4; m++) {
            for (m = v; m < v + 4; m++) {
                if (m >= x || m < 0 || m + (parseInt(x) - parseInt(y)) >= selRowNum.value - 1)
                    break;
                if (arr[m + (parseInt(x) - parseInt(y))][m] == player) {
                    count++;
                }
                else
                    m = v + 4;
            }
            if (count == 4) {
                alert("win diagR down" + player);
                if (player == "X")
                    winX++;
                else
				winO++;
            }
        }
    }

    else {//y>x
        for (v = 0; v < 4 - (parseInt(y) - parseInt(x)); v++)// num rizot
        {
            count = 0;
            for (m = v; m < v + 4; m++) {
                if (m >= x || m < 0 || m + (parseInt(x) - parseInt(y)) >= selRowNum.value - 1)
                    break;
                if (arr[m][m + (parseInt(y) - parseInt(x))] == player) {
                    count++;
                }
                else
                    m = v + 4;
            }
            if (count == 4) {
                alert("win vhvj" + player);
                if (player == "X")
                    winX++;
                else
				winO++;
            }
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
		ClearInterval(CountDown);
    }
}

function Timer()
			{
				document.getElementById("countdown").style.visibility="visible";
				CountDown=setInterval(function(){
					TimeToChangeTurn -= 1000
					var seconds = Math.floor((TimeToChangeTurn % (1000 * 60)) / 1000);
						if (currentPlayer == 'X') {
							document.getElementById("countdown").innerHTML = player1 + "'s Turn <br>"
								+ seconds + " seconds remaining";
						}
						else{
							document.getElementById("countdown").innerHTML = player2 + "'s Turn <br>"
								+ seconds + " seconds remaining";
						}

						if(seconds <=3)
						{
							document.getElementById("countdown").style.color ="red";
						}
						else
						document.getElementById("countdown").style.color ="black";
						if (TimeToChangeTurn == 0) {
							TimeToChangeTurn = 10000;
							if(currentPlayer == "X"){
								currentPlayer = "O";
								document.getElementById("turnNow").innerHTML = player2 + " it's your turn now!"
							}
							else{
								currentPlayer = "X";
								document.getElementById("turnNow").innerHTML = player1 + " it's your turn now!"
							}
						}
					}
					,1000)
				}
			
				function checkWin(x, y) {
					checkRow(x, y);
					checkCol(x, y);
					checkDiagR(x, y);
					// checkDiagL(x, y);
				}
				
				function checkCol(x, y) {
					var count = 0;
					player = arr[x][y];
				
					for (v = 0; v < (selRowNum.value % 4) + 1; v++)// num rizot
					{
						count = 0;
						for (m = v; m < 4 + v; m++) {
							if (arr[m][y] == player) {
								count++;
								if (x == m)
									var check = true;
								if (count == 1)
									var temp = m;
								else if (count == 4 && check) {
									alert("win col " + player);
									if (player == "X")
										winX++;
									else
										winO++;
									for (i = temp; i <= m; i++) {
										document.getElementById("myTable").rows[i].cells[y].style.backgroundColor = "000000";
										document.getElementById("myTable").rows[i].cells[y].style.color = "#ffffff";
									}
								}
							}
							else
								m = 4 + v;
						}
						/* if (count == 4 && check) {
							 alert("win col " + player);
							 if (player == "X")
								 winX++;
							 else
								 winO++;
						 }*/
					}
				}
				
				function checkRow(x, y) {
					var count = 0;
					player = arr[x][y];
				
					for (v = 0; v < (selRowNum.value % 4) + 1; v++)// num rizot
					{
						count = 0;
						for (m = v; m < 4 + v; m++) {
							if (arr[x][m] == player) {
								count++;
								if (x == m)
									var check = true;
								if (count == 1)
									var temp = m;
								else if (count == 4 && check) {
									alert("win row " + player);
									if (player == "X")
										winX++;
									else
										winO++;
									for (i = temp; i <= m; i++) {
										document.getElementById("myTable").rows[x].cells[i].style.backgroundColor = "000000";
										document.getElementById("myTable").rows[x].cells[i].style.color = "#ffffff";
									}
								}
							}
							else {
								m = 4 + v;
								check = false;
								// v= (selRowNum.value % 4) + 1         
							}
						}
					}
				}
				
				function checkDiagR(x, y) {
					var count = 0;
					player = arr[x][y];
				
					if (x == y) {
						for (v = 0; v < (selRowNum.value % 4) + 1; v++)// num rizot
						{
							count = 0;
							for (m = v; m < v + 4; m++) {
								if (arr[m][m] == player) {
									count++;
								}
								else
									m = 4 + v;
							}
							if (count == 4) {
								alert("win diagR up" + player);
								if (player == "X")
									winX++;
								else
									winO++;
							}
						}
					}
					else if (x > y) {
						for (v = 0; v < 4 - (parseInt(x) - parseInt(y)); v++)// num rizot
						{
							count = 0;
							// for (m = x % 4 - (x - y) + 1; m < v + 4; m++) {
							for (m = v; m < v + 4; m++) {
								if (m >= x || m < 0 || m + (parseInt(x) - parseInt(y)) >= selRowNum.value - 1)
									break;
								if (arr[m + (parseInt(x) - parseInt(y))][m] == player) {
									count++;
								}
								else
									m = v + 4;
							}
							if (count == 4) {
								alert("win diagR down" + player);
								if (player == "X")
									winX++;
								else
									winO++;
							}
						}
					}
				
					else {//y>x
						for (v = 0; v < 4 - (parseInt(y) - parseInt(x)); v++)// num rizot
						{
							count = 0;
							for (m = v; m < v + 4; m++) {
								if (m >= x || m < 0 || m + (parseInt(x) - parseInt(y)) >= selRowNum.value - 1)
									break;
								if (arr[m][m + (parseInt(y) - parseInt(x))] == player) {
									count++;
								}
								else
									m = v + 4;
							}
							if (count == 4) {
								alert("win " + player);
								if (player == "X")
									winX++;
								else
									winO++;
							}
						}
					}
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


