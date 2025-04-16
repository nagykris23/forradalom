/**
 * 
 * @param {string} className div osztálya amelyet létrehozunk
 * @returns {HTMLElement} létrehozott div elem
 */
const makeDiv1 = (className) => {//arroww functione seggíttségével hozzuk létre a divet
    const div = document.createElement('div');//létrehozzuk a divet
    div.className = className;//beállítjuk a class nevét
    return div;//visszaadjuk a divet
}


/**
 * 
 * @param {forradalom[]} adatarray bemeneti  tömb amelyet szűrni szeretnénk
 * @param {function(forradalom):boolean} callback a szűrő függvény amelyet alkalmazni szeretnénk
 * @returns 
 */
const filter = (adatarray, callback) => {//létrehozzuk a szűrő függvényt
    const filteredArray = [];//létrehozzuk az üres tömböt
    for (const elem of adatarray) {//végigmegyünk a tömb elemein
        if (callback(elem)) {//ha a callback függvény igazat ad vissza
            filteredArray.push(elem);//hozzáadjuk az elemet az új tömbhöz
        }
    }
    return filteredArray;//visszaadjuk az új tömböt

}
/**
 * 
 * @param {HTMLElement} containerDiv  a konténer div amelyhez hozzáadjuk a táblázatot
 * @param {function(htmlElement):void }callback callback függvény amelyet a táblázat törzsének létrehozásához használunk
 */
const cratetable =(containerDiv, callback) => {//létrehozzuk a táblázatot
    const tableDiv = makeDiv1('table')////létrehozzuk a táblázat divet
    containerDiv.appendChild(tableDiv);//hozzáadjuk a táblázat divet a konténerhez

    const table = document.createElement('table');//létrehozzuk a táblázatot
    tableDiv.appendChild(table);//hozzáadjuk a táblázatot a táblázat divhez

    const thead = document.createElement('thead');//létrehozzuk a fejlécet
    table.appendChild(thead);//hozzáadjuk a fejlécet a táblázathoz

    const theadrow = document.createElement('tr');//létrehozzuk a fejléc sort   
    thead.appendChild(theadrow);//hozzáadjuk a fejléc sort a fejléchez

    const theadcell = ['forradalom', 'evszam', 'sikeres'];//létrehozzuk a fejléc cellákat   
    for(const cellatartalom of theadcell)//végigmegyünk a fejléc cellákon
    {
        const cella = document.createElement('th');//létrehozzuk a fejléc cellát
        cella.textContent = cellatartalom;//beállítjuk a fejléc cella tartalmát
        theadrow.appendChild(cella);//hozzáadjuk a fejléc cellát a fejléc sorhoz
    }
    const tbody = document.createElement('tbody');//létrehozzuk a törzset
    table.appendChild(tbody);//hozzáadjuk a törzset a táblázathoz
    callback(tbody);//visszaadjuk a törzset


}
/**
 * 
 * @param {HTMLTableSectionElement} tbody  a táblázat törzse amelyhez hozzáadjuk az új sort
 * @param {htmlElement} containerDiv  a konténer div amelyhez hozzáadjuk a fájl feltöltő mezőt
 * @param {{forradalom: string, evszam: string, sikeres: string}[]} array   a tömb amelyhez hozzáadjuk az új elemet
 */
