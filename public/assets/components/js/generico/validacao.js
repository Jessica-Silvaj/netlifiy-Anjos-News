function validateForm(formId) {
    const form = document.getElementById(formId);
    const email = form.querySelector('#email');
    const senha = form.querySelector('#senha');
    let isValid = true;

    // Limpar mensagens de erro anteriores
    form.querySelectorAll('.error-message').forEach(error => error.remove());
    form.querySelectorAll('.is-invalid').forEach(input => input.classList.remove('is-invalid'));

    // Limpar as mensagens de erro globais
    const errorContainer = form.querySelector('.error-container');
    errorContainer.innerHTML = ''; // Limpa a área de erro antes de adicionar novas mensagens

    // Verificar se o campo de e-mail está preenchido
    if (!email.value.trim()) {
        showError(email, 'O campo e-mail é obrigatório.');
        isValid = false;
    }

    // Verificar se o campo de senha está preenchido
    if (!senha.value.trim()) {
        showError(senha, 'O campo senha é obrigatório.');
        isValid = false;
    }

    return isValid;
}

function showError(inputElement, message) {
    // Adicionar a classe de erro no campo
    inputElement.classList.add('is-invalid');

    // Criar o elemento de erro
    const errorContainer = document.querySelector('.error-container');
    const errorElement = document.createElement('div');
    errorElement.classList.add('error-message', 'text-danger', 'small');
    errorElement.innerText = message;

    // Adicionar a mensagem de erro ao contêiner global
    errorContainer.appendChild(errorElement);
}

export function addValidationListener(formId) {
    const form = document.getElementById(formId);
    const email = form.querySelector('#email');
    const senha = form.querySelector('#senha');

    // Adicionando o evento para limpar o erro ao digitar
    email.addEventListener('input', function () {
        removeError(email);
    });

    senha.addEventListener('input', function () {
        removeError(senha);
    });

    form.addEventListener('submit', function (event) {
        if (!validateForm(formId)) {
            event.preventDefault(); // Impede o envio do formulário se a validação falhar
        }
    });
}

function removeError(inputElement) {
    // Se o campo estiver preenchido, remover a classe de erro e a mensagem
    if (inputElement.value.trim()) {
        inputElement.classList.remove('is-invalid');
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(message => message.remove());
    }
}
