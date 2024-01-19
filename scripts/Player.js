
class Player {
    constructor() 
    {
        super()
        this.dbMap = {
            tutoStepsPassed : this.get("tutoStepsPassed"),
        }
        for(let key in this.dbMap)
        {
            this[key] = this.get(this.dbMap[key])
        }
    }

    
}