(() => {
    const ACTIVE_CLASS = 'active';

    const bgButtons = document.querySelectorAll('.js-bg-tab-button');
    const cardBgs = document.querySelectorAll('.js-card-bg');
    const buttonLeft = document.querySelector('.js-card-button-left');
    const buttonRight = document.querySelector('.js-card-button-right');
    const cardImgs = document.querySelectorAll('.js-card-img');

    bgButtons.forEach((button) => {
        button.addEventListener('click', handleBgButtonClick);
    });

    buttonLeft?.addEventListener('click', handleButtonLeftClick);
    buttonRight?.addEventListener('click', handleButtonRightClick);

    function handleBgButtonClick(event) {
        const button = event.currentTarget;
        const buttonType = button.dataset.type;

        cardBgs.forEach((card) => {
            const cardType = card.dataset.type;

            if (buttonType && buttonType === cardType) {
                card.classList.add(ACTIVE_CLASS);
            } else {
                card.classList.remove(ACTIVE_CLASS);
            }
        });
    }

    function handleButtonLeftClick() {
        let currentIndexImg = 0;

        cardImgs.forEach((img, index) => {
            if (img.classList.contains(ACTIVE_CLASS)) {
                currentIndexImg = index;
            }

            img.classList.remove(ACTIVE_CLASS);
        });

        if (currentIndexImg === 0) {
            cardImgs[cardImgs.length - 1].classList.add(ACTIVE_CLASS);
        } else {
            cardImgs[currentIndexImg - 1].classList.add(ACTIVE_CLASS);
        }
    }

    function handleButtonRightClick() {
        let currentIndexImg = 0;

        cardImgs.forEach((img, index) => {
            if (img.classList.contains(ACTIVE_CLASS)) {
                currentIndexImg = index;
            }

            img.classList.remove(ACTIVE_CLASS);
        });

        if (currentIndexImg === cardImgs.length - 1) {
            cardImgs[0].classList.add(ACTIVE_CLASS);
        } else {
            cardImgs[currentIndexImg + 1].classList.add(ACTIVE_CLASS);
        }
    }
})();
