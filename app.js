/**
 * Memory Game in Javascript
 * Created by Carlos E. Torres
 * https://cetorres.com
 * cetorres@cetorres.com
 * Date: 04/11/2020
 */
document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        } 
    ];

    const grid = document.querySelector('.grid');
    const score = document.querySelector('#score');
    const triesSpan = document.querySelector('#tries');
    const info = document.querySelector('.info');
    var cardsChosen = [];
    var cardsChosenId = [];
    var cardsWon = [];
    var tries = 8;
    
    triesSpan.textContent = tries;    

    function createBoard() {
        cardArray.sort(() => 0.5 - Math.random());
        for (let i = 0; i < cardArray.length; i++) {
            var card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }

        score.textContent = '0';
    }

    function checkForMatch() {
        var cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];        
        if (cardsChosen[0] === cardsChosen[1] && optionOneId !== optionTwoId) {
            showInfoMsg('You found a match!');

            cards[optionOneId].style.opacity = 0.5;
            cards[optionOneId].setAttribute('class', 'green');
            cards[optionOneId].removeEventListener('click', flipCard);

            cards[optionTwoId].style.opacity = 0.5;
            cards[optionTwoId].setAttribute('class', 'green');
            cards[optionTwoId].removeEventListener('click', flipCard);

            cardsWon.push(cardsChosen);
        }
        else {
            tries--;
            cards[optionOneId].setAttribute('src', 'images/blank.png');
            cards[optionTwoId].setAttribute('src', 'images/blank.png');
            showInfoMsg('Sorry, try again.');
        }                        
        triesSpan.textContent = tries;
        if (tries == 0) {
            showInfoMsg('You lost! <a href="javascript:void(0);" onclick="location.reload();">New game</a>');
            reviewBoard();
            return;
        }        
        cardsChosen = [];
        cardsChosenId = [];
        score.textContent = cardsWon.length;
        if (cardsWon.length === cardArray.length / 2) {
            showInfoMsg('Congratulations! You found them all! <a href="javascript:void(0);" onclick="location.reload();">New game</a>');
        }
    }

    function flipCard() {
        showInfoMsg('');        
        var cardId = this.getAttribute('data-id');
        if (cardsChosenId.length === 1) {
            if (cardId === cardsChosenId[0]) {
                return;
            }
        }        
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);        
        if (cardsChosen.length === 2) {            
            setTimeout(checkForMatch, 500);
        }
    }

    function showInfoMsg(text) {
        info.innerHTML = text;
    }

    function reviewBoard() {
        var cards = document.querySelectorAll('img');
        for (let i = 0; i < cards.length; i++) {
            cards[i].setAttribute('src', cardArray[i].img);
            cards[i].setAttribute('class', 'red');
            cards[i].removeEventListener('click', flipCard);
        }
    }

    createBoard();
    showInfoMsg(`Click on a card to start playing. You have ${tries} tries.`);
});