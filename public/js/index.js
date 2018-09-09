$(document).ready(function () {
    clickEventForCell();

    $('#btn-reload').click(function () {
        var col = $('td.selected').index();
        var row = $('td.selected').parent('tr').index();
        Promise.resolve()
            .then(function () {
                return $.post('index', {
                    selectedPosition: row > 0 && col > 0 ? [row, col] : [],
                    value: $('td.selected').text()
                });
            })
            .then(function (data) {
                if (data.board) {
                    var table = '';
                    //empty the table so that we can overwrite the values
                    $('#board').empty();
                    data.board.forEach(function (row) {
                        table += '<tr>'
                        row.forEach(function (value) {
                            table += '<td>' + value + '</td>';
                        });
                        table += '</tr>';
                    });
                    $('#board').html(table);

                    clickEventForCell();

                    if (row > 0 && col > 0)
                        //add selected class to prev selected item
                        $('tr:eq(' + row + ') > td:eq(' + col + ')').addClass('selected');
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    });
});

$(document).ajaxStart(function () {
    disableUserInput();
});

$(document).ajaxStop(function () {
    enableUserInput();
});

function clickEventForCell() {
    $('td').click(function () {
        $('td.selected').removeClass('selected');
        $(this).addClass('selected');
    });
}

function disableUserInput() {
    //Create overlay on demand
    $('body').append('<div id="requestOverlay" class="request-overlay"><div class="preloader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>');
    //Show overlay
    $('#requestOverlay').show();
}

function enableUserInput() {
    $('#requestOverlay').remove();
}