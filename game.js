var player = 1;

function injectGame(){
    var size = document.getElementById("game-size-input");
    var winLength = document.getElementById("game-win-length-input");
    if( !size.checkValidity() ){
        alert("Invalize size!");
        return;
    }
    if( !winLength.checkValidity() ){
        alert("Invalid win length!");
        return;
    }

    document.getElementById("game").innerHTML = createGame( size.value , winLength.value );
    restart(size);
}

function restart( size ){
    for( var i = 1 ; i <= size ; i++ ){
        for( var j = 1 ; j <= size ; j++ ){
            var cell = getCellIdByPosition( i , j );
            cell.innerText = "?";
        }
    }
}

function handleCellClick( row , col , size , winLength ){
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

    document.getElementById("preamble").innerText = isFinished( size , winLength );

}

function isFinished( size , winLength ){
    var t = [];

    for( var i = 0 ; i < size ; i++ ){
        for( j = 0 ; j < size ; j++ ){
            var cell = getCellByPosition( i+1 , j+1 );
            t.push( cell.innerText );
        }
    }

    var fin = checkRows( t , size , winLength );
    if( fin === true ){
        return true;
    }
    fin = checkColumns( t , size , winLength )
    if( fin === true ){
        return true;
    }
    fin = checkAslantTopLeftToBottomRight( t , size , winLength );
    if( fin === true){
        return true;
    }

    return checkAslantBottomLeftToTopRight( t , size , winLength );
}

function checkRows( t , size , winLength ){
    for( var i = 0 ; i < size ; i++){
        var before = "BAD";
        var count = 1;
        for( var j = 0 ; j < size ; j++){
            var val = t[i*size+j];
            if( val === before && ( val === "X" || val === "O" )){
                count++;
            } else {
                count = 1;
            }
            if( count === winLength ){
                return true;
            }
            before = val;
        }
    }
    return false;
}

function checkColumns( t , size , winLength ){
    for( var i = 0 ; i < size ; i++){
        var before = "BAD";
        var count = 1;
        for( var j = 0 ; j < size ; j++){
            var val = t[j*size+i];
            if( val === before && ( val === "X" || val === "O" )){
                count++;
            } else {
                count = 1;
            }
            if( count === winLength ){
                return true;
            }
            before = val;
        }
    }
    return false;
}

function checkAslantTopLeftToBottomRight( t , size , winLength ) {
    for( var i = -size + 1 ; i < size ; i++){
        var before = "BAD";
        var count = 1;
        for( var j = 0 ; j < size ; j++){
            var val = t[i + j*size+j];
            if( val === before && ( val === "X" || val === "O" )){
                count++;
            } else {
                count = 1;
            }
            if( count === winLength ){
                return true;
            }
            before = val;
        }
    }
    return false;
}

function checkAslantBottomLeftToTopRight( t , size , winLength ) {
    for( var i = -size + 1 ; i < size ; i++){
        var before = "BAD";
        var count = 1;
        for( var j = 0 ; j < size ; j++){
            var val = t[i + j*size+(size-j-1)];
            if( val === before && ( val === "X" || val === "O" )){
                count++;
            } else {
                count = 1;
            }
            if( count === winLength ){
                return true;
            }
            before = val;
        }
    }
    return false;
}

function getCellByPosition( row , col ){
    return document.getElementById( getCellIdByPosition(row,col) );
}

function createGame( size , winLength ){
    var textHTML = '';

    for( var i = 1 ; i <= size ; i++ ){
        textHTML = textHTML + createGameRow( i , size , winLength );
    }

    return textHTML;
}

function createGameRow( row , size , winLength ){
    var textHTML = '<div id="game-row_'
        + row
        + '" class="game-row">';

    for( var i = 1 ; i <= size ; i++ ) {
        var innerHTML = createGameCell( row , i , size , winLength );
        textHTML = textHTML + innerHTML;
    }

    textHTML = textHTML + '</div>';

    return textHTML;
}

function createGameCell( row , col , size , winLength ){

    var textHTML = '<span id="'
        + getCellIdByPosition(row,col)
        + '" class="game-cell game-cell-init"'
        + 'onclick="handleCellClick('
        + row
        + ','
        + col
        + ','
        + size
        + ','
        + winLength
        + ')" >?</span>';

    return textHTML;

}

function getCellIdByPosition( row , col ){
    return "game-cell_" + row + col;
}