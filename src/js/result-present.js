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
