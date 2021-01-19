(() => {
  const containerElem = document.querySelector('.container');
  const openCardsArray = [];
  const winArray = [];
  const cleanContent = () => {
    while (containerElem.firstChild) {
      containerElem.removeChild(containerElem.firstChild);
    }
  }

  // function getNumber () {

  //   const inputWrpElem = document.createElement('form');
  //   inputWrpElem.classList.add('input-wrp')
  //   const inputElem = document.createElement('input');
  //   inputElem.classList.add('input')
  //   const buttonElem = document.createElement('button');
  //   buttonElem.classList.add('input__btn')
  //   buttonElem.textContent = 'Подтвердить';
  //   const titleElem = document.createElement('h2')
  //   titleElem.textContent = 'Введите число карт для игры от 4 до 16'
  //   titleElem.classList.add('caption')

  //   containerElem.append(titleElem)
  //   containerElem.append(inputWrpElem)
  //   inputWrpElem.append(inputElem)
  //   inputWrpElem.append(buttonElem)

  // }

  function createNumbersArray (numberOfCards) {
    const cardsArray = [];
    const numbersArray = [];

    for (let i = 0; i < numberOfCards; i++) {
        numbersArray.push(i+1)
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
      var j, temp;
      for(var i = arr.length - 1; i > 0; i--){
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

  function createGameField (cardsArray) {

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
                console.log(winArray)
                openCardsArray.length = 0

                if (winArray.length === 16) {
                  openCardsArray.length = 0
                  winArray.length = 0
                  cleanContent();

                  const congratsElem = document.createElement('div')
                  congratsElem.classList.add('modal')
                  const congratsTextElem = document.createElement('h2')
                  congratsTextElem.classList.add('caption')
                  congratsTextElem.textContent = 'Вы выиграли. Хотите сыграть еще?'
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

function startGame () {
  cleanContent()
  let cards = createNumbersArray(8);
  createGameField(cards)
}

startGame();



})();
