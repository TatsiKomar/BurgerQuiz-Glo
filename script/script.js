document.addEventListener('DOMContentLoaded', function(){
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const burgerBtn = document.getElementById('burger');
    

    let clientWidth = document.documentElement.clientWidth;

    if(clientWidth < 768) {
        burgerBtn.style.display = 'flex';
    } else {
        burgerBtn.style.display = 'none';
    }

    window.addEventListener('resize', function() {
        clientWidth = document.documentElement.clientWidth;
        if(clientWidth < 768) {
            burgerBtn.style.display = 'flex';
        } else {
            burgerBtn.style.display = 'none';
        }
    });

    burgerBtn.addEventListener('click', function() {
        burgerBtn.classList.add('active');
        modalBlock.classList.add('d-block');
        playTest();
    });

    btnOpenModal.addEventListener('click', () => {
        modalBlock.classList.add('d-block');
        playTest();
    });

    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');
        burgerBtn.classList.remove('active');
    });

    document.addEventListener('click', function(event) {
        if(
        !event.target.closest('.modal-dialog') &&
        !event.target.id('.openModalButton') &&
        !event.target.id('.burger')
        ) {
            modalBlock.classList.remove('d-block');
        }
    });
  

    const playTest =() => {
        const renderQuestions = () => {
            questionTitle.textContent = "Какого цвета бургер Вы хотите?";
            const name = 'Стандарт';
            const img = './image/burger.png';
            formAnswers.innerHTML = `
                <div class="answers-item d-flex flex-column">
                    <input type="radio" id="answerItem1" name="answer" class="d-none">
                     <label for="answerItem1" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="${img}" alt="burger">
                    <span>${name}</span>
                    </label>
                </div>
            `
        }
        renderQuestions();
    };

});


