document.getElementById('cadastroForm').addEventListener('submit', cadastrarLivro);

function cadastrarLivro(event) {
    event.preventDefault();

    const name = document.getElementById('descricao').value;
    const plataform = document.getElementById('isbn').value;

    fetch('http://localhost:8080/livros', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, plataform }),
    })
        .then(response => response.json())
        .then(data => {
            alert('Livro cadastrado com sucesso!');
            document.getElementById('cadastroForm').reset();
        })
        .catch(error => {
            console.error('Erro ao cadastrar livro:', error);
        });
}
function pesquisarLivro() {
    const searchId = document.getElementById('searchId').value;

    fetch(`http://localhost:8080/livros/${searchId}`)
        .then(response => {
            if (response.status === 404) {
                return Promise.reject('Livro não encontrado');
            }
            return response.json();
        })
        .then(data => {
            const resultadoPesquisa = document.getElementById('resultadoPesquisa');
            resultadoPesquisa.innerHTML = `
                <h3>ID: ${data.id}</h3>
                <p>Nome: ${data.name}</p>
                <p>Plataforma: ${data.plataform}</p>
            `;
        })
        .catch(error => {
            console.error('Erro ao pesquisar livro:', error);
            const resultadoPesquisa = document.getElementById('resultadoPesquisa');
            resultadoPesquisa.innerHTML = 'Livro não encontrado.';
        });
}
function atualizarLivro() {
    pesquisarLivro();
    if (result == 1) {
        const descricao = document.getElementById('descricao').value;
        const isbn = document.getElementById('isbn').value;
        const searchId = document.getElementById('searchId').value;

        fetch(`http://localhost:8080/livros/${searchId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ descricao, isbn }),
        })
            .then(response => response.json())
            .then(data => {
                alert('Jogo atualizado com sucesso!');
                document.getElementById('cadastroForm').reset();                
            })
            .catch(error => {
                console.error('Erro ao atualizar jogo:', error);
            });
    } else {
        alert('ID não encontrado na base de dados. Nenhum Livro foi alterado. Favor pesquisar jogo a ser alterado !!!');
    }
}
function deletarLivro() {
    pesquisarLivro();
    if (result == 1) {
        const name = document.getElementById('name').value;
        const plataform = document.getElementById('plataform').value;
        const searchId = document.getElementById('searchId').value;

        fetch(`http://localhost:8080/livros/${searchId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ descricao, isbn }),
        })
            .then(response => response.json())
            .then(data => {
                alert('Livro atualizado com sucesso!');
                document.getElementById('cadastroForm').reset();                
            })
            .catch(error => {
                console.error('Erro ao atualizar Livro:', error);
            });
    } else {
        alert('ID não encontrado na base de dados. Nenhum Livro foi alterado. Favor pesquisar jogo a ser alterado !!!');
    }
}