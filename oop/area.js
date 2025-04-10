class Area{//létrehozzuk az Area osztályt
    #div;//létrehozzuk a privát változót
    get div(){//létrehozzuk a gettert
        return this.#div;//visszaadjuk a privát változót
    }

    constructor(className){//létrehozzuk a konstruktorot
        let containerDiv = document.querySelector('.containoop');//lekérjük a konténer divet
        if(!containerDiv){//ha nem létezik a konténer div
            containerDiv = document.createElement('div');//létrehozzuk a konténer divet
            containerDiv.className = 'containoop';//beállítjuk a class nevét
            document.body.appendChild(containerDiv);//hozzáadjuk a konténer divet a bodyhoz
        }
        this.#div = document.createElement('div');//létrehozzuk a divet
        this.#div.className = className;//beállítjuk a class nevét
        containerDiv.appendChild(this.#div);//hozzáadjuk a divet a konténerhez
    }
}
class Table extends Area {//létrehozzuk a Table osztályt
    constructor(cssClass){//létrehozzuk a konstruktorot
        super(cssClass);//meghívjuk a szülő osztály konstruktorát

        const table = document.createElement('table');//létrehozzuk a táblázatot
        this.div.appendChild(table);//hozzáadjuk a táblázatot a divhez
        const fejlec = document.createElement('thead');//létrehozzuk a fejlécet 
        table.appendChild(fejlec);//hozzáadjuk a fejlécet a táblázathoz
        const fejsor = document.createElement('tr');//létrehozzuk a fejléc sort
        fejlec.appendChild(fejsor);//hozzáadjuk a fejléc sort a fejléchez
        const cella =['forradalom','evszam','sikeres'];//létrehozzuk a cellák tartalmát
        for(const cellatartalom of cella){//végigmegyünk a cellákon
            const fejcell = document.createElement('th');//létrehozzuk a fejléc cellát
            fejcell.innerHTML = cellatartalom;//beállítjuk a cella tartalmát
            fejsor.appendChild(fejcell);//hozzáadjuk a fejléc cellát a fejléc sorhoz
        }
        const tbody = document.createElement('tbody');//létrehozzuk a törzset
        table.appendChild(tbody);//hozzáadjuk a törzset a táblázathoz
    
   
    }
}