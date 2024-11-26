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
