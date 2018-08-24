var player = 1;
injectGame(3);

function injectGame( size ){
    document.getElementById("game").innerHTML = createGame( size );
    restart(size);
}

function restart( size ){
    for( var i = 1 ; i <= size ; i++ ){
        for( var j = 1 ; j <= size ; j++ ){
            var cell = getCellIdByPosition( i , j );
            cell.innerText = "X";
        }
    }
}

function handleCellClick( row , col , size ){
    var cell = getCellByPosition( row , col );
    var classes = cell.classList;
    if( classes.contains("game-cell-init")){
        classes.remove("game-cell-init");
        if( player === 1 ){
            classes.add("game-cell-player1");
            cell.innerText = "X";
            player = 2;
        } else {
            classes.add("game-cell-player2");
            cell.innerText = "O";
            player = 1;
        }
    }
}

function getCellByPosition( row , col ){
    return document.getElementById( getCellIdByPosition(row,col) );
}

function createGame( size ){
    var textHTML = '';

    for( var i = 1 ; i <= size ; i++ ){
        textHTML = textHTML + createGameRow( i , size );
    }

    return textHTML;
}

function createGameRow( row , size ){
    var textHTML = '<div id="game-row_'
        + row
        + '" class="game-row">';

    for( var i = 1 ; i <= size ; i++ ) {
        var innerHTML = createGameCell( row , i , size );
        textHTML = textHTML + innerHTML;
    }

    textHTML = textHTML + '</div>';

    return textHTML;
}

function createGameCell( row , col , size ){

    var textHTML = '<span id="'
        + getCellIdByPosition(row,col)
        + '" class="game-cell game-cell-init"'
        + 'onclick="handleCellClick('
        + row
        + ','
        + col
        + ','
        + size
        + ')" ></span>';

    return textHTML;

}

function getCellIdByPosition( row , col ){
    return "game-cell_" + row + col;
}

