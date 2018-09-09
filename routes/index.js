var routes = {};

function get(req, res) {
    //object of game is so that numbers 1-9 
    //appear exactly once in each row, column and 3x3 box

    //start with empty board
    var board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    res.render('index', { board: solveSudoku(board) });
}

function post(req, res) {
    var response = {};
    response.board = [];
    var postData = req.body;
    var board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    //if there is a selected item, then add it to the board and solve around it
    if (postData.selectedPosition)
        board[postData.selectedPosition[0]][postData.selectedPosition[1]] = postData.value;

    response.board = solveSudoku(board);
    res.json(response);
}

function solveSudoku(board) {
    //find all empty positions
    var emptyPositions = saveEmptyPositions(board);

    //solve puzzle
    return solveBoard(board, emptyPositions);
}

function saveEmptyPositions(board) {
    var emptyPositions = [];

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] == 0)
                emptyPositions.push([i, j]);
        }
    }

    return emptyPositions;
}

function checkRow(board, row, value) {
    for (var i = 0; i < board[row].length; i++) {
        if (board[row][i] == value) {
            return false;
        }
    }
    //value doesn't exist in row
    return true;
}

function checkColumn(board, column, value) {
    for (var i = 0; i < board.length; i++) {
        if (board[i][column] == value)
            return false;
    }
    //no value exists in column
    return true;
}

function check3x3Square(board, column, row, value) {
    var columnCorner = 0;
    var rowCorner = 0;
    var squareSize = 3;

    //find left most column
    while (column >= columnCorner + squareSize) {
        columnCorner += squareSize;
    }

    //find upper most row
    while (row >= rowCorner + squareSize) {
        rowCorner += squareSize;
    }

    for (var i = rowCorner; i < rowCorner + squareSize; i++) {
        for (var j = columnCorner; j < columnCorner + squareSize; j++) {
            if (board[i][j] == value)
                return false;
        }
    }

    return true;
}

function checkValue(board, column, row, value) {
    if (checkRow(board, row, value) && checkColumn(board, column, value) && check3x3Square(board, column, row, value))
        return true;
    else
        return false;
}

function randomArray() {
    //shuffle the array
    var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (var i = array.length - 1; i > 0; i--) {
        var swapIndex = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[swapIndex];
        array[swapIndex] = temp;
    }

    return array;
}

function solveBoard(board, emptyPositions) {
    //loop through empty positions and test numbers from 1 - 9 to see if any work
    for (var i = 0; i < emptyPositions.length;) {
        var found = false;
        var position = emptyPositions[i]; //return arr of position [row, column]
        var column = position[1];
        var row = position[0];

        var randomArr = randomArray();

        for (var j = 0; j < randomArr.length; j++) {

            var value = randomArr[j];
            if (checkValue(board, column, row, value)) {
                found = true;
                board[row][column] = value;
                i++;
                break;
            }
        }

        if (!found) {
            //reset prev position (since it's an empty position we can do this)
            board[row][column] = 0;
            //now check how many possible solutions there are? 
            //If there are still none, keep going back until we have at least 2 solutions so we don't get stuck 
            var goBack = 1;
            while (possibleNumbers(board, row, column).length <= 2) {
                var pn = possibleNumbers(board, row, column);
                var prevPosition = emptyPositions[i - goBack];
                board[prevPosition[0]][prevPosition[1]] = 0;

                goBack++;
            }

            i -= goBack;

        }
    }

    return board;
}

function possibleNumbers(board, row, column) {
    var values = [];
    for (var i = 1; i <= 9; i++) {
        var value = i;
        if (checkRow(board, row, value) && checkColumn(board, column, value) && check3x3Square(board, column, row, value))
            values.push(value);

    }

    return values;
}

routes.post = post;
routes.get = get;
routes.solveBoard = solveBoard;
routes.saveEmptyPositions = saveEmptyPositions;
routes.checkRow = checkRow;
routes.checkValue = checkValue;
routes.checkColumn = checkColumn;
routes.check3x3Square = check3x3Square;
routes.solveSudoku = solveSudoku;
routes.randomArray = randomArray;
module.exports = routes;