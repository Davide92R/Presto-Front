let opener = document.querySelector (`.opener`);
let movedDivs = document.querySelectorAll (`.moved`);
let cardWrapper = document.querySelector (`#cardWrapper`);

let confirm = false

let people =[
    {name: `Walter`, role: [`Imprenditore`], url:`./media/Walter_White.png`},
    {name: `Jesse`, role: [`Giardiniere, Esperto di piante e non solo...`], url:`./media/Jesse.png`},
    {name: `Soul`, role: [`Avvocato aziendale`], url:`./media/Soul.png`},
    {name: `Mike`, role: [`Guardia del corpo, tutto fare!`], url:`./media/mike-ehrmantraut.png`}
]

movedDivs.forEach((moved, i)=>{
    moved.style.backgroundImage = `url(${people[i].url})`;

    moved.addEventListener(`click`, ()=>{
        console.log(people[i]);
        cardWrapper.innerHTML = ``;

        let div = document.createElement(`div`);
        div.classList.add(`peopleCard`);
        div.innerHTML = `
            <p class="h3 pt-3">${people[i].name}</p>
            <p class=" text-center h5 pt-3">${people[i].role}</p>
        `
        cardWrapper.appendChild(div);
        let card = document.querySelector (`.peopleCard`);

        card.style.backgroundImage = `url(${people[i].url})`;

    })

    
})



opener.addEventListener (`click`, ()=>{

    if(confirm == false){
        confirm = true;
        opener.style.transform = `rotate(180deg)`;
        movedDivs.forEach((moved, i)=>{
            let angle = (360* i) / movedDivs.length;
            moved.style.transform = `rotate(${angle}deg) translate(200px) rotate(-${angle}deg)`;
        })
    }else{
        confirm = false
        opener.style.transform = `rotate(0deg)`;
        cardWrapper.innerHTML = ``;
        movedDivs.forEach((moved, i)=>{
            let angle = (360* i) / movedDivs.length;
            moved.style.transform = `rotate(0deg) translate(0px)`;
        })
    }

})