$(document).ready(function () {
    $('.slick-carousel').slick({
        infinite: true,
        slidesToShow: 3,    // Ajuste para quantos itens exibir por vez
        slidesToScroll: 1,   // Quantos itens rolam por vez
        autoplay: true,      // Ativa o autoplay
        autoplaySpeed: 3000, // Velocidade do autoplay
        arrows: true,        // Exibe as setas de navegação
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });
});