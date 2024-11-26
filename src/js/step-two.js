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
