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

(() => {
    const ACTIVE_CLASS = 'active';

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

            // switch (input.name) {
            //     case INPUT_NAMES.Phone:
            //         observedState.phone = event.target.value;
            //         break;
            //     case INPUT_NAMES.SenderName:
            //         observedState.senderName = event.target.value;
            //         break;
            //     case INPUT_NAMES.RecipientName:
            //         observedState.recipientName = event.target.value;
            //         break;
            // }
        });

        reset?.addEventListener('click', () => {
            if (input) {
                input.value = '';
                // observedState.phone = '';
                reset?.classList.remove(ACTIVE_CLASS);
            }
        });
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

(() => {
    const CLASS_HIDDEN = 'hidden';

    const addingButton = document.querySelector(
        '.js-result-present-add-button'
    );
    const addingInputs = document.querySelectorAll(
        '.js-result-present-adding-content'
    );
    const buttonShowText = document.querySelector(
        '.js-result-present-add-button-show-text'
    );
    const buttonHideText = document.querySelector(
        '.js-result-present-add-button-hide-text'
    );

    addingButton?.addEventListener('click', () => {
        addingInputs.forEach((input) => {
            input.classList.toggle(CLASS_HIDDEN);
        });

        buttonShowText?.classList.toggle(CLASS_HIDDEN);
        buttonHideText?.classList.toggle(CLASS_HIDDEN);
    });
})();

(() => {
    const CLASS_HIDDEN = 'hidden';

    const addingButton = document.querySelector('.js-step-four-add-button');
    const addingInputs = document.querySelectorAll(
        '.js-step-four-adding-input'
    );

    addingButton?.addEventListener('click', () => {
        addingInputs.forEach((input) => {
            input.classList.remove(CLASS_HIDDEN);
        });

        addingButton.classList.add(CLASS_HIDDEN);
    });
})();

(() => {
    const CLASS_HIDDEN = 'hidden';

    const tabButtons = document.querySelectorAll('.js-step-two-tab');

    tabButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const buttonType = button.dataset.type;

            if (buttonType) {
                changeInputTelSubText(buttonType);
                inputNameShowToggle(buttonType);
                changeLastStep(buttonType);
            }
        });
    });

    function changeInputTelSubText(type) {
        const inputTelSubText = document.querySelector(
            '.js-input-tel-sub-text'
        );

        if (type === 'self' && inputTelSubText) {
            inputTelSubText.innerHTML =
                'Ссылка на сертификат и чек о покупке придёт в WhatsApp или SMS';
        }

        if (type === 'present' && inputTelSubText) {
            inputTelSubText.innerHTML =
                'Чек о покупке придёт в WhatsApp или SMS';
        }
    }

    function inputNameShowToggle(type) {
        const inputName = document.querySelector('.js-two-step-input-name');

        if (type === 'self' && inputName) {
            inputName.classList.remove(CLASS_HIDDEN);
        }

        if (type === 'present' && inputName) {
            inputName.classList.add(CLASS_HIDDEN);
        }
    }

    function changeLastStep(type) {
        const lastStep = document.querySelector('.js-step-two-last-step');

        if (type === 'self' && lastStep) {
            lastStep.innerHTML = '3';
        }

        if (type === 'present' && lastStep) {
            lastStep.innerHTML = '5';
        }
    }
})();

(() => {
    const ACTIVE_CLASS = 'active';

    const tabsBlock = document.querySelector('.js-bg-tabs');

    if (tabsBlock) {
        const buttons = tabsBlock.querySelectorAll('.js-bg-tab-button');

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                resetButtons();
                button.classList.add(ACTIVE_CLASS);
            });
        });

        function resetButtons() {
            buttons.forEach((button) => {
                button.classList.remove(ACTIVE_CLASS);
            });
        }
    }
})();

(() => {
    const ACTIVE_CLASS = 'active';

    const tabsBlock = document.querySelector('.js-tabs');

    if (tabsBlock) {
        const buttons = tabsBlock.querySelectorAll('.js-tab-button');

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                resetButtons();
                button.classList.add(ACTIVE_CLASS);
            });
        });

        function resetButtons() {
            buttons.forEach((button) => {
                button.classList.remove(ACTIVE_CLASS);
            });
        }
    }
})();

//# sourceMappingURL=index.js.map