const feltotles = (tbody, containerDiv,array) => {//létrehozzuk a feltöltés függvényt
    const fileupinput = document.createElement('input');//létrehozzuk a fájl feltöltő mezőt
    containerDiv.appendChild(fileupinput);//hozzáadjuk a fájl feltöltő mezőt a konténerhez
    fileupinput.id = 'fileupinput';//beállítjuk a fájl feltöltő mező azonosítóját
    fileupinput.type = 'file';//beállítjuk a fájl feltöltő mező típusát
    fileupinput.addEventListener('change', (e) => {//hozzáadunk egy eseménykezelőt a fájl feltöltő mezőhöz
        const valasztottfile = e.target.files[0];//lekérjük a fájlt
        const fileReader = new FileReader();//létrehozzuk a fájl olvasót

        fileReader.onload = () => {//hozzáadunk egy eseménykezelőt a fájl olvasóhoz
            const filetartalom = fileReader.result.split('\n');//felosztjuk a fájl tartalmát sorokra
            const removehead = filetartalom.slice(1);//eltávolítjuk az első sort
            for(const sor of removehead){
                const trimline = sor.trim();//eltávolítjuk a felesleges szóközöket
                const mezo = trimline.split(';');//felosztjuk a sort mezőkre
                const forradalom = {
                    forradalom: mezo[0],//beállítjuk a mező értékét
                    evszam: mezo[1],//beállítjuk a mező értékét
                    sikeres: mezo[2]//beállítjuk a mező értékét
                }
                array.push(forradalom);//hozzáadjuk a mezőt a tömbhöz
                const ujSor = document.createElement('tr');//létrehozzuk az új sort
                tbody.appendChild(ujSor);//hozzáadjuk az új sort a törzshöz
                const forradalomcell = document.createElement('td');//létrehozzuk a cellát
                forradalomcell.textContent = forradalom.forradalom;//beállítjuk a cella tartalmát
                ujSor.appendChild(forradalomcell);//hozzáadjuk a cellát az új sorhoz
                const evszamcell = document.createElement('td');//létrehozzuk a cellát
                evszamcell.textContent = forradalom.evszam;//beállítjuk a cella tartalmát
                ujSor.appendChild(evszamcell);//hozzáadjuk a cellát az új sorhoz
                const sikerescella = document.createElement('td');//létrehozzuk a cellát
                sikerescella.textContent = forradalom.sikeres;//beállítjuk a cella tartalmát
                ujSor.appendChild(sikerescella);//hozzáadjuk a cellát az új sorhoz

            }
        }
            fileReader.readAsText(valasztottfile);//beolvassuk a fájlt szövegként   
    })
    
}
/**
 * 
 * 
 * @param {HTMLSelectionElement} tbody a táblázat törzse amelyhez hozzáadjuk az új sort
 * @param {HTMLElement} containerDiv  a konténer div amelyhez hozzáadjuk a fájl feltöltő mezőt
 * @param {{forradalom:string,evszam:string,sikeres:string}[]} array  a tömb amelyhez hozzáadjuk az új elemet
 */
const creatform =(tbody, containerDiv,array ) => {//létrehozzuk a formot
    const formdiv = makeDiv1('formdiv');//létrehozzuk a form divet

    const form = document.createElement('form');//létrehozzuk a formot
    formdiv.appendChild(form);//hozzáadjuk a formot a form divhez

    const felement= [{
        fieldid: 'forradalom',//létrehozzuk a mező azonosítóját
        fieldlabel: 'forradalom'//létrehozzuk a mező címkéjét
    },
    {
        fieldid: 'evszam',//létrehozzuk a mező azonosítóját
        fieldlabel: 'evszam'//létrehozzuk a mező címkéjét
    }, {
        fieldid: 'sikeres',//létrehozzuk a mező azonosítóját
        fieldlabel: 'sikeres'//létrehozzuk a mező címkéjét
    }];//létrehozzuk a mezők listáját
    for (const elem of felement) {//végigmegyünk a mezők listáján
       const field = makeDiv1('field');//létrehozzuk a mezőt
           
            form.appendChild(field);//hozzáadjuk a mezőt a formhoz
    
            const label = document.createElement('label');//létrehozzuk a címkét
            label.htmlFor = elem.fieldid;//beállítjuk a címke azonosítóját
            label.textContent = elem.fieldlabel;//beállítjuk a címke tartalmát
            field.appendChild(label);//hozzáadjuk a címkét a mezőhöz

            field.appendChild(document.createElement('br'));//hozzáadunk egy sortörést a mezőhöz
            if(elem.fieldid === 'sikeres'){//ha a mező azonosítója sikeres
                bemenet = document.createElement('select');//létrehozzuk a legördülő menüt
                bemenet.id = elem.fieldid;//beállítjuk a mező azonosítóját

                const opcioigen = document.createElement('option');//létrehozzuk az opciót
                opcioigen.value = 'igen';//beállítjuk az opció értékét
                opcioigen.innerText = 'igen';//beállítjuk az opció szövegét

                const opcionem = document.createElement('option');//létrehozzuk az opciót
                opcionem.value = 'nem';//beállítjuk az opció értékét
                opcionem.innerText = 'nem';//beállítjuk az opció szövegét
                
                bemenet.appendChild(opcioigen);//hozzáadjuk az opciót a legördülő menühöz
                bemenet.appendChild(opcionem);//hozzáadjuk az opciót a legördülő menühöz
            }
            else{////ha a mező azonosítója nem sikeres
                bemenet = document.createElement('input');//létrehozzuk a bemeneti mezőt
                bemenet.id = elem.fieldid;//beállítjuk a mező azonosítóját
                
            }
            field.appendChild(bemenet);//hozzáadjuk a bemeneti mezőt a mezőhöz

            field.appendChild(document.createElement('br'));//hozzáadunk egy sortörést a mezőhöz
            const errorspan = document.createElement('span');//létrehozzuk a hiba üzenetet
            errorspan.className = 'error';//beállítjuk a hiba üzenet osztályát
            field.appendChild(errorspan);//hozzáadjuk a hiba üzenetet a mezőhöz

    }
    const button = document.createElement('button');//létrehozzuk a gombot
    button.textContent = 'hozzaadas';//beállítjuk a gomb szövegét
    form.appendChild(button);//hozzáadjuk a gombot a formhoz

    form.addEventListener('submit', (e) => {//hozzáadunk egy eseménykezelőt a formhoz
        e.preventDefault();//megakadályozzuk az alapértelmezett eseményt
        const ertekek = {};//létrehozzuk az üres objektumot
        const bemenetiMezok = e.target.querySelectorAll('input, select');//lekérjük a bemeneti mezőket
        let valid = true;//beállítjuk a valid változót igazra

        for (const mezok of bemenetiMezok) {//végigmegyünk a bemeneti mezőkön
            const errormezo = mezok.parentElement.querySelector('.error');//lekérjük a hiba üzenetet
            if(!errormezo){//ha nincs hiba üzenet
                console.log('nincs hiba üzenet');//kiírjuk a konzolra
                return;//visszatérünk

            }
            errormezo.textContent = '';//kiürítjük a hiba üzenetet
            if (mezok.value === '') {//ha a mező üres
                errormezo.textContent = 'Kötelező megadni';//beállítjuk a hiba üzenetet
                valid = false;//beállítjuk a valid változót hamisra
            }
            ertekek[mezok.id] = mezok.value;//beállítjuk az objektum értékét
        }
        if(valid){//ha a valid változó igaz
            array.push(ertekek);//hozzáadjuk az objektumot a tömbhöz
            sorhozzaadas(tbody, ertekek);//hozzáadjuk az új sort a táblázathoz
    }

})
    containerDiv.appendChild(formdiv);//hozzáadjuk a form divet a konténerhez
}

