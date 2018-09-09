var cmd = require('node-cmd');
var chai = require('chai');
var expect = chai.expect;
var solver = require('../routes/index');

var emptyBoard = [
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

var boardWithValue1 = [
    [2, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var boardWithValue2 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 6, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

describe('Sudoku Board', function () {
    describe('#saveEmptyPositions()', function () {
        it('should save all of the empty positions in an array of 9x9', function () {
            //empty board
            emptyPositions = solver.saveEmptyPositions(emptyBoard);
            var expectedPositions = [
                [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8],
                [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8],
                [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8],
                [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8],
                [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8],
                [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8],
                [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8],
                [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8],
                [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8]
            ];

            expect(emptyPositions.length).to.equal(81);
            expect(emptyPositions).to.eql(expectedPositions);

            //boardWithValue1
            emptyPositions = solver.saveEmptyPositions(boardWithValue1);
            expectedPositions = [
                [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8],
                [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8],
                [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8],
                [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8],
                [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8],
                [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8],
                [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8],
                [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8],
                [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8]
            ];

            expect(emptyPositions.length).to.equal(80);
            expect(emptyPositions).to.eql(expectedPositions);

            //boardWithValue2
            emptyPositions = solver.saveEmptyPositions(boardWithValue2);
            var expectedPositions = [
                [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8],
                [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8],
                [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 8],
                [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8],
                [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8],
                [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8],
                [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8],
                [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8],
                [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8]
            ];

            expect(emptyPositions.length).to.equal(80);
            expect(emptyPositions).to.eql(expectedPositions);
        });
    });

    describe('#checkRow()', function () {
        it('should check that each value in the row does not equal the input', function () {
            //no match - return true
            expect(solver.checkRow(boardWithValue1, 0, 3)).to.be.ok;
            expect(solver.checkRow(boardWithValue1, 0, 6)).to.be.ok;


            //match found - return false
            expect(solver.checkRow(boardWithValue1, 0, 2)).to.not.be.ok;

            //no match - return true
            expect(solver.checkRow(boardWithValue2, 2, 4)).to.be.ok;
            expect(solver.checkRow(boardWithValue2, 2, 8)).to.be.ok;


            //match found - return false
            expect(solver.checkRow(boardWithValue2, 2, 6)).to.not.be.ok;

        });
    });

    describe('#checkColumn()', function () {
        it('should check that each value in the column does not equal to the input', function () {
            //no match - return true
            expect(solver.checkColumn(boardWithValue1, 0, 5)).to.be.ok;
            expect(solver.checkColumn(boardWithValue1, 0, 8)).to.be.ok;

            //match found - return false
            expect(solver.checkColumn(boardWithValue1, 0, 2)).to.not.be.ok;

            //no match - return true
            expect(solver.checkColumn(boardWithValue2, 7, 1)).to.be.ok;
            expect(solver.checkColumn(boardWithValue2, 7, 3)).to.be.ok;

            //match found - return false
            expect(solver.checkColumn(boardWithValue2, 7, 6)).to.not.be.ok;

        });
    });

    describe('#check3x3Square()', function () {
        it('should check that each value in the column does not equal to the input', function () {
            //no match - return true
            expect(solver.check3x3Square(boardWithValue1, 1, 1, 5)).to.be.ok;
            expect(solver.check3x3Square(boardWithValue1, 1, 2, 8)).to.be.ok;

            //match found - return false
            expect(solver.check3x3Square(boardWithValue1, 0, 2, 2)).to.not.be.ok;
            expect(solver.check3x3Square(boardWithValue1, 0, 1, 2)).to.not.be.ok;

            //no match - return true
            expect(solver.check3x3Square(boardWithValue2, 8, 2, 4)).to.be.ok;
            expect(solver.check3x3Square(boardWithValue2, 6, 1, 2)).to.be.ok;

            //match found - return false
            expect(solver.check3x3Square(boardWithValue2, 6, 2, 6)).to.not.be.ok;
            expect(solver.check3x3Square(boardWithValue2, 7, 1, 6)).to.not.be.ok;
        });
    });

    describe('#checkValue()', function () {
        it('should check whether a value is valid for a particular position', function () {
            // No match. Return true
            expect(solver.checkValue(boardWithValue1, 3, 2, 2)).to.be.ok;
            expect(solver.checkValue(boardWithValue1, 7, 6, 3)).to.be.ok;

            // Match found. Return false
            expect(solver.checkValue(boardWithValue1, 0, 0, 2)).to.not.be.ok;

            // No match. Return true
            expect(solver.checkValue(boardWithValue1, 3, 2, 2)).to.be.ok;
            expect(solver.checkValue(boardWithValue1, 7, 6, 3)).to.be.ok;

            // Match found. Return false
            expect(solver.checkValue(boardWithValue2, 7, 2, 6)).to.not.be.ok;
        });
    });


    describe('#randomArray()', function () {
        it('should return an unordered array containing unique numbers from 1-9', function () {
            var orderedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            expect(solver.randomArray()).to.not.eq(orderedArray);
            expect(solver.randomArray()).to.not.eq(orderedArray);
            expect(solver.randomArray()).to.not.eq(orderedArray);
            expect(solver.randomArray()).to.not.eq(orderedArray);
            expect(solver.randomArray()).to.not.eq(orderedArray);
        });
    });

    describe('#solveBoard()', function () {
        it('should find a solution with a given board', function () {
            var isValid = true;

            var emptyPositions = solver.saveEmptyPositions(emptyBoard);
            var solvedBoard = solver.solveBoard(emptyBoard, emptyPositions);

            for (var i = 0; i < solvedBoard.length; i++) {
                for (var j = 0; j < solvedBoard[i].length; j++) {
                    if (!solver.checkValue(solvedBoard, j, i, solvedBoard[i][j])) {
                        isValid == false;
                    }
                }
            }

            expect(isValid).to.be.ok;
        });
    });
});



