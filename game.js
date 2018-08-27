injectGame();

function injectGame(){
    const size = document.getElementById("game-size-input");
    const winLength = document.getElementById("game-win-length-input");
    if( !size.checkValidity() ){
        alert("Invalize size!");
        return;
    }
    if( !winLength.checkValidity() ){
        alert("Invalid win length!");
        return;
    }
    if( size.value.valueOf() < winLength.value.valueOf() ){
        alert("Impossible win length!");
        return;
    }

    document.getElementById("game").innerHTML = createGame( size.value , winLength.value );

    const player = document.getElementById("player");

    player.innerHTML = 'Player <label id="player-number" class="player">1</label>';

}

function handleCellClick( row , col , size , winLength ){
    const cell = getCellByPosition( row , col );
    const classes = cell.classList;
    const playerNumber = document.getElementById("player-number");
    if( classes.contains("game-cell-init")){
        classes.remove("game-cell-init");
        if( playerNumber.innerText === "1" ){
            classes.add("game-cell-player1");
            cell.innerHTML = '<img src="img/x.ico">'
            playerNumber.innerText = "2";
        } else {
            classes.add("game-cell-player2");
            cell.innerHTML = '<img src="img/o.ico">'
            playerNumber.innerText = "1";
        }
    }

    if( isFinished( size , winLength ) ){
        finish( playerNumber , size );
    }

}

function finish( playerNumber , size ){
    document.getElementById("player").innerText =
        'Player '
        + (playerNumber.innerText %2 + 1)
        + ' won!';

    for( let i = 1 ; i <= size ; i++ ){
        for( let j = 1 ; j <= size ; j++ ){
            const cell = getCellByPosition( i , j );
            cell.onclick = null;
        }
    }
}

function isFinished( size , winLength ){
    const t = [];
    let fin = false;

    for( let i = 0 ; i < size ; i++ ){
        const t2 = [];

        for( let j = 0 ; j < size ; j++ ){
            const cell = getCellByPosition( i+1 , j+1 );
            const classes = cell.classList;
            if( classes.contains("game-cell-init")) {
                t2.push(0);
            }
            if( classes.contains("game-cell-player1")) {
                t2.push(1);
            }
            if( classes.contains("game-cell-player2")){
                t2.push(2);
            }
        }

        t.push(t2);

    }

    fin = checkRows( t , size , winLength );
    if( fin === true ){
        return true;
    }
    fin = checkColumns( t , size , winLength );
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
    for( let i = 0 ; i < size ; i++){
        let before = 0;
        let count = 1;
        for( let j = 0 ; j < size ; j++){
            const val = t[i][j];
            if( val === before && (val === 1 || val === 2) ){
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
    for( let i = 0 ; i < size ; i++){
        let before = 0;
        let count = 1;
        for( let j = 0 ; j < size ; j++){
            const val = t[j][i];
            if( val === before && (val === 1 || val === 2) ){
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
    for( let i = -size + 1 ; i < size ; i++){
        let before = 0;
        let count = 1;
        for( let j = 0 ; j < size ; j++){
            const val = t[j][i+j];
            if( val === before && (val === 1 || val === 2) ){
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
    for( let i = 0 ; i < 2*size-1 ; i++){
        let before = 0;
        let count = 1;
        for( let j = 0 ; j < size ; j++){
            const subtable = t[i-j];

            if( subtable !== undefined ) {
                const val = subtable[j];

                if (val === before && (val === 1 || val === 2)) {
                    count++;
                } else {
                    count = 1;
                }

                if (count === winLength) {
                    return true;
                }

                before = val;

            } else{
                count = 1;
                before = 0;
            }

        }
    }
    return false;
}

function getCellByPosition( row , col ){
    return document.getElementById( getCellIdByPosition(row,col) );
}

function createGame( size , winLength ){
    let textHTML = '';

    for( var i = 1 ; i <= size ; i++ ){
        textHTML = textHTML + createGameRow( i , size , winLength );
    }

    return textHTML;
}

function createGameRow( row , size , winLength ){
    let textHTML = '<div id="game-row_'
        + row
        + '" class="game-row">';

    for( let i = 1 ; i <= size ; i++ ) {
        let innerHTML = createGameCell( row , i , size , winLength );
        textHTML = textHTML + innerHTML;
    }

    textHTML = textHTML + '</div>';

    return textHTML;
}

function createGameCell( row , col , size , winLength ){

    const textHTML = '<span id="'
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
        + ')" ><img src="img/mark.ico"></span>';

    return textHTML;

}

function getCellIdByPosition( row , col ){
    return "game-cell_" + row + col;
}