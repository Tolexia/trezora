var validationMove = () => validateTutoStepMove()
var validationPower = () => validateTutoStepPower()
var validationFightCreature = () => validationTutoFightCreature()
var validationFightBoat = () => validationTutoFightBoat()

function intro()
{
    let html = "<p>";
    html += "Greetings, fellow sailor !<br />";
    html += "Do you hear the call of adventure ?<br />";
    html += "Do you feel yourself the soul of a true pirate ?<br />";
    html += "Go ahead and sail across the sea to find the treasure before your opponent !<br />";
    html += "In this quick tutorial, you will learn how to optimize your chance to win !";
    html += "</p>";
    Swal.fire({
        title: "Find the treasure !",
        html: html,
        confirmButtonText: "Start",
        cancelButtonText: "Skip intro",
        showConfirmButton: true,
        showCancelButton: true
    }).then(result => {
        if(result.isConfirmed)
        {
            html = "<p>";
            html += "At the beggining of the game, an hint will appear to tell you which type of tile the treasure is hidden on.<br />";
            html += "There are 3 basic types of tiles : Sea, Island, and Port.<br />";
            html += "During the game, if you want to display the hint again, click on the hint logo :<br />";
            html += "<span style = 'font-size:25px;padding:0 10px;border:1px solid black; border-radius:50%;display: inline-block;margin-top:10px;'>?</span>"
            html += "</p>";
            Swal.fire({
                title: "Hint",
                html: html,
                confirmButtonText: "Continue",
                confirmButtonColor: "green",
                cancelButtonText: "Skip intro",
                showConfirmButton: true,
                showCancelButton: true
            })
            .then(result => {
                if(result.isConfirmed)
                {
                    html = "<p>";
                    html += "To navigate across the sea, click on the first letters of cardinal directions:<br />";
                    html += "N for North, S for South, E for East, and W for West.<br />";
                    html += "If you were about to reach out of the map, a nice pop up would appear to tell you and prevent you to fall in a warp zone.<br />";
                    html += "Each time you move, your opponent will do the same. It also knows the hint so beware!<br />";
                    html += "</p>";
                    Swal.fire({
                        title: "Moving",
                        html: html,
                        confirmButtonText: "Continue",
                        confirmButtonColor: "green",
                        cancelButtonText: "Skip intro",
                        showConfirmButton: true,
                        showCancelButton: true
                    })
                    .then(result => {
                        if(result.isConfirmed)
                        {
                            html = "";
                            html += "<ul>";
                            html += "<li><b>Compass</b>: cardinal letters indicating the direction of the treasure will be green enlightened</li>";
                            html += "<li><b>Reveal</b>: click a tile to reveal if the treasure is hidden there or not.</li>";
                            html += "<li><b>Double speed</b>: The next move will make you reach 2 tiles instead of one.</li>";
                            html += "<li><b>Teleport</b>: Click a tile to magically appear on it, after a sweet animation.</li>";
                            html += "</ul>";
                            Swal.fire({
                                title: "Powers",
                                html: html,
                                confirmButtonText: "Continue",
                                confirmButtonColor: "green",
                                cancelButtonText: "Skip intro",
                                showConfirmButton: true,
                                showCancelButton: true
                            })
                            .then(result => {
                                if(result.isConfirmed)
                                {
                                    html = "";
                                    html += "The sea is a dangerous playground, you'll find creatures on you way. <br />";
                                    html += "Some are more dangerous than others, but all keep some precious stuff.<br />";
                                    html += "Dodge them or fight them, the choice will be yours.<br />";
                                    Swal.fire({
                                        title: "Creatures",
                                        html: html,
                                        confirmButtonText: "Continue",
                                        confirmButtonColor: "green",
                                        cancelButtonText: "Skip intro",
                                        showConfirmButton: true,
                                        showCancelButton: true
                                    })
                                    .then(result => {
                                        if(result.isConfirmed)
                                        {
                                            html = "";
                                            html += "If you find the treasure, you win the game and gain Xp and coins. <br />";
                                            html += "If your opponent find the treasure, you lose the game but also gain a bit of xp and coins.<br />";
                                            html += "Xp makes you level up and will unlock the possibility to buy powers in shop.<br />";
                                            html += "With coins you'll be able to buy upgrades and powers in shop.<br />";
                                            html += "When the game is over, a new one starts immediately to keep on having fun !<br />";
                                            html += "<b>You're now ready for adventure, so set sail fellow pirate, you've got a treasure to find !</b>";
                                            Swal.fire({
                                                title: "Ending game",
                                                html: html,
                                                confirmButtonText: "Start",
                                                confirmButtonColor: "green",
                                                showConfirmButton: true,
                                                showCancelButton: false
                                            })
                                            .then(res => {
                                                newGame();
                                            })
                                        }
                                        else
                                        {
                                            newGame();
                                        }
                                    })
                                }
                                else
                                {
                                    newGame();
                                }
                            })
                        }
                        else
                        {
                            newGame();
                        }
                    })
                }
                else
                {
                    newGame();
                }
            })
        }
        else
        {
            newGame();
        }
    })
    setItem('displayTuto',"no");
}

