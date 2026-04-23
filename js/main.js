var game = new Chess();
var currentLine = openingTrainingLines.sicilian_najdorf;
var moveIndex = 0;
var userColour = 'w';
var config = {
    draggable: true,
    position: 'start',
    onDrop: onDrop,
    onSnapEnd: onSnapEnd,
    pieceTheme: "img/chesspieces/wikipedia/{piece}.png"

}
var board = Chessboard('myBoard', config);
$(window).resize(board.resize);

function makeComputerMove()
{
    var computerColour = (userColour === 'w') ? 'b' : 'w';
    var computerMove = currentLine[moveIndex][computerColour];

    if(computerMove)
    {
        game.move(computerMove);
        board.position(game.fen());
        
        if(moveIndex === currentLine.length - 1)
        {
            showSuccess();
        }
        else
        {
            moveIndex++;
        }
    }    
}

function onDrop(source, target)
{
    if(!currentLine || moveIndex >= currentLine.length)
    {
        return 'snapback';
    }
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q'
    })
    if (move === null) return 'snapback';

    var expectedMove = currentLine[moveIndex][userColour];

    if (move.san !== expectedMove)
    {
        handleWrongMove(target);
        return 'snapback';
    }

    if (userColour === 'w' && !currentLine[moveIndex].b)
    {
        showSuccess();
    }
    else if (userColour === 'b' && moveIndex === currentLine.length -1)
    {
        ShowSuccess();
    }
    else
    {
        window.setTimeout(makeComputerMove, 250);
    }
}

function handleWrongMove(target)
{
    game.undo();
    var $square = $('#myBoard .square-' + target);
    //$square.addClass('wrong-move shake');
    $square.addClass('wrong-move');
    setTimeout(() => $square.removeClass('wrong-move shake'), 250);
}

function onSnapEnd()
{
    board.position(game.fen());
}

function formatName(str) {
    return str.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function populateMainDropdown()
{
    const mainSelect = $('#openingSelect');
    mainSelect.empty();
    
    Object.keys(openingTrainingLines).forEach(key =>
    {
        const displayName = formatName(key);
        mainSelect.append(`<option value="${key}">${displayName}</option>`)
    }
    )
    updateVariationDropdown();
}

function updateVariationDropdown()
{
    const mainKey = $('#openingSelect').val();
    const varSelect = $('#variationSelect');
    varSelect.empty();

    if (openingTrainingLines[mainKey])
    {
        const variations = openingTrainingLines[mainKey];

        Object.keys(variations).forEach((vKey) =>
        {
            const displayName = formatName(vKey);
            varSelect.append(`<option value = "${vKey}">${displayName}</option>`)
        }
    );
    console.log(`Loaded ${Object.keys(variations).length} variations for ${mainKey}`);
    } 
    else 
    {
        console.error("Could not find opening key:", mainKey);
    }
}



function resetDrill()
{
    game.reset();
    moveIndex = 0;
    
    const mainKey = $('#openingSelect').val();
    const varKey = $('#variationSelect').val();
    
    // Path: Opening -> Variation
    currentLine = openingTrainingLines[mainKey][varKey];

    // ... (rest of your board reset code)
    board.start();
    $('#status-message').text("New variation loaded. Your move!").removeClass('status-success');
}

function showSuccess()
{
    $('#status-message')
        .text("🏆 Drill successfully completed")
        .removeClass('status-active status-neutral')
        .addClass('status-success');       
    
    console.log("Drill finished successfully");
}

// keep this at the bottom of this file
$(document).ready(function()
{
    populateMainDropdown();
    $('#openingSelect').on('change', function()
    {
        updateVariationDropdown();
        resetDrill();
    });
    $('#variationSelect').on('change', resetDrill);
    $('#resetBtn').on('click', resetDrill);
    resetDrill();
})