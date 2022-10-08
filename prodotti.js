

fetch(`./presto.json`).then( (response)=> response.json()).then((data)=>{

    let categoryWrapper = document.querySelector(`#categoryWrapper`);
    let cardWrapper = document.querySelector(`#cardWrapper`);

    function setCategoryFilters(){
        let categories = data.map((annuncio)=> annuncio.category);
    
        let uniqueCategories = [];

        categories.forEach((category)=>{
            if(!uniqueCategories.includes(category)){
                uniqueCategories.push(category);
            }
        })

        uniqueCategories.forEach((category)=>{
            let div = document.createElement(`div`);
            div.classList.add(`form-check`);
            div.innerHTML = `
            
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="${category}">
            <label class="form-check-label" for="${category}">
              ${category}
            </label>
            
            `
            categoryWrapper.appendChild(div);
        })

    }

    setCategoryFilters();

    function showCards(array){

        cardWrapper.innerHTML = ``;

        array.sort((a,b)=> +a.price - +b.price)

        array.forEach((element)=>{
            let div = document.createElement(`div`);
            div.classList.add(`products-card`);
            div.innerHTML = `
            
                <p class="h3"> ${element.name} </p>
                <p class="h4"> ${element.category} </p>
                <p class="lead fw-bold"> ${element.price} € </p>
            
            `
            cardWrapper.appendChild(div);
        })

    }
    showCards(data);

    let checkInputs = document.querySelectorAll(`.form-check-input`);

    function filterByCategory(array){

    // let arrayFromNodeList = Array.from(checkInputs);
    // let button = array.find((bottone)=> bottone.checked);
    // let categoria = button.id;

    // Quello precedente è un altro modo per indicare il let categoria sotto tutto concatenato, ma rappresentai singoli passaggi che stanno avvenendo su quell'unica riga di codice concatenata.

    let categoria = Array.from(checkInputs).find((bottone)=> bottone.checked).id;

        if(categoria != `All`){
            let filtered = array.filter((prodotto)=> prodotto.category == categoria);
            return filtered;
        } else {
            return data;
        }
    }


    let priceInput = document.querySelector (`#priceInput`);
    let incrementNumber = document.querySelector (`#incrementNumber`);

    function setPriceInput(){
        
        let prices = data.map((annuncio)=> +annuncio.price);
        let maxPrice = Math.max(...prices);
        priceInput.max = Math.ceil(maxPrice);
        priceInput.value = Math.ceil(maxPrice);
        incrementNumber.innerHTML = Math.ceil(maxPrice);
    }

    setPriceInput();

    function filterByPrice(array){
        let filtered = array.filter((annuncio)=> +annuncio.price <= +priceInput.value);
        return filtered;
    }


    let wordInput = document.querySelector(`#wordInput`);

    function filterByWord(array){

        let nome = wordInput.value

        if(nome.length > 1){
            let filtered = array.filter((annuncio)=> annuncio.name.toLowerCase().includes(nome.toLowerCase()));
            return filtered;
        } else{
            let filtered = array.filter((annuncio)=> annuncio.name[0].toLowerCase().includes(nome.toLowerCase()));
            return filtered;

        }

    }
    

    function globalFilter(){
        let filteredByCategory = filterByCategory(data);
        let filteredByPrice = filterByPrice(filteredByCategory);
        let filteredByWord = filterByWord(filteredByPrice);

        showCards(filteredByWord);
    }

    checkInputs.forEach((categoryInput)=>{
        categoryInput.addEventListener(`click`, ()=>{
            globalFilter();
            console.log();
        })
    })

    priceInput.addEventListener(`input`, ()=>{
        incrementNumber.innerHTML = priceInput.value;
            globalFilter();

    })

    wordInput.addEventListener(`input`, ()=>{
        globalFilter();
    })

})