async function tutorial()
{
    if(player.tutoStepsPassed.includes("move"))
        return validateTutoStepMove();

    setItem('isStepRunning', 1)
    // First step : Moving
    await Swal.fire({
        title: "Moving",
        html: "Move by selecting a direction",
        confirmButtonText: "Ok",
        confirmButtonColor: "#5b0a2cc3",
        showConfirmButton: true,
    })

    const elementsToHide = document.querySelectorAll('.map-container, nav.navbar')
    elementsToHide.forEach(el => el.classList.add("unselectionable"))

    const south = document.querySelector('.south')
    gamesystem.pointer.style.left = south.offsetLeft+"px"
    gamesystem.pointer.style.top = south.offsetTop+"px"
    south.parentNode.appendChild(gamesystem.pointer)
    
    document.querySelectorAll('.navigation a').forEach(el => el.addEventListener("click", validationMove))
}

function validateTutoStepMove()
{

    player.tutoStepsPassed.push("move")
    gamesystem.pointer.style.display = "none"
    player.set("tutoStepsPassed", player.tutoStepsPassed)
    document.querySelectorAll(".unselectionable").forEach(el => el.classList.remove("unselectionable"))
    document.querySelectorAll('.navigation a').forEach(el => el.removeEventListener("click", validationMove))
    removeItem('isStepRunning')
    setTimeout(() => {
        tutoPower()
    }, (gamesystem.movementAnimationDuration * 1000) + 500);
}
function tutoPower()
{
    if(player.tutoStepsPassed.includes("power") || getItem('isStepRunning') != null)
        return ;

    setItem('isStepRunning', 1)
    Swal.fire({
        title: "Powers",
        html: "As a gift, you were given one unit of each power.<br/>Use them carefully, you'll have to unlock them next by reaching levels and buy them in shop.",
        confirmButtonText: "Ok",
        confirmButtonColor: "#5b0a2cc3",
        showConfirmButton: true,
    })

    const selector = (window.innerWidth > 991 ? ".dropdown:nth-child(2), .dropdown:nth-child(2) *" : ".navbar-toggler-icon")
    const elementsToHide = document.querySelectorAll(`.map-container, .navigation, .navbar-nav :not(${window.innerWidth > 991 ? selector : selector + ", nav.navbar"})`)
    elementsToHide.forEach(el => el.classList.add("unselectionable"))

    const element = document.querySelector(selector)
    window.powerTutoNode = element
    gamesystem.pointer.style.left = (element.offsetLeft + (element.clientWidth / 2)) + "px"
    gamesystem.pointer.style.top = (element.offsetTop + (element.clientHeight / 2)) + "px"
    gamesystem.pointer.style.display = "block"
    element.parentNode.appendChild(gamesystem.pointer)

    element.addEventListener("click", validationPower)

}

