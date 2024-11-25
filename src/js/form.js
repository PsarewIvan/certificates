(() => {
    const CLASS_HIDDEN = 'hidden';
    const CLASS_SELECTED = 'selected';
    const CLASS_CARD_INTERACTIVE = 'interactive';

    const HEADER_TITLE = {
        First: 'Выберите сертификат',
        Second: 'Ваши данные',
        Third: 'Оплата',
        ThirdPayed: 'Спасибо за покупку',
        Fourth: 'Дизайн и получатель',
        Fives: 'Проверка данных',
    };

    const formState = {
        currentStep: 1,
        selectedCard: '',
    };

    const stateHandler = {
        set(target, property, value) {
            const prevValue = target[property];

            if (property === 'currentStep') {
                handleStepChange(value, prevValue, target);
            }

            if (property === 'selectedCard') {
                handleSelectedCardChange(value, prevValue, target);
            }

            target[property] = value;

            return true;
        },
    };

    const observedState = new Proxy(formState, stateHandler);

    const headerFirst = document.querySelector('.js-header-first');
    const headerSecond = document.querySelector('.js-header-second');
    const headerTitle = headerSecond?.querySelector('.js-header-title');
    const backButton = headerSecond?.querySelector('.js-back-button');
    const currentStep = headerSecond?.querySelector('.js-current-step');

    const cards = document.querySelectorAll('.js-card');

    cards.forEach((card) => {
        card.addEventListener('click', handleCardClick);
    });

    backButton?.addEventListener('click', handleBackClick);

    function handleCardClick(event) {
        const card = event.currentTarget;

        if (card.classList.contains(CLASS_CARD_INTERACTIVE)) {
            const id = card.dataset.id;

            observedState.selectedCard = id;
            observedState.currentStep = 2;
        }
    }

    function handleBackClick(event) {
        observedState.currentStep -= 1;

        if (observedState.currentStep === 1) {
            observedState.selectedCard = '';
        }
    }

    function handleStepChange(value, prevValue, target) {
        console.log('[handleStepChange]', target);

        if (currentStep) {
            currentStep.innerHTML = `${value}`;
        }

        if (prevValue === 1) {
            headerFirst?.classList.add(CLASS_HIDDEN);
            headerSecond?.classList.add(CLASS_SELECTED);

            cards.forEach((card) => {
                if (card.dataset.id !== target.selectedCard) {
                    card.classList.add(CLASS_HIDDEN);
                }
            });
        }

        if (prevValue === 2) {
            cards.forEach((card) => {
                card.classList.remove(CLASS_HIDDEN);
            });
        }

        if (value === 1) {
            headerFirst?.classList.remove(CLASS_HIDDEN);
            headerSecond?.classList.remove(CLASS_SELECTED);

            if (headerTitle) {
                headerTitle.innerHTML = HEADER_TITLE.First;
            }
        }

        if (value === 2) {
            if (headerTitle) {
                headerTitle.innerHTML = HEADER_TITLE.Second;
            }
        }
    }

    function handleSelectedCardChange(value, prevValue, target) {
        cards.forEach((card) => {
            if (value === '') {
                card.classList.add(CLASS_CARD_INTERACTIVE);
            } else {
                card.classList.remove(CLASS_CARD_INTERACTIVE);
            }
        });
    }
})();
