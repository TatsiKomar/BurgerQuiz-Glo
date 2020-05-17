// Глобальный обработчик событий, который отслеживает загрузку контента
document.addEventListener('DOMContentLoaded', function(){
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const burgerBtn = document.getElementById('burger');
    const nextButton = document.querySelector('#next');
    const prevButton = document.querySelector('#prev');
    const modalDialog = document.querySelector('.modal-dialog');
    const sendButton = document.querySelector('#send');
    const modalTitle = document.querySelector('.modal-title');
      

 
    // основной блок данных (вопросы и ответы)
    const questions = [
        {
            question: "Какого цвета бургер?",
            answers: [
                {
                    title: 'Стандарт',
                    url: './image/burger.png'
                },
                {
                    title: 'Черный',
                    url: './image/burgerBlack.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Из какого мяса котлета?",
            answers: [
                {
                    title: 'Курица',
                    url: './image/chickenMeat.png'
                },
                {
                    title: 'Говядина',
                    url: './image/beefMeat.png'
                },
                {
                    title: 'Свинина',
                    url: './image/porkMeat.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Дополнительные ингредиенты?",
            answers: [
                {
                    title: 'Помидор',
                    url: './image/tomato.png'
                },
                {
                    title: 'Огурец',
                    url: './image/cucumber.png'
                },
                {
                    title: 'Салат',
                    url: './image/salad.png'
                },
                {
                    title: 'Лук',
                    url: './image/onion.png'
                }
            ],
            type: 'checkbox'
        },
        {
            question: "Добавить соус?",
            answers: [
                {
                    title: 'Чесночный',
                    url: './image/sauce1.png'
                },
                {
                    title: 'Томатный',
                    url: './image/sauce2.png'
                },
                {
                    title: 'Горчичный',
                    url: './image/sauce3.png'
                }
            ],
            type: 'radio'
        }
    ];

    let clientWidth = document.documentElement.clientWidth;
    
    //регулируем отображение glo.. при изменении ширины окна браузера
    if (clientWidth < 768) {
        burgerBtn.style.display = 'flex';
    } else {
        burgerBtn.style.display = 'none';
    }

    window.addEventListener('resize', function() {
        clientWidth = document.documentElement.clientWidth;
        if (clientWidth < 768) {
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

    //блок обработчиков событий
    let count = -100;
        
    modalDialog.style.top = count + "%";

    const animateModal = () => {
        modalDialog.style.top = count + "%";
        count += 3;
        
        if (count < 0) {
            requestAnimationFrame(animateModal);
        } else {
            count = -100;
        }
    };

    //открываем диалоговое окно
    btnOpenModal.addEventListener('click', () => {
        requestAnimationFrame(animateModal);
        modalBlock.classList.add('d-block');
        playTest();
    });

    //закрываем диалоговое окно
    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');
        burgerBtn.classList.remove('active');
    });

    /* Обработчики событий. Контролируем, чтобы закрытие происходило по клику
    на крестик, а не в любом месте поля */
    document.addEventListener('click', function(event) {
        if(
        !event.target.closest('.modal-dialog') &&
        !event.target.id('.openModalButton') &&
        !event.target.id('.burger')
        ) {
            modalBlock.classList.remove('d-block');
        }
    });
  
    /*Функция, которая запускает квиз - начало тестирования */
    const playTest =() => {
        const finalAnswers = [];
        const obj = {};
        // Переменная с номером вопроса
        let numberQuestion = 0;
        //создаем (рендерим) ответы
        const renderAnswers = (index) => {
            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div');
                answerItem.classList.add('answers-item','d-flex', 'justify-content-center');
                answerItem.innerHTML = `
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
                    <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="${answer.url}" alt="burger">
                    <span>${answer.title}</span>
                    </label>
               `
               //appendChild встраивает  элемент
               formAnswers.appendChild(answerItem);
            });
        };

        //функция рендерит вопросы и ответы, т.е. вписывает информацию в блок с вопросами и ответами
        const renderQuestions = (indexQuestion) => {
            formAnswers.innerHTML = '';

            if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                questionTitle.textContent = `${questions[indexQuestion].question}`;
                renderAnswers(indexQuestion);
                nextButton.classList.remove('d-none');
                prevButton.classList.remove('d-none');
                sendButton.classList.add('d-none');
            }
            if (numberQuestion === 0) {
                prevButton.classList.add('d-none');
            }

            if (numberQuestion === questions.length) {
                questionTitle.textContent = '';
                modalTitle.textContent = '';
                nextButton.classList.add('d-none');
                prevButton.classList.add('d-none');
                sendButton.classList.remove('d-none');

                formAnswers.innerHTML = `
                    <div class="form-group">
                        <label for="numberPhone">Enter your number</label>
                        <input type="phone" class="form-control" id="numberPhone">
                    </div>
                `;

                const numberPhone = document.getElementById('numberPhone');
                numberQuestion.addEventListener('input', (event) => {
                    event.target.value = event.target.value.replace(/[^0-9+-]/, '');
                });
            }

            if (numberQuestion === questions.length + 1) {
                formAnswers.textContent = 'Спасибо за пройденный тест!';
                
                for(let key in obj) {
                    let newObj = {};
                    newObj[key] = obj[key];
                    finalAnswers.push(newObj);
                }


                setTimeout(() => {
                    modalBlock.classList.remove('d-block');
                }, 2000);
            }
       };

        //запуск функции рендеринга
        renderQuestions(numberQuestion);

        const checkAnswer = () => {
            
            const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');
            
            inputs.forEach((input, index) => {
                if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                    obj[`${index}_${questions[numberQuestion].question}`] = input.value;
                }
                if (numberQuestion === questions.length) {
                    obj['Номер телефона'] = input.value;
                }
            });
            
           // finalAnswers.push(obj);
        };

        // обработчики событий кнопки след/предыдущий вопрос
        nextButton.onclick = () => {
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion);
        };

        prevButton.onclick = () => {
            numberQuestion--;
            renderQuestions(numberQuestion);
        };
        sendButton.onclick = () => {
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion);

            
        }
    };
    
});


