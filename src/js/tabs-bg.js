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
