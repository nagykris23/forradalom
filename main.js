const array = [];//létrehozzuk az üres tömböt   
const makeDiv1 = (className) => {//arroww functione seggíttségével hozzuk létre a divet
    const div = document.createElement('div');//létrehozzuk a divet
    div.className = className;//beállítjuk a class nevét
    return div;//visszaadjuk a divet
}
const containerDiv = makeDiv1('container');//létrehozzuk a konténert
document.body.appendChild(containerDiv);//hozzáadjuk a konténert a bodyhoz
cratetable(containerDiv, (tbody) => {//létrehozzuk a táblázatot
    creatform(tbody, containerDiv, array);//létrehozzuk a formot
    formSzures(containerDiv, tbody, array);//létrehozzuk a szűrés formot
    feltotles(tbody, containerDiv, array);//feltöltjük a táblázatot
    letoltes(containerDiv, array);//létrehozzuk a letöltés gombot
});










