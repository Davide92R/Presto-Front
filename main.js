// Navbar
let navbar = document.querySelector(`#navbar`);
let scrollUpBtn = document.querySelector(`.scrollUpBtn`);

console.dir(navbar);

window.addEventListener(`scroll`, ()=>{
    let scrolled = window.scrollY;
    if(scrolled > 0){
        navbar.style.backgroundColor = `rgba(21, 141, 168, 0.8)`;
        scrollUpBtn.classList.remove(`d-none`);
    }else{
        navbar.style.backgroundColor = `rgb(21, 141, 168)`;
        scrollUpBtn.classList.add(`d-none`);
    }
})

// Number section

let firstNumber = document.querySelector (`#firstNumber`);
let secondNumber = document.querySelector (`#secondNumber`);
let thirdNumber = document.querySelector (`#thirdNumber`);

function createInterval (range, speed, element){
    
    let counter = 0;
    let interval = setInterval(()=>{
        
        if(counter < range){
            counter++;
            element.innerHTML = counter;
        }else{
            clearInterval(interval);
        }
    }, speed);
}

IntersectionObserver
let ourNumbers = document.querySelector (`#ourNumbers`);
let confirm = false;
let observer= new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting && confirm==false){
            confirm=true;
            createInterval (1000, 1, firstNumber);
            createInterval (500, 8, secondNumber);
            createInterval (350, 10, thirdNumber);
            
        }
    })
});

observer.observe(ourNumbers);

// Swiper Products

let swiperWrapper = document.querySelector(`.swiper-wrapper`);
let products = [
    {name: `Bonsai Olmo`, country: `China`, price:`69,90`, url:`./media/bonsai-olmo.png`},
    {name: `Bonsai Mirto`, country: `Italy`, price:`25,00`, url: `./media/bonsai-mirto.png`},
    {name: `Acer Buergerianum`, country: `China`, price:`15.000`,url: `./media/acer-buergerianum.png`},
    {name: `Kalapanta Terriccio`, country: `Italy`, price:`12,90`, url: `./media/terriccio-K.jpg`},
    {name: `Vaso Terracotta`, country: `Giappone`, price:`69,00`, url: `./media/vaso-terracotta.png`},
    {name: `Vaso Zen`, country: `Italy`, price:`23,20`, url: `./media/vaso-zen.png`},
]

products.forEach((product)=>{
    let div = document.createElement(`div`);
    div.classList.add(`swiper-slide`);
    div.innerHTML = `
    
    <div class="custom-card-products">
        <img class="card-img-top" src="${product.url}" alt="Card image cap">
        <div class="card-body">
            <p class="h2 text-center color-p">${product.name}</p>
            <p class="card-text text-center">${product.country}</p>
            <p class="text-center h3 color-p">${product.price}</p>
        </div>
    </div>
    
    
    `
    swiperWrapper.appendChild(div);
})



const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // Custom Swiper
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 3,
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
    },
});
