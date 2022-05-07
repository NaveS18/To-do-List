
//let banco = [
//        {'Tasks': 'Seu corno' }
//]

const getBanco = () => JSON.parse(localStorage.getItem('Task')) ?? [];
const setBanco = (banco) => localStorage.setItem('Task', JSON.stringify(banco))


const criarItem = (Tasks, indice) => {
    const item = document.createElement('div')
    item.classList.add('box-item')
    item.innerHTML = `<div class="Itens-class">${Tasks}</div>
                    <input type="button" value="X" class="ButtonClass" data-indice=${indice}>
    `
    
    document.getElementById('Task').appendChild(item);
}

const LimparTela = () => {
    const TodoList = document.getElementById('Task');
    while (TodoList.firstChild) {
        TodoList.removeChild(TodoList.lastChild);
    }
}

const atualizarTela = () => {
    LimparTela();
    const banco = getBanco();
    banco.forEach( (item, indice) => criarItem (item.Tasks, indice));
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter'){
        const banco = getBanco();
        banco.push({'Tasks': texto});
        setBanco(banco);
        atualizarTela();
        evento.target.value = '';
    } 
}
const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizarTela();
}

const clickItem = (evento) => {
        const elemento = evento.target;
        if(elemento.type === 'button') {
            const indice = elemento.dataset.indice;
            removerItem(indice)
        }
}

document.getElementById('Text1').addEventListener('keypress', inserirItem);
document.getElementById('Task'),addEventListener('click', clickItem);

atualizarTela();