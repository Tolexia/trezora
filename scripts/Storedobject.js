class Storedobject {
    get(property)
    {
        var value = localStorage.getItem(property)
        try {
            value =  JSON.parse(value)
        } catch (error) {
            value = ( !isNaN(parseInt(value)) ? parseInt(value) : value )
        }
        return value;
    }

    set(property, value)
    {
        this[property] = value

        try {
            localStorage.setItem(this.dbMap[property], JSON.stringify(value))
        } catch (error) {
            localStorage.setItem(this.dbMap[property], value)
        }
        
    }
}