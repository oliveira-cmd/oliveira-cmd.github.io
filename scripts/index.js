document.addEventListener("DOMContentLoaded", () => {
    const apiURL = "https://api.github.com/users/oliveira-cmd/repos";
    const projetosContainer = document.getElementById("projetosContainer");

    async function carregarProjetos() {
        try {
            const resposta = await fetch(apiURL);
            const projetos = await resposta.json();

            if (!projetos.length) {
                projetosContainer.innerHTML = "<p>Nenhum projeto encontrado.</p>";
                return;
            }

            projetosContainer.innerHTML = ""; // Limpa o conteúdo inicial

            projetos.map(projeto => {
                if(projeto.visibility){
                    const card = document.createElement('div');
                    card.classList.add('col-md-6');
                    card.innerHTML = `
    
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">${projeto.name}</h5>
                                <p class="card-text">${projeto.language}</p>
                                <a href="${projeto.html_url}" target="_blank" class="btn btn-primary">Ver mais</a>
                            </div>
                        </div>
                    `;
                    projetosContainer.appendChild(card);
                }
                
            });
        } catch (error) {
            projetosContainer.innerHTML = "<p>Erro ao carregar os projetos.</p>";
        }
    }

    carregarProjetos();
});
