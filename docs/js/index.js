(() => {
    async function payment(state, payButton) {
        payButton.disabled = true;

        // Тут нужна логика оплаты, данные формы в state
        // После того как она отработает нужно получить эти данные:
        const response = {
            id: '675486129',
            using: 'Любые услуги и товары салона',
            dateTo: '20.11.2025',
        };

        openResultStep(response);

        payButton.disabled = false;
    }

    const CLASS_HIDDEN = 'hidden';
    const CLASS_SELECTED = 'selected';
    const CLASS_CARD_INTERACTIVE = 'interactive';
    const ACTIVE_CLASS = 'active';

    const HEADER_TITLE = {
        First: 'Выберите сертификат',
        Second: 'Ваши данные',
        Third: 'Оплата',
        ThirdAfterPayed: 'Спасибо за покупку',
        Fourth: 'Дизайн и получатель',
        Fives: 'Проверка данных',
    };

    const BUTTON_TEXT = {
        Second: 'Далее',
        Third: 'Оплатить',
        ThirdPayed: 'Выбрать дизайн и получателя',
        Fourth: 'Далее',
        Fives: 'Отправить',
        End: 'Записаться онлайн',
    };

    const ORDER_TYPE = {
        Self: 'self',
        Present: 'present',
    };

    const formState = {
        currentStep: 1,
        selectedCard: null,
        orderType: ORDER_TYPE.Present,
        phone: '',
        agreement: false,
        senderName: '',
        recipientName: '',
        designBack: '',
        designImage: '',
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

            if (property === 'orderType') {
                handleOrderTypeChange(value);
            }

            target[property] = value;

            validateStepButton();

            return true;
        },
    };

    const observedState = new Proxy(formState, stateHandler);

    const headerFirst = document.querySelector('.js-header-first');
    const headerSecond = document.querySelector('.js-header-second');
    const stepTwo = document.querySelector('.js-step-two');
    const stepThree = document.querySelector('.js-step-three');
    const stepFour = document.querySelector('.js-step-four');
    const stepFive = document.querySelector('.js-step-five');
    const headerTitle = headerSecond?.querySelector('.js-header-title');
    const backButton = headerSecond?.querySelector('.js-back-button');
    const currentStep = headerSecond?.querySelector('.js-current-step');
    const lastStep = headerSecond?.querySelector('.js-last-step');
    const stepButton = document.querySelector('.js-step-button');
    const inputSenderName = document.querySelector('.js-input-sender-name');
    const agreeCheckbox = document.querySelector('.js-agree-checkbox');

    const cards = document.querySelectorAll('.js-card');

    cards.forEach((card) => {
        card.addEventListener('click', handleCardClick);
    });

    backButton?.addEventListener('click', handleBackClick);

    function handleCardClick(event) {
        const card = event.currentTarget;

        if (card.classList.contains(CLASS_CARD_INTERACTIVE)) {
            observedState.selectedCard = card;
            observedState.currentStep = 2;
        }
    }

    function handleBackClick() {
        observedState.currentStep -= 1;

        if (observedState.currentStep === 1) {
            observedState.selectedCard = null;
        }
    }

    function handleStepChange(value, prevValue, target) {
        if (currentStep) {
            currentStep.innerHTML = `${value}`;
        }

        changeHeader(value, prevValue);
        changeCards(value, prevValue);
        changeSteps(value, prevValue);
        showTel(value, prevValue);
        showName(value, prevValue);
        changeStepButton(value);
    }

    function changeHeader(value, prevValue) {
        switch (prevValue) {
            case 1:
                headerFirst?.classList.add(CLASS_HIDDEN);
                headerSecond?.classList.add(CLASS_SELECTED);
                break;
        }

        switch (value) {
            case 1: {
                headerFirst?.classList.remove(CLASS_HIDDEN);
                headerSecond?.classList.remove(CLASS_SELECTED);

                if (headerTitle) {
                    headerTitle.innerHTML = HEADER_TITLE.First;
                }

                break;
            }
            case 2: {
                if (headerTitle) {
                    headerTitle.innerHTML = HEADER_TITLE.Second;
                }

                break;
            }
            case 3: {
                if (headerTitle) {
                    if (observedState.hasPayed) {
                        headerTitle.innerHTML = HEADER_TITLE.ThirdAfterPayed;
                    } else {
                        headerTitle.innerHTML = HEADER_TITLE.Third;
                    }
                }

                break;
            }
            case 4:
                if (headerTitle) {
                    headerTitle.innerHTML = HEADER_TITLE.Fourth;
                }

                break;
            case 5:
                if (headerTitle) {
                    headerTitle.innerHTML = HEADER_TITLE.Fives;
                }

                break;
        }
    }

    function changeCards(value, prevValue) {
        switch (prevValue) {
            case 1: {
                cards.forEach((card) => {
                    if (
                        card.dataset.id !==
                        observedState.selectedCard?.dataset.id
                    ) {
                        card.classList.add(CLASS_HIDDEN);
                    }
                });

                break;
            }
            case 2: {
                if (value === 1) {
                    cards.forEach((card) => {
                        card.classList.remove(CLASS_HIDDEN);
                    });
                }

                break;
            }
        }
    }

    function changeSteps(value) {
        stepTwo?.classList.add(CLASS_HIDDEN);
        stepThree?.classList.add(CLASS_HIDDEN);
        stepFour?.classList.add(CLASS_HIDDEN);
        stepFive?.classList.add(CLASS_HIDDEN);

        switch (value) {
            case 2:
                stepTwo?.classList.remove(CLASS_HIDDEN);
                break;
            case 3:
                stepThree?.classList.remove(CLASS_HIDDEN);
                break;
            case 4:
                stepFour?.classList.remove(CLASS_HIDDEN);
                break;
            case 5:
                stepFive?.classList.remove(CLASS_HIDDEN);
                break;
        }
    }

    function showTel(value) {
        const selfLabel = document.querySelector(
            '.js-card-content-label-tel-self'
        );
        const presentLabel = document.querySelector(
            '.js-card-content-label-tel-present'
        );
        const telNode = document.querySelector('.js-card-content-tel');

        selfLabel?.classList.add(CLASS_HIDDEN);
        presentLabel?.classList.add(CLASS_HIDDEN);

        if (value === 3) {
            if (telNode) {
                telNode.innerHTML = observedState.phone;
            }

            if (observedState.orderType === ORDER_TYPE.Present) {
                presentLabel?.classList.remove(CLASS_HIDDEN);
            }

            if (observedState.orderType === ORDER_TYPE.Self) {
                selfLabel?.classList.remove(CLASS_HIDDEN);
            }
        }
    }

    function showName(value) {
        const contentName = document.querySelector('.js-card-content-name');
        const nameNode = document.querySelector('.js-card-content-name-text');

        contentName?.classList.add(CLASS_HIDDEN);

        if (value === 3) {
            if (nameNode) {
                nameNode.innerHTML = observedState.senderName;
            }

            if (observedState.orderType === ORDER_TYPE.Self) {
                contentName?.classList.remove(CLASS_HIDDEN);
            }
        }
    }

    function changeStepButton(step) {
        if (!stepButton) return;

        stepButton.classList.remove(CLASS_HIDDEN);

        switch (step) {
            case 1:
                stepButton.classList.add(CLASS_HIDDEN);
                stepButton.innerHTML = BUTTON_TEXT.Second;
                break;
            case 2:
                stepButton.innerHTML = BUTTON_TEXT.Second;
                break;
            case 3: {
                const price =
                    observedState.selectedCard?.querySelector('.js-card-price')
                        ?.innerHTML ?? '';
                stepButton.innerHTML = BUTTON_TEXT.Third + ' ' + price;
                break;
            }
            case 4:
                stepButton.innerHTML = BUTTON_TEXT.Fourth;
                break;
            case 5:
                stepButton.innerHTML = BUTTON_TEXT.Fives;
                break;
        }
    }

    function handleSelectedCardChange(value, prevValue, target) {
        cards.forEach((card) => {
            if (value) {
                card.classList.remove(CLASS_CARD_INTERACTIVE);
            } else {
                card.classList.add(CLASS_CARD_INTERACTIVE);
            }
        });
    }

    function handleOrderTypeChange(value) {
        switch (value) {
            case ORDER_TYPE.Self:
                inputSenderName?.classList.remove(CLASS_HIDDEN);
                lastStep.innerHTML = 3;
                break;
            case ORDER_TYPE.Present:
                inputSenderName?.classList.add(CLASS_HIDDEN);
                lastStep.innerHTML = 5;
                break;
        }
    }

    function validateStepButton() {
        if (!stepButton) return;

        const hasValid = observedState.phone !== '' && observedState.agreement;

        stepButton.disabled = !hasValid;
    }

    function openResultStep(responseData) {
        const headerTitle = headerFirst?.querySelector(
            '.js-header-first-title'
        );
        const headerText = headerFirst?.querySelector('.js-header-first-text');

        const resultStep = document.querySelector('.js-step-result');
        const resultId = resultStep?.querySelector('.js-card-result-id');
        const resultAddress = resultStep?.querySelector(
            '.js-card-result-address'
        );
        const resultUsed = resultStep?.querySelector('.js-card-result-used');
        const resultDateTo = resultStep?.querySelector(
            '.js-card-result-date-to'
        );
        const resultName = resultStep?.querySelector('.js-card-result-name');
        const resultTel = resultStep?.querySelector('.js-card-result-tel');

        headerFirst?.classList.remove(CLASS_HIDDEN);
        headerSecond?.classList.add(CLASS_HIDDEN);

        const address =
            observedState.selectedCard?.querySelector('.js-card-address')
                ?.innerHTML ?? '';

        if (headerTitle && headerText) {
            headerTitle.innerHTML = `Сертификат ${responseData.id}`;
            headerText.innerHTML = address;
        }

        if (stepButton) {
            stepButton.innerHTML = BUTTON_TEXT.End;
        }

        if (resultStep) {
            stepTwo?.classList.add(CLASS_HIDDEN);
            stepThree?.classList.add(CLASS_HIDDEN);
            stepFour?.classList.add(CLASS_HIDDEN);
            stepFive?.classList.add(CLASS_HIDDEN);

            resultStep.classList.remove(CLASS_HIDDEN);

            if (resultId) {
                resultId.innerHTML = responseData.id;
            }

            if (resultAddress) {
                resultAddress.innerHTML = address;
            }

            if (resultUsed) {
                resultUsed.innerHTML = responseData.using;
            }

            if (resultDateTo) {
                resultDateTo.innerHTML = responseData.dateTo;
            }

            if (resultName && observedState.senderName) {
                resultName.innerHTML = observedState.senderName;
            }

            if (resultTel && observedState.phone) {
                resultTel.innerHTML = observedState.phone;
            }
        }
    }

    // TABS
    const tabsBlocks = document.querySelectorAll('.js-tabs');

    tabsBlocks.forEach((tabs) => {
        const buttons = tabs.querySelectorAll('.js-tab-button');

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const buttonType = button.dataset.type;

                resetButtons();
                button.classList.add('active');

                if (buttonType) {
                    observedState.orderType = buttonType;
                }
            });
        });

        function resetButtons() {
            buttons.forEach((button) => {
                button.classList.remove('active');
            });
        }
    });

    // INPUTS
    const INPUT_NAMES = {
        SenderName: 'inputSenderName',
        RecipientName: 'inputRecipientName',
        Phone: 'inputPhone',
    };
    const nodes = document.querySelectorAll('.js-text-input-node');

    nodes.forEach((node) => {
        const input = node.querySelector('.js-text-input');
        const reset = node.querySelector('.js-text-input-reset');
        const alert = node.querySelector('.js-text-input-alert');

        if (input.value !== '') {
            reset?.classList.add(ACTIVE_CLASS);
        }

        input?.addEventListener('blur', (event) => {
            if (event.target.value === '') {
                alert?.classList.add(ACTIVE_CLASS);
            } else {
                alert?.classList.remove(ACTIVE_CLASS);
            }
        });

        input?.addEventListener('input', (event) => {
            if (event.target.value === '') {
                reset?.classList.remove(ACTIVE_CLASS);
            } else {
                reset?.classList.add(ACTIVE_CLASS);
                alert?.classList.remove(ACTIVE_CLASS);
            }

            switch (input.name) {
                case INPUT_NAMES.Phone:
                    observedState.phone = event.target.value;
                    break;
                case INPUT_NAMES.SenderName:
                    observedState.senderName = event.target.value;
                    break;
                case INPUT_NAMES.RecipientName:
                    observedState.recipientName = event.target.value;
                    break;
            }
        });

        reset?.addEventListener('click', () => {
            if (input) {
                input.value = '';
                observedState.phone = '';
                reset?.classList.remove(ACTIVE_CLASS);
            }
        });
    });

    // TOGGLES
    agreeCheckbox?.addEventListener('input', () => {
        observedState.agreement = agreeCheckbox.checked;
    });

    // STEP BUTTON
    stepButton?.addEventListener('click', () => {
        if (
            observedState.currentStep === 5 ||
            (observedState.currentStep === 3 &&
                observedState.orderType === ORDER_TYPE.Self)
        ) {
            payment(observedState, stepButton);
            return;
        }

        if (observedState.currentStep < 5) {
            observedState.currentStep += 1;
        }
    });
})();

(() => {
    const inputs = document.querySelectorAll('.js-input[type="tel"]');

    inputs.forEach((input) => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, ''); // Удаляем все нецифровые символы
            const template = '+7 (___) ___-__-__';

            let formattedValue = template;
            for (let i = 0; i < value.length; i++) {
                formattedValue = formattedValue.replace('_', value[i]);
            }

            e.target.value = formattedValue.replace(/_+/g, ''); // Удаляем лишние подчеркивания
        });

        input.addEventListener('blur', (e) => {
            if (e.target.value.length < 18) {
                e.target.value = ''; // Очищаем поле, если данные неполные
            }
        });
    });
})();

//# sourceMappingURL=index.js.map
