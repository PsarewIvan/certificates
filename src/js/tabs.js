(() => {
    const tabsBlocks = document.querySelectorAll('.js-tabs');

    tabsBlocks.forEach((tabs) => {
        const buttons = tabs.querySelectorAll('.js-tab-button');

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                resetButtons();
                button.classList.add('active');
            });
        });

        function resetButtons() {
            buttons.forEach((button) => {
                button.classList.remove('active');
            });
        }
    });
})();
