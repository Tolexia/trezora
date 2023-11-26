class Boat
{
    constructor(domId, player)
    {
        this.player = player
        this.domElement = document.getElementById(domId)
        this.lifebar = this.domElement.querySelector('.lifebar')
        this.comp = domId.match("2") ? "2" : ""

        this.dbFieldsInt = {
            coordX : `boat${this.comp}CoordX`,
            coordY : `boat${this.comp}CoordY`,
            maxLifeAmount : `maxLifeAmountBoat${this.comp}`,
            currentLifeAmount : `currentLifeAmountBoat${this.comp}`,
            attackPower : `attackPower${this.comp}`,
            shieldArmor : `shieldArmor${this.comp}`,
        }
        for(let prop in this.dbFieldsInt)
        {
            this[prop] = parseInt(this.get(this.dbFieldsInt[prop]))
        }

        this.dbFieldsObjects = {
            currentTarget : `currentTarget${this.comp}`,
        }
        for(let prop in this.dbFieldsObjects)
        {
            this[prop] = JSON.parse(this.get(this.dbFieldsObjects[prop]))
        }

        this.updateLifeBar()
    }

    updateLifeBar()
    {
        let percentLifeAmount = Math.round(this.currentLifeAmountBoat*100/this.maxLifeAmountBoat);
        this.lifebar.style.background =  `linear-gradient(90deg, rgb(41, 255, 41) 0%, rgb(41, 255, 41) ${percentLifeAmount}%, #ff0000 ${percentLifeAmount}%)`; 
    }

    get(property)
    {
        return localStorage.getItem(property)
    }

    set(property, value)
    {
        this[property] = value

        if(typeof this.dbFieldsObjects[property] != "undefined")
            localStorage.setItem(this.dbFieldsObjects[property], JSON.stringify(value))
        else
            localStorage.setItem(this.dbFieldsInt[property], value)

        if(property.match("LifeAmount"))
            this.updateLifeBar()
    }

    goNorth()
    {
        this.set("coordY", this.coordY-1)
        this.domElement.style = `animation-name:movingNorth${this.comp};animation-duration: 2s;animation-fill-mode: forwards;filter: drop-shadow(3px 3px 5px var(--dark));`;
    }
    goSouth()
    {
        this.set("coordY", this.coordY+1)
        this.domElement.style = `animation-name:movingSouth${this.comp};animation-duration: 2s;animation-fill-mode: forwards;filter: drop-shadow(3px 3px 5px var(--dark));`;
    }
    goEast()
    {
        this.set("coordX", this.coordX+1)
        this.domElement.style = `animation-name:movingEast${this.comp};animation-duration: 2s;animation-fill-mode: forwards;filter: drop-shadow(3px 3px 5px var(--dark));`;
    }
    goWest()
    {
        this.set("coordX", this.coordX-1)
        this.domElement.style = `animation-name:movingWest${this.comp};animation-duration: 2s;animation-fill-mode: forwards;filter: drop-shadow(3px 3px 5px var(--dark));`;
    }
}