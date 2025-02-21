// Lista de eventos com descrição e imagem
const eventos = [
    // { data: '2025-02-22T00:00:00', nome: 'Evento Rally', descricao: 'O Rally é uma competição de motocross que ocorrerá no dia 22 de fevereiro, às 20h. O evento desafiará os pilotos a atravessar um percurso exigente, com uma montanha como principal obstáculo, e finalizará no Club FireWitches. O objetivo do rally é oferecer aos participantes uma experiência emocionante, com muito desafio e adrenalina, promovendo interação entre a comunidade e proporcionando momentos de diversão para todos os envolvidos.', imagem: '' },
    // { data: '2025-03-05T00:00:00', nome: 'Evento 3 - Miss CDanjos', descricao: 'Descubra as novas candidatas!', imagem: '../assets/site/images/noticias/noticias.png' },
];

// Referência ao modal
const modal = document.getElementById('eventoModal');
const tituloEvento = document.getElementById('tituloEvento');
const descricaoEvento = document.getElementById('descricaoEvento');
const imagemEvento = document.getElementById('imagemEvento');
const contador = document.getElementById('contador');
const fecharModal = document.querySelector('.fechar');

// Função para gerar os meses e destacar o mês atual
function gerarMeses() {
    const mesesDiv = document.getElementById('meses');
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    const mesAtual = new Date().getMonth();

    meses.forEach((mes, index) => {
        const mesElemento = document.createElement('div');
        mesElemento.classList.add('mes');
        if (index === mesAtual) {
            mesElemento.classList.add('atual');
        }
        mesElemento.textContent = mes;
        mesElemento.onclick = () => gerarCalendario(index);
        mesesDiv.appendChild(mesElemento);
    });
}

// Função para gerar o calendário de um mês específico
function gerarCalendario(mesSelecionado = new Date().getMonth()) {
    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const calendarioDiv = document.getElementById('calendario');
    const anoAtual = new Date().getFullYear();

    calendarioDiv.innerHTML = '';

    diasSemana.forEach(dia => {
        const diaElemento = document.createElement('div');
        diaElemento.textContent = dia;
        calendarioDiv.appendChild(diaElemento);
    });

    const primeiroDiaMes = new Date(anoAtual, mesSelecionado, 1).getDay();
    for (let i = 0; i < primeiroDiaMes; i++) {
        const vazio = document.createElement('div');
        calendarioDiv.appendChild(vazio);
    }

    const ultimoDiaMes = new Date(anoAtual, mesSelecionado + 1, 0).getDate();
    for (let i = 1; i <= ultimoDiaMes; i++) {
        const diaElemento = document.createElement('div');
        diaElemento.textContent = i;

        const eventoData = eventos.find(evento => {
            const dataEvento = new Date(evento.data);
            return dataEvento.getDate() === i && dataEvento.getMonth() === mesSelecionado;
        });

        if (eventoData) {
            diaElemento.classList.add('evento');
            diaElemento.addEventListener('click', () => abrirModal(eventoData));
        }

        calendarioDiv.appendChild(diaElemento);
    }
}

// Função para abrir o modal
function abrirModal(evento) {
    tituloEvento.textContent = evento.nome;
    descricaoEvento.textContent = evento.descricao;
    imagemEvento.src = evento.imagem;

    // atualizarContagemRegressiva(new Date(evento.data));

    modal.style.display = 'flex';
}

// Fecha o modal
fecharModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fecha modal ao clicar fora
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Atualiza a contagem regressiva
// function atualizarContagemRegressiva(dataEvento) {
//     function atualizar() {
//         const agora = new Date();
//         const diferenca = dataEvento - agora;

//         if (diferenca > 0) {
//             const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
//             const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//             const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
//             const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);
//             contador.textContent = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
//         } else {
//             contador.textContent = 'Evento em andamento!';
//         }
//     }
//     atualizar();
//     setInterval(atualizar, 1000);
// }

// Inicializa tudo
gerarMeses();
gerarCalendario();
