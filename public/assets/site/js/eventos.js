const eventos = [
    { data: '2025-02-22T00:00:00', nome: 'Evento Rally - Mec Los Anjos', descricao: 'O Rally é uma competição de motocross que ocorrerá no dia 22 de fevereiro, às 20h', imagem: '../assets/site/images/eventos/image-169.png', link: 'https://docs.google.com/document/d/1OgY1GFTbKMlUYmcBlMU7q-Wgg4oT7AC3Py18pfxkDf8/edit?tab=t.0' },
    // { data: '2025-02-26T00:00:00', nome: 'Evento Estoure o Balão - Anjos News', descricao: 'Em breve', imagem: '../assets/site/images/eventos/image1.png', link: 'https://docs.google.com/forms/d/e/1FAIpQLSdLYq8Q2DSggfStYw24dCpqk9pIY9ar75RsBUYKx25Ktg6-1Q/viewform?usp=sharing' },
];

const modal = document.getElementById('eventoModal');
const tituloEvento = document.getElementById('tituloEvento');
const descricaoEvento = document.getElementById('descricaoEvento');
const imagemEvento = document.getElementById('imagemEvento');
const btnInscricao = document.getElementById('btnInscricao');
const fecharModal = document.querySelector('.fechar');
const spikes = document.querySelector('.spikes');
const triangle = document.querySelector('.triangle');

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

    // Verifica se o evento tem um link de inscrição
    if (evento.link) {
        btnInscricao.href = evento.link;
        btnInscricao.style.display = 'inline-block'; // Exibe o botão de inscrição
    } else {
        btnInscricao.style.display = 'none'; // Esconde o botão de inscrição
    }

    // Esconde as seções spikes e triangle ao abrir o modal
    if (spikes) spikes.style.display = 'none';
    if (triangle) triangle.style.display = 'none';

    modal.style.display = 'flex';
}

// Fecha o modal
fecharModal.addEventListener('click', () => {
    modal.style.display = 'none';

    // Reexibe as seções spikes e triangle ao fechar o modal
    if (spikes) spikes.style.display = 'block';
    if (triangle) triangle.style.display = 'block';
});

// Fecha modal ao clicar fora
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';

        // Reexibe as seções spikes e triangle ao fechar o modal
        if (spikes) spikes.style.display = 'block';
        if (triangle) triangle.style.display = 'block';
    }
});

// Inicializa tudo
gerarMeses();
gerarCalendario();