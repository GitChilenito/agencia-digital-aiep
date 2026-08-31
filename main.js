document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calculatorForm');
    const resultBox = document.getElementById('resultBox');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('clientName').value.trim();
        const projectType = document.getElementById('projectType').value;
        const deliveryTime = document.getElementById('deliveryTime').value;

        if (name === '') {
            showResult('Por favor, ingresa un nombre o empresa válido.', 'error');
            return;
        }

        let basePrice = 0;
        let projectText = '';

        switch (projectType) {
            case 'landing':
                basePrice = 150000;
                projectText = 'Landing Page';
                break;
            case 'corporativo':
                basePrice = 350000;
                projectText = 'Sitio Corporativo';
                break;
            case 'ecommerce':
                basePrice = 650000;
                projectText = 'Tienda E-Commerce';
                break;
        }

        let finalPrice = basePrice;
        let timeText = 'Estándar (15 días)';

        if (deliveryTime === 'express') {
            finalPrice = basePrice * 1.25;
            timeText = 'Express (5 días)';
        }

        const formattedPrice = finalPrice.toLocaleString('es-CL', {
            style: 'currency',
            currency: 'CLP'
        });

        const message = `
            <strong>¡Cotización generada con éxito!</strong><br>
            Cliente: <b>${name}</b><br>
            Proyecto: <b>${projectText}</b><br>
            Modalidad: <b>${timeText}</b><br>
            Total estimado: <b>${formattedPrice}</b>
        `;

        showResult(message, 'success');
    });

    function showResult(msg, type) {
        resultBox.innerHTML = msg;
        resultBox.className = `result-box ${type}`;
    }
});