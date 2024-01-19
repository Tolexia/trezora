
class Boat extends Storedobject
{
    constructor(domId, player)
    {
        this.player = player
        this.domElement = document.getElementById(domId)
        this.movementAnimationDuration = gamesystem.movementAnimationDuration
        this.lifebar = this.domElement.querySelector('.lifebar')
        this.comp = domId.match("2") ? "2" : ""

        this.dbMap = {
            coordX : `boat${this.comp}CoordX`,
            coordY : `boat${this.comp}CoordY`,
            maxLifeAmount : `maxLifeAmountBoat${this.comp}`,
            currentLifeAmount : `currentLifeAmountBoat${this.comp}`,
            attackPower : `attackPower${this.comp}`,
            shieldArmor : `shieldArmor${this.comp}`,
            currentTarget : `currentTarget${this.comp}`,
        }
        for(let key in this.dbMap)
        {
            this[key] = this.get(this.dbMap[key])
        }


        this.updateLifeBar()
    }

    updateLifeBar()
    {
        let percentLifeAmount = Math.round(this.currentLifeAmount*100/this.maxLifeAmount);
        this.lifebar.style.background =  `linear-gradient(90deg, rgb(41, 255, 41) 0%, rgb(41, 255, 41) ${percentLifeAmount}%, #ff0000 ${percentLifeAmount}%)`; 
    }

    set(property, value)
    {
        super.set(property, value);

        if(property.includes("LifeAmount"))
            this.updateLifeBar()

        return ;
    }
    goNorth()
    {
        this.set("coordY", this.coordY-1)
        this.domElement.style = `animation: ${this.movementAnimationDuration}s movingNorth${this.comp} linear forwards;`;
    }
    goSouth()
    {
        this.set("coordY", this.coordY+1)
        this.domElement.style = `animation: ${this.movementAnimationDuration}s movingSouth${this.comp} linear forwards;`;
    }
    goEast()
    {
        this.set("coordX", this.coordX+1)
        this.domElement.style = `animation: ${this.movementAnimationDuration}s movingEast${this.comp} linear forwards;`;
    }
    goWest()
    {
        this.set("coordX", this.coordX-1)
        this.domElement.style = `animation: ${this.movementAnimationDuration}s movingWest${this.comp} linear forwards;`;
    }
    refreshNearbyTargets()
    {
        // Reset
        document.querySelectorAll('.tile.clickable').forEach(tile => tile.classList.remove('clickable'))
        const selector = `
            .tile[data-cord-x="${this.coordX - 1}"][data-cord-y="${this.coordY - 1}"],
            .tile[data-cord-x="${this.coordX - 1}"][data-cord-y="${this.coordY + 1}"],
            .tile[data-cord-x="${this.coordX + 1}"][data-cord-y="${this.coordY - 1}"],
            .tile[data-cord-x="${this.coordX + 1}"][data-cord-y="${this.coordY + 1}"],
            .tile[data-cord-x="${this.coordX - 1}"][data-cord-y="${this.coordY}"],
            .tile[data-cord-x="${this.coordX + 1}"][data-cord-y="${this.coordY}"],
            .tile[data-cord-x="${this.coordX}"][data-cord-y="${this.coordY - 1}"],
            .tile[data-cord-x="${this.coordX}"][data-cord-y="${this.coordY + 1}"]
        `
        const nearbyTiles = document.querySelectorAll(selector)
        let tileFightCreature
        nearbyTiles.forEach(tile => {
            if(tile.classList.contains('shark') || tile.classList.contains('kraken'))
            {
                tileFightCreature = tile;
                tile.classList.add('clickable')
                tile.setAttribute("onclick", `fightCreature(boatObject, this, '${tile.classList.contains('shark') ? "shark" : "kraken"}')`)
            }
        })
       
        if(getItem("tutoFightCreature") == 1 && tileFightCreature)
        {
            tutoFightCreature(tileFightCreature)
        }
    }
}
