class Manager {
    #array//array privat mező
    #addDatacCallback//addDatacCallback privat mező

    constructor() {
        this.#array = []//beállítja az array mezőt
    }
    setAddDatacCallback(callback) {//beállítja az addDatacCallback mezőt
        this.#addDatacCallback = callback//beállítja az addDatacCallback mezőt
    }
    addData(data) {//hozzáadja az adatot az arrayhez
        this.#array.push(data)//hozzáadja az adatot az arrayhez
        this.#addDatacCallback(data)//visszahívja az addDatacCallback függvényt
      
    }
}