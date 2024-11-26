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
