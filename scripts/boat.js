class Boat
{
    constructor(domId, player)
    {
        this.player = player
        this.domElement = document.getElementById(domId)
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

    get(property)
    {
        let value = localStorage.getItem(property)
        try {
            value = JSON.parse(value)
        } catch (error) {
            value = ( !isNaN(parseInt(value)) ? parseInt(value) : value )
        }
        return value
    }

    set(property, value)
    {
        this[property] = value

        try {
            localStorage.setItem(this.dbMap[property], JSON.stringify(value))
        } catch (error) {
            localStorage.setItem(this.dbMap[property], value)
        }

        if(property.includes("LifeAmount"))
            this.updateLifeBar()
    }

    goNorth()
    {
        this.set("coordY", this.coordY-1)
        this.domElement.classList.add("sailing")
        this.domElement.style = `animation-name:movingNorth${this.comp};`;
    }
    goSouth()
    {
        this.set("coordY", this.coordY+1)
        this.domElement.classList.add("sailing")
        this.domElement.style = `animation-name:movingSouth${this.comp};`;
    }
    goEast()
    {
        this.set("coordX", this.coordX+1)
        this.domElement.classList.add("sailing")
        this.domElement.style = `animation-name:movingEast${this.comp};`;
    }
    goWest()
    {
        this.set("coordX", this.coordX-1)
        this.domElement.classList.add("sailing")
        this.domElement.style = `animation-name:movingWest${this.comp};`;
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
        console.log("nearbyTiles", nearbyTiles)
        nearbyTiles.forEach(tile => {
            if(tile.classList.contains('shark') || tile.classList.contains('kraken'))
            {
                tile.classList.add('clickable')
                tile.setAttribute("onclick", `fightCreature(boatObject, this, '${tile.classList.contains('shark') ? "shark" : "kraken"}')`)
            }
        })
    }
}