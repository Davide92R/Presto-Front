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

    function filterByCategory(categoria){

        if(categoria != `All`){
            let filtered = data.filter((prodotto)=> prodotto.category == categoria);
            showCards(filtered);
        } else {
            showCards(data);
        }



    }

    let checkInputs = document.querySelectorAll(`.form-check-input`);

    checkInputs.forEach((categoryInput)=>{

        categoryInput.addEventListener(`click`, ()=>{


            filterByCategory(categoryInput.id);
        })
    })

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

    function filterByPrice(prezzo){
        let filtered = data.filter((annuncio)=> +annuncio.price <= +prezzo);
        showCards(filtered)
    }
    priceInput.addEventListener(`input`, ()=>{
        filterByPrice(priceInput.value);
        incrementNumber.innerHTML = `${priceInput.value}`;
    })

    let wordInput = document.querySelector(`#wordInput`);

    function filterByWord(nome){

        if(nome.length > 1){
            let filtered = data.filter((annuncio)=> annuncio.name.toLowerCase().includes(nome.toLowerCase()));
            showCards(filtered);
        } else{
            let filtered = data.filter((annuncio)=> annuncio.name[0].toLowerCase().includes(nome.toLowerCase()));
            showCards(filtered);
        }

    }
    
    wordInput.addEventListener(`input`, ()=>{
        filterByWord(wordInput.value);
    })
})