function validateTutoStepPower()
{
    gamesystem.pointer.style.display = "none"
    document.querySelectorAll(".unselectionable").forEach(el => el.classList.remove("unselectionable"))
    window.powerTutoNode.removeEventListener("click", validationPower)
    player.tutoStepsPassed.push("power")
    player.set("tutoStepsPassed", player.tutoStepsPassed)
    removeItem('isStepRunning')
}
function tutoFightCreature(nodeTileCreature)
{
    if(player.tutoStepsPassed.includes("creature") || getItem('isStepRunning') != null)
        return;

    setItem('isStepRunning', 1)
    Swal.fire({
        title: "Attacking Creatures",
        html: "Getting rid of creatures with a sword icon over is possible when you pass nearby.",
        confirmButtonText: "Ok",
        confirmButtonColor: "#5b0a2cc3",
        showConfirmButton: true,
    })

    const selectorTileCreature = `[data-cord-x="${nodeTileCreature.dataset.cordX}"][data-cord-y="${nodeTileCreature.dataset.cordY}"]`
    window.selectorTileCreature = selectorTileCreature
    const elementsToHide = document.querySelectorAll(`nav.navbar, .navigation, .tile:not(${selectorTileCreature})`)
    elementsToHide.forEach(el => el.classList.add("unselectionable"))
    
    gamesystem.pointer.style.left = (nodeTileCreature.offsetLeft + (nodeTileCreature.clientWidth / 2)) + "px"
    gamesystem.pointer.style.top = (nodeTileCreature.offsetTop + (nodeTileCreature.clientHeight / 2)) + "px"
    gamesystem.pointer.style.display = "block"
    nodeTileCreature.parentNode.appendChild(gamesystem.pointer)

    document.querySelectorAll(`.tile${selectorTileCreature}`).forEach(el => el.addEventListener("click", validationFightCreature))
}
function validationTutoFightCreature()
{
    gamesystem.pointer.style.display = "none"
    document.querySelectorAll(".unselectionable").forEach(el => el.classList.remove("unselectionable"))
    document.querySelectorAll(`.tile${window.selectorTileCreature}`).forEach(el => el.removeEventListener("click", validationFightCreature))
    player.tutoStepsPassed.push("creature")
    player.set("tutoStepsPassed", player.tutoStepsPassed)
    removeItem("tutoFightCreature")
    removeItem('isStepRunning')
}
function tutoFightBoat()
{
    if(player.tutoStepsPassed.includes("fightBoat") || getItem('isStepRunning') != null)
        return ;


    setItem('isStepRunning', 1)
    const elementsToHide = document.querySelectorAll(`nav.navbar, .map-container, .navigation :not(#fightButton, #fightButton img)`)
    elementsToHide.forEach(el => el.classList.add("unselectionable"))
        
    Swal.fire({
        title: "Attacking Boat Opponent",
        html: "You can attack your enemy when you both are close enough.<br/>Interact with this icon.",
        confirmButtonText: "Ok",
        confirmButtonColor: "#5b0a2cc3",
        showConfirmButton: true,
    })

    gamesystem.pointer.style.left = (window.fightButton.offsetLeft + window.fightButton.clientWidth) + "px"
    gamesystem.pointer.style.top = (window.fightButton.offsetTop + window.fightButton.clientHeight) + "px"
    gamesystem.pointer.style.display = "block"
    window.fightButton.parentNode.appendChild(gamesystem.pointer)

    window.fightButton.addEventListener("click", validationFightBoat)
}

function validationTutoFightBoat()
{
    gamesystem.pointer.style.display = "none"
    document.querySelectorAll(".unselectionable").forEach(el => el.classList.remove("unselectionable"))
    window.fightButton.removeEventListener("click", validationFightCreature)
    player.tutoStepsPassed.push("fightBoat")
    player.set("tutoStepsPassed", player.tutoStepsPassed)
    removeItem('isStepRunning')
}