/**
 * 
 * @param {HTMLSelectElement} tbody  a táblázat törzse amelyhez hozzáadjuk az új sort
 * @param {{forradalom:string,evszam:string,sikeres:string}} ertekek  a mező értékei amelyeket hozzáadunk az új sorhoz
 */
const sorhozzaadas = (tbody, ertekek) => {//létrehozzuk a sor hozzáadás függvényt
        const ujSor = document.createElement('tr');//létrehozzuk az új sort
        tbody.appendChild(ujSor);//hozzáadjuk az új sort a törzshöz

        const forrcella = document.createElement('td');//létrehozzuk a cellát
        forrcella.textContent = ertekek.forradalom;//beállítjuk a cella tartalmát
        ujSor.appendChild(forrcella);//hozzáadjuk a cellát az új sorhoz
        const evszamcell = document.createElement('td');//létrehozzuk a cellát
        evszamcell.textContent = ertekek.evszam;//beállítjuk a cella tartalmát
        ujSor.appendChild(evszamcell);//hozzáadjuk a cellát az új sorhoz
        const sikerescella = document.createElement('td');//létrehozzuk a cellát
        sikerescella.textContent = ertekek.sikeres;//beállítjuk a cella tartalmát
        ujSor.appendChild(sikerescella);//hozzáadjuk a cellát az új sorhoz
}
/**
 * 
 * @param {HTMLElement} containerDiv  konténer div amelyhez hozzáadjuk a letöltés gombot
 * @param {{forradolom:String,evszam:String,sikeres:String}[]} array  tömb amelyet letölteni szeretnénk
 */
