document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('btn-card')
    const btn_home = document.getElementById('btn-home')

    let main = document.getElementById('main')
    let verific = false


    btn_home.addEventListener('click', function () {
        location.href = './index.html'
    })

    btn.addEventListener('click', function () {
        if (verific === false) {
            fetch('https://meu-projeto-git-main-henrique0440s-projects.vercel.app/api/alimentos')
                .then(response => response.json())
                .then(data => {
                    data.map((val, index) => {
                        main.innerHTML += `
                        <div id="${index}" class="card_product">
                            <img src="https://i0.wp.com/pat.feldman.com.br/wp-content/uploads/2012/01/comida-caseira.jpg?fit=960%2C540&ssl=1" alt="">
                            <h3>${val.name}</h3>
                            <p>${val.description}</p>
                            <a href="${val.link}" target="_blank">
                                <button id="">Cardapio</button>
                            </a>
                        </div>`
                    })
                })
                .catch(error => {
                    console.error('Erro na requisição:', error)
                    main.innerHTML += `
                    <div id="#" class="card_product">
                        <img src="https://webinsider.com.br/wp-content/uploads/2019/01/Erro-404-1-1-1024x645.jpg" alt="">
                        <h3>BANCO DE DADOS FORA DO AR</h3>
                        <p>Contate nos via whatsapp</p>
                        <a href="#" target="_blank">
                            <button id="">Cardapio</button>
                        </a>`
                });

            verific = true
        } else {
            main.innerHTML = ''
            verific = false
        }
    })

    let lastScrollY = window.scrollY;
    const menu = document.getElementById('menu');

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY < lastScrollY) {
            // Rolando para cima
            menu.classList.add('show');
        } else {
            // Rolando para baixo
            menu.classList.remove('show');
        }

        lastScrollY = currentScrollY;
    });

})