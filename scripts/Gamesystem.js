
class Gamesystem 
{
    constructor()
    {
        this.columnCount = 12
        this.rowCount = 6
        this.fightDistances = {x:2,y:1}
        this.levels = {
            1: 0,
            2: 500,
            3: 2000,
            4: 5000,
            5: 10000
        }
        this.powerReaches = {
            2:"compass",
            3:"reveal",
            4:"doublespeed",
            5:"teleport"
        }
        this.creatures = {
            "shark": {
                attackPower: 4,
                currentLifeAmount: 2,
                shieldArmor: 0,
                domElement: null
            },
            "kraken":{
                attackPower: 10,
                currentLifeAmount: 8,
                shieldArmor: 0,
                domElement: null
            }
        }
    }
}

var gamesystem = new Gamesystem()
document.getElementById('map').style = `--columnCount: ${gamesystem.columnCount};--rowCount: ${gamesystem.rowCount};`