class Area{//létrehozzuk az Area osztályt
    constructor(className){//létrehozzuk a konstruktorot
        let containerDiv = document.querySelector('.containoop');//lekérjük a konténer divet
        if(!containerDiv){//ha nem létezik a konténer div
            containerDiv = document.createElement('div');//létrehozzuk a konténer divet
            containerDiv.className = 'containoop';//beállítjuk a class nevét
            document.body.appendChild(containerDiv);//hozzáadjuk a konténer divet a bodyhoz
        }
        const div = document.createElement('div');//létrehozzuk a divet
        div.className = className;//beállítjuk a class nevét
        containerDiv.appendChild(div);//hozzáadjuk a divet a konténerhez
    }
}