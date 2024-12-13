document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById("cardapioForm");
    const login = document.getElementById("button-login");

    const users_permitidos = [
        { user: "Rodinho", password: "Rodinho123" },
        { user: "Santiago", password: "Santiago123" },
        { user: "Henrique0440", password: "Henrique123" }
    ]

    function verificarUsuarioSenha(username, senha) {
        const usuarioValido = users_permitidos.find(user =>
            user.user === username && user.password === senha
        )

        return usuarioValido ? true : false
    }

    const passwordInput = document.getElementById("password");
    const togglePasswordButton = document.getElementById("toggle-password");

    togglePasswordButton.addEventListener("click", () => {
        // Alterna o tipo do campo entre 'password' e 'text'
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePasswordButton.textContent = "Ocultar";
        } else {
            passwordInput.type = "password";
            togglePasswordButton.textContent = "Mostrar";
        }
    });

    login.addEventListener('click', async (e) => {
        e.preventDefault()

        const username = document.getElementById("user").value;
        const senha = document.getElementById("password").value;

        if (verificarUsuarioSenha(username, senha)) {

            form.innerHTML = `
            <input type="text" id="name" placeholder="Nome do Produto" required /><br />
            <textarea id="description" placeholder="Descrição" required></textarea><br />
            <input type="text" id="price" placeholder="Preço" required /><br />
            <input type="url" id="link" placeholder="Link da imagem" required /><br />
            <button type="submit">Adicionar</button>`
        } else {

            alert("Usuário ou senha inválidos.")
            return
        }

    })


    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;
        const price = document.getElementById("price").value;
        const link = document.getElementById("link").value;

        // Verifica se o valor está no formato correto
        if (!/^[0-9]+(,[0-9]*)?$/.test(price)) {
            alert("Insira um preço válido (ex: 100,50).");
            return;
        }
        try {
            const response = await fetch("https://meu-projeto-henrique0440s-projects.vercel.app/api/alimentos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, description, price, link }),
            });

            const data = await response.json();
            alert(data.message || data.error);
        } catch (error) {
            alert("Erro ao enviar dados:" + error.message)
        }
    });
});