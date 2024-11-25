import IMask from 'imask';

(() => {
    console.log(IMask);

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
