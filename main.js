/**
 * @typedef {{forradalom: string, evszam: number, sikeres: boolean}} forradalom az adatok típusa
 * @type {forradalom[]} array az adatok tömbje
 */
const array = [];//létrehozzuk az üres tömböt   

const containerDiv = makeDiv1('container');//létrehozzuk a konténert
document.body.appendChild(containerDiv);//hozzáadjuk a konténert a bodyhoz
cratetable(containerDiv, (tbody) => {//létrehozzuk a táblázatot
    creatform(tbody, containerDiv, array);//létrehozzuk a formot
    formSzures(containerDiv, tbody, array);//létrehozzuk a szűrés formot
    feltotles(tbody, containerDiv, array);//feltöltjük a táblázatot
    letoltes(containerDiv, array);//létrehozzuk a letöltés gombot
});