const letoltes = (containerDiv,array) => {//létrehozzuk a letöltés függvényt
    const letoltesgomb = document.createElement('button');//létrehozzuk a letöltés gombot
    letoltesgomb.textContent = 'letoltes';//beállítjuk a gomb szövegét
    containerDiv.appendChild(letoltesgomb);//hozzáadjuk a gombot a konténerhez

    letoltesgomb.addEventListener('click', () => {//hozzáadunk egy eseménykezelőt a gombhoz
        const link = document.createElement('a');//létrehozzuk a linket

        const tartalom =['forradalom;evszam;sikeres'];//létrehozzuk a tartalmat
        for (const adat of array) {//végigmegyünk a tömb elemein
            tartalom.push(`${adat.forradalom};${adat.evszam};${adat.sikeres}`);//hozzáadjuk az elemet a tartalomhoz
       
        }
        const fileTartalom = tartalom.join('\n');//összefűzzük a tartalmat
        const file = new Blob([fileTartalom]);//létrehozzuk a fájlt

        link.href = URL.createObjectURL(file);//beállítjuk a link href értékét
        link.download = 'forradalom.csv';//beállítjuk a letöltési nevet
        link.click();//kattintunk a linkre
        URL.revokeObjectURL(link.href);//eltávolítjuk a linket
    });
}
/**
 * 
 * @param {HTMLElement} containerDiv a konténer div amelyhez hozzáadjuk a form szűrést
 * @param {HTMLElement} tbody  a táblázat törzse amelyhez hozzáadjuk a szűrést
 * @param {{forradalom:string,evszam:string,sikeres:string}[]} array  a tömb amelyet szűrni szeretnénk
 */
const formSzures = (containerDiv,tbody, array) => {//létrehozzuk a form szűrés függvényt
    const formdiv = makeDiv1('formdiv');//létrehozzuk a form divet
    containerDiv.appendChild(formdiv);//hozzáadjuk a form divet a konténerhez

    const form = document.createElement('form');//létrehozzuk a formot
    formdiv.appendChild(form);//hozzáadjuk a formot a form divhez

    const fselect = document.createElement('select');//létrehozzuk a legördülő menüt
    form.appendChild(fselect);//hozzáadjuk a legördülő menüt a formhoz

    const opciok =[
    {
        fieldid: '',//létrehozzuk a mező azonosítóját
        fieldlabel: 'valassz'//létrehozzuk a mező címkéjét
    },
    {
        fieldid: 'forradalom',//létrehozzuk a mező azonosítóját
        fieldlabel: 'forradalom'//létrehozzuk a mező címkéjét
    },
    {
        fieldid: 'evszam',//létrehozzuk a mező azonosítóját
        fieldlabel: 'evszam'//létrehozzuk a mező címkéjét
    }, {
        fieldid: 'sikeres',//létrehozzuk a mező azonosítóját
        fieldlabel: 'sikeres'//létrehozzuk a mező címkéjét
    }]
    for(const opcio of opciok)//végigmegyünk az opciókon
    {
        const opcioelem = document.createElement('option');//létrehozzuk az opciót
        opcioelem.value = opcio.fieldid;//beállítjuk az opció értékét
        opcioelem.innerText = opcio.fieldlabel;//beállítjuk az opció szövegét
        fselect.appendChild(opcioelem);//hozzáadjuk az opciót a legördülő menühöz
       
    }
    const input = document.createElement('input');//létrehozzuk a bemeneti mezőt
    input.id = 'szuresinput';//beállítjuk a mező azonosítóját
    form.appendChild(input);//hozzáadjuk a bemeneti mezőt a formhoz

    const button = document.createElement('button');//létrehozzuk a gombot
    button.innerText = 'szures';//beállítjuk a gomb szövegét
    form.appendChild(button);//hozzáadjuk a gombot a formhoz

    const talalt = document.createElement('p');//létrehozzuk a találatok számát
    formdiv.appendChild(talalt);//hozzáadjuk a találatok számát a form divhez

    form.addEventListener('submit', (e) => {//hozzáadunk egy eseménykezelőt a formhoz
        e.preventDefault();//megakadályozzuk az alapértelmezett eseményt

        const szuresinput =  e.target.querySelector('#szuresinput').value;//lekérjük a bemeneti mezőt
        const szuresselect = e.target.querySelector('select').value;//lekérjük a legördülő menüt

        
        if (szuresselect === '') {//ha a legördülő menü üres
            talalt.innerText = '';//kiürítjük a találatok számát
            return;//visszatérünk
        }

        let db = 0;//letrehozzuk a találatok számát
        for (const elem of array) {//végigmegyünk a tömb elemein
            if (elem[szuresselect] === szuresinput) {//ha a mező értéke megegyezik a bemeneti mező értékével
                db++;//növeljük a találatok számát
            }
        }

        talalt.innerText = `Találatok száma: ${db}`;//beállítjuk a találatok számát
     

    });
}