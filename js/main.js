var game = new Chess();
var currentLine = []
var moveIndex = 0;
var userColour = 'w';
var drillStarted = false;
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

    if(moveIndex >= currentLine.length)
    {
        return;
    }

    if(computerMove)
    {
        game.move(computerMove);
        board.position(game.fen());
        
        if(userColour === 'w' && moveIndex === currentLine.length - 1)
        {
            showSuccess();
        }
        else
        {
            if(computerColour === 'b')
            {
                moveIndex++;
            }
        }
    }    
}

function onDrop(source, target)
{
    if(!currentLine || moveIndex >= currentLine.length)
    {
        return 'snapback';
    }

    if(game.turn() !== userColour)
    {
        return 'snapback';
    }

    var move = game.move({
        from: source,
        to: target,
        promotion: 'q'
    })
    if (move === null) return 'snapback';

    var expectedMove = (userColour === 'w') ? currentLine[moveIndex].w : currentLine[moveIndex].b;

    console.log("move.san:", move.san, "expected:", expectedMove);

    if (move === null || move.san !== expectedMove)
    {
        if(move === null) game.undo();    
        handleWrongMove(target);
        return 'snapback';
    }

    drillStarted = true;
    if(userColour === 'b')
    {
        if(moveIndex === currentLine.length - 1)       
        {
            showSuccess();
        }
        else        
        {
            moveIndex++;
            setTimeout(makeComputerMove, 500);
        }
    } else
    {
        setTimeout(makeComputerMove, 500);
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
    drillStarted = false;

    $('#status-message').text("Choose an opening and start!").removeClass('status-success');
    $('#resetBtn').text("Start drill");
    $('#flipBtn').prop('disabled', false);
    
    
    const mainKey = $('#openingSelect').val();
    const varKey = $('#variationSelect').val();

    if (!mainKey || !varKey || !openingTrainingLines[mainKey]) 
    {
        return; 
    }    
   
    currentLine = openingTrainingLines[mainKey][varKey];
    board.start();
    board.orientation(userColour === 'w' ? 'white' : 'black');
    $('#status-message').text("Choose an opening and start!").removeClass('status-success');

    if(userColour === 'b')
        {
            $('#flipBtn').prop('disabled', true);
            setTimeout(makeComputerMove, 500);
        }
}

function showSuccess()
{
    $('#status-message')
        .text("🏆 Drill successfully completed")
        .removeClass('status-active status-neutral')
        .addClass('status-success');       
    $('#flipBtn').prop('disabled', false);
    console.log("Drill finished successfully");
}

// keep this at the bottom of this file
$(document).ready(function()
{
    userColour = 'w';
    drillStarted = false;
    populateMainDropdown();

    console.log("Chess Trainer initialized");
    console.log("Available openings:", Object.keys(openingTrainingLines));
    console.log("Default user colour:", userColour === 'w' ? "White" : "Black");
    console.log("User starts as " + userColour);
    
    $('#openingSelect').on('change', function()
    {
        updateVariationDropdown();
        resetDrill();
    });

    $('#variationSelect').on('change', resetDrill);
    $('#resetBtn').on('click', function()
    {
        if(!drillStarted)
        {
            drillStarted = true;
            $(this).text("Restart drill");

            $('#flipBtn').prop('disabled', true);
            if(userColour === 'b')
            {
                setTimeout(makeComputerMove, 500);
            }            
        }
        else
        {
            resetDrill();
        }
      
    })
    
    $('#flipBtn').on('click', function()
    {
        userColour = (userColour === 'w') ? 'b' : 'w';
        $(this).text("Training as: " + (userColour === 'w' ? "White" : "Black"));
        board.orientation(userColour === 'w' ? 'white' : 'black');
        console.log("User flipped to " + (userColour === 'w' ? "White" : "Black"));
        resetDrill();
        console.log("Flipped! Side is now:", userColour);
    });

    $(this).text("Training as: " + (userColour === 'w' ? "White" : "Black"));
    board.orientation(userColour === 'w' ? 'white' : 'black');
    console.log("User is training as " + userColour);
    resetDrill();
})