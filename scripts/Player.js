
class Player extends Storedobject {
    constructor() 
    {
        super()
        this.dbMap = {
            tutoStepsPassed : "tutoStepsPassed",
        }
        for(let key in this.dbMap)
        {
            this[key] = this.get(this.dbMap[key])
        }
    }

    
}