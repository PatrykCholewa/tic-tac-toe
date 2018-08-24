injectGame();

function injectGame(){
    document.getElementById("game").innerHTML = createGame(2);
}

function createGame( size ){
    var textHTML = '';

    for( var i = 1 ; i <= size ; i++ ){
        textHTML = textHTML + createGameRow( i , size );
    }

    return textHTML;
}

function createGameRow( row , colQuantity ){
    var textHTML = '<div id="game-row_'
        + row
        + '" class="game-row">';

    for( var i = 1 ; i <= colQuantity ; i++ ) {
        var innerHTML = createGameCell(row,i);
        textHTML = textHTML + innerHTML;
    }

    textHTML = textHTML + '</div>';

    return textHTML;
}

function createGameCell( row , col ){
    var textHTML = '<span id="game-cell_'
        + row
        + col
        + '" class="game-cell">'
        + '<img src="ico/one.ico"></span>';

    return textHTML;

}



