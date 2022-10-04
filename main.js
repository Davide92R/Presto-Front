// Navbar
let navbar = document.querySelector(`#navbar`);
console.dir(navbar);

window.addEventListener(`scroll`, ()=>{
    let scrolled = window.scrollY;
    if(scrolled > 0){
        navbar.style.backgroundColor = `rgba(21, 141, 168, 0.8)`;
    }else{
        navbar.style.backgroundColor = `rgb(21, 141, 168)`;
    }
})