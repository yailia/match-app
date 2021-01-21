(() => {
  const containerElem = document.querySelector('.container');
  const openCardsArray = [];
  const winArray = [];
  const cleanContent = () => {
    while (containerElem.firstChild) {
      containerElem.removeChild(containerElem.firstChild);
    }
  }

  const popUp = modalText => {
    const congratsElem = document.createElement('div')
    congratsElem.classList.add('modal')
    const congratsTextElem = document.createElement('h2')
    congratsTextElem.classList.add('caption')
    congratsTextElem.textContent = modalText
    const btnWrpElem = document.createElement('div')
    btnWrpElem.classList.add('btn__wrp')
    const yesBtn = document.createElement('button')
    const noBtn = document.createElement('button')
    yesBtn.textContent = 'Да'
    noBtn.textContent = 'Нет'
    yesBtn.classList.add('btn')

    yesBtn.addEventListener('click', () => {
      startGame();
    })
    noBtn.addEventListener('click', cleanContent)
    noBtn.classList.add('btn')
    containerElem.append(congratsElem)
    congratsElem.append(congratsTextElem)
    congratsElem.append(btnWrpElem)
    btnWrpElem.append(yesBtn)
    btnWrpElem.append(noBtn)
  }

  const getNumber = () => {

    const inputWrpElem = document.createElement('form');
    inputWrpElem.classList.add('input-wrp')
    const inputElem = document.createElement('input');
    inputElem.classList.add('input')
    const buttonElem = document.createElement('button');
    buttonElem.classList.add('btn')
    buttonElem.textContent = 'Подтвердить';
    const titleElem = document.createElement('h2')
    titleElem.textContent = 'Введите число карт в столбце/строке от 2 до 10'
    titleElem.classList.add('caption')

    containerElem.append(titleElem)
    containerElem.append(inputWrpElem)
    inputWrpElem.append(inputElem)
    inputWrpElem.append(buttonElem)
    inputElem.focus();

    return {
      inputWrpElem,
      inputElem
    }

  }

  const createNumbersArray = numberOfCards => {
    cleanContent();
    const cardsArray = [];
    const numbersArray = [];

    for (let i = 0; i < numberOfCards; i++) {
        numbersArray.push(i+1)
    }
    for (let i = 0; i < numbersArray.length; i++){
        let card = {};
        card.id = i+1;
        card.content = numbersArray[i]
        card.show = false
        cardsArray.push(card)
    }

    function shuffle(arr){
      let j, temp;
      for(let i = arr.length - 1; i > 0; i--){
        j = Math.floor(Math.random()*(i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
      return arr;
    }


    let shuffledArray = shuffle(cardsArray)
    console.log(shuffledArray)
    return shuffledArray
  }

  const createGameField = cardsArray => {
    const timer = () => {
      let  min = 60;
      const timerText = document.createElement('div')
      timerText.classList.add('timer')

      const countdown = () => {
        if (winArray.length != cardsArray.length){
          if (min > 0){
            min --
            return timerText.textContent = 'Осталось времени: ' + min + 'сек',
            containerElem.prepend(timerText)
            }
            else
            min = 60;
            cleanContent();
            return popUp('Время вышло. Хотите сыграть еще?'),
            clearInterval(intervalID);
          }

          else clearInterval(intervalID);
        }


      let intervalID = setInterval(countdown, 1000);
    }
    timer();

    for(let i = 0; i < cardsArray.length; i++) {
      let cardObj = cardsArray[i];
      let id = cardObj.id;
      const cardElem = document.createElement('button');
      const cardContentElem = document.createElement('span');

      cardElem.classList.add('card', 'hide');
      cardElem.setAttribute('id', id)
      cardContentElem.classList.add('card__content');
      cardContentElem.textContent = cardObj.content
      containerElem.append(cardElem)
      cardElem.append(cardContentElem)
      cardElem.addEventListener('click', () => {
          if (openCardsArray.length === 0) {
            cardElem.classList.remove('hide')
            openCardsArray.push(cardObj)
          }
          else if (openCardsArray.length === 1) {
            cardElem.classList.remove('hide')
            openCardsArray.push(cardObj)


              let firstCard = openCardsArray[0]
              let secondCard = openCardsArray[1]

              if (firstCard.content === secondCard.content && firstCard.id != secondCard.id ){
                let firstWinCard = document.getElementById(firstCard.id);
                let secondWinCard = document.getElementById(secondCard.id);
                firstWinCard.setAttribute('disabled', 'disabled')
                secondWinCard.setAttribute('disabled', 'disabled')
                winArray.push(firstWinCard);
                winArray.push(secondWinCard);
                openCardsArray.length = 0

                if (winArray.length === cardsArray.length) {
                  cleanContent();
                  popUp('Вы выиграли. Хотите сыграть еще?')
                }


              }
              else {
                let notWinFirst = document.getElementById(firstCard.id);
                let notWinSecond = document.getElementById(secondCard.id);
                openCardsArray.length = 0
                setTimeout(()=>{
                  notWinFirst.classList.add('hide')
                  notWinSecond.classList.add('hide')
                  return
                },500)
          }
          }
    })
    }
  }

const startGame = () => {
    cleanContent();
    openCardsArray.length = 0
    winArray.length = 0

  let makeNumber = getNumber();

  makeNumber.inputWrpElem.addEventListener('submit', (e) => {
    e.preventDefault;
    const inputInt = makeNumber.inputElem.value * 1
    const numberOfCards = inputInt * inputInt
    console.log(numberOfCards)

    if (!parseInt(inputInt)) {
      alert('Введите число')
      return
    }

    if (inputInt % 2 != 0) {
     alert('Число должно быть четным')
     return startGame();
   }

    if (inputInt < 1) {
      alert('Введите число, больше 1')
      return startGame();
    }

    if (inputInt > 11) {
      alert('Введите число, меньше 10')
      return startGame();
    }
    let cards = createNumbersArray(numberOfCards)
    createGameField(cards)
  })
}

startGame();

})();