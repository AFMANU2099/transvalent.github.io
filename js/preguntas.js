let question = document.querySelectorAll('.question');
let btnDropdown = document.querySelectorAll('.question .more');
let answer = document.querySelectorAll('.answer');
let parrafo = document.querySelectorAll('.answer p');


for(let i = 0; i < btnDropdown.length; i ++){

    let altoparrafo = parrafo[i].clientHeight;
    let switchc = 0;

    btnDropdown[i].addEventListener('click', () => {
        if (switchc == 0){
            
            answer[i].style.height = `${altoparrafo}px`;
            question[i].style.marginBottom ='10px';
            btnDropdown[i].innerHTML = '<i>-</i>';
            switchc++;
            console.log(answer[i].style.height = `${altoparrafo}px`);
        } 

        else if (switchc == 1){
            
            answer[i].style.height = `0`;
            question[i].style.marginBottom ='0';
            btnDropdown[i].innerHTML = '<i>+</i>';
            switchc--;

        } 
    })
}
