
//Como utilizar: 

// 1° - import Storage form 'LSlibrary.js'

//para ver o guia completo: Storage.help()

// 2° - criar um objeto Storage com o nome que será utilizado para referenciar o slot de memoria do localStorage
//      ex: const storage = new Storage('nome')

//3° - Após a criação do objeto Storage, basta usar os seguintes métodos para manipular seu slot de memoria: 

//      .help() - exibe o manual da biblioteca.

//      .set(valor) - substitui o valor existente na memória pelo valor no parenteses

//      .add(valor) - adiciona o valor do parenteses ao final da lista de valores já existentes (pode ser usado mesmo com a memória vazia).

//      .getElements() - retorna um array com todos os dados presentes na memória.

//      .getIndexOf(valor) - retorna o index do primeiro valor da memória correspondente ao valor passado (retonrna -1 caso não haja um valor correspondente).

//      .getElementByIndex(valor) - retorna o elemento correspondente ao index passado ao método.

//      .removeAllChilds(valor) - Remove da memória TODOS os valores que correspondem ao valor passado pare o método.

//      .removeFirstChild(valor) - Remove APENAS O PRIMEIRO valor da memória correspondente ao valor passado ao método.

//      .removeChildByIndex(index) - Recebe um valor numérico e remove o valor com index correspondente da memória (retorna -1 caso não haja um valor com o index passado).


export default class Storage {

    constructor (key) {
        this.key = key
        if (localStorage.getItem(this.key) == null){
            localStorage.setItem(this.key, '')
        }
    }

    static help() {
        console.log('-- help --\n\nCOMO INICIAR:\n   Para iniciar, basta criar uma instância de Storage passando ao constructor um nome (no formato string) que será utilizado para nomear o slot de memória criado.\n       EXEMPLO: var armazenamento = new Storage("nome") \n\nCOMO USAR:\n       Esta biblioteca foi criada com o intuito de simplificar o uso do localStorage adicionando diversos métodos para facilitar o armazenamento local de dados.\n       Após a criação da instância, você poderá utilizar os seguintes métodos para modificar o armazenamento:\n\n.set(valor) - Substitui os dados armazenados pelo novo valor passado ao método.\n\n.add(valor) - adiciona o valor passado ao método ao final da lista de valores já armazenados. \n\n.getElements() - Retorna um Array com todos os valores armazenados.\n\n.getIndexOf(valor) - retorna o index do primeiro valor da memória correspondente ao valor passado (retonrna -1 caso não haja um valor correspondente).\n\n.getElementByIndex(valor) - retorna o elemento correspondente ao index passado ao método. \n\n.removeAllChilds(valor) - Remove do armazenamento todos os valores correspondentes ao valor fornecido ao método. \n\n.removeFirstChild(valor) - Remove da memória o primeiro valor correspondente ao valor passado.\n\n.removeChildByIndex(index) - Recebe um valor numérico e remove o valor com index correspondente da memória (retorna -1 caso não haja um valor com o index passado).')

    }

    //TODOS OS ITENS SÃO ARMAZENADOS EM UMA ÚNICA STRING SEPARADOS PELO MARCADOR "//". OS MÉTODOS ABAIXO PEGAM ESSA STRING, TRANSFORMAM-A EM ARRAY COM O COMANDO SPLIT('//'), FAZEM AS MODIFICAÇÕES NECESSÁRIAS, TRANSFORMAM A ARRAY NOVAMENTE EM STRING E ENVIAM DE VOLTA AO LOCAL STORAGE. 

    //Verifica se o slote com o nome passado já existe:
    isNotEmpty() {
        if (localStorage.getItem(this.key) != '' && localStorage.getItem(this.key) != null){
            return true
        } else {
            return false
        }
    }

    //substitui os dados armazenados
    set(data) {
        if (typeof data === 'object') {
            data = JSON.stringify(data)
        }
        localStorage.setItem(this.key, data)
    }

    //adiciona dados ao final da lista
    add(data) {
        let memory = localStorage.getItem(this.key)
        if (typeof data === 'object') {
            data = JSON.stringify(data)
        }

        memory = memory + "//" + data
        localStorage.setItem(this.key, memory)
    }

    //pega e retorna os dados armazenados em uma array.
    getElements() {
        let memory = localStorage.getItem(this.key).split('//')
        if (memory[0] == '') {
            memory.splice(0, 1)
        }
        //A regex abaixo reconhece a estrutura de objetos e arrays (que são recebidos pela função no formato string) e os transforma em objetos.
        const regex = /[\{\[].*[\}\]]/
        memory.map((element, index) => {
            if (regex.test(element)) {
                let spc = JSON.parse(element)
                memory[index] = spc
            }
        })
            

        return memory
    }

    //retorna o index do primeiro valor correspondente no localstorage ao valor passado ao método (caso não haja um valor correspondente armazenado, será retornado -1)
    getIndexOf(value) {
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }

        let memory = localStorage.getItem(this.key).split('//')
        if (memory[0] == '') {
            memory.splice(0, 1)
        }

        return memory.indexOf(value)
    }

    //retorna o elemento da array de memória correspondente ao index passado. 
    getElementByIndex(index) {
        let memory = this.getElements()
        console.log(memory)

        if (memory.length >= index && index >= 0) {
            return memory[index]
        } else {
            return -1 
        }
    }

    //remove da memória todos os valores correspondentes ao valor passado ao método
    removeAllChilds(dataRemove) {
        let memory = this.getElements()
        if (memory[0] == '') {
            memory.splice(0, 1)
        }
        if (typeof dataRemove === 'object') {
            dataRemove = JSON.stringify(dataRemove)
        }

        let newMemory = ""
        memory.map((data) => {
            if (typeof data === 'object') {
                data = JSON.stringify(data)
            }
            if (data != dataRemove) {
                newMemory += "//" + data
            }
        })

        this.set(newMemory)
    }

    //remove da memória o primeiro item correspondente ao valor passado ao método
    removeFirstChild(dataRemove) {
        let data = this.getElements()

        if (typeof dataRemove === 'object') {
            dataRemove = JSON.stringify(dataRemove)
        }

        let newMemory = ""
        let breakRef = 0;
        data.map((data) => {
            if (typeof data === 'object') {
                data = JSON.stringify(data)
                // ref = true
            }

            if (data != dataRemove || breakRef == 1) {
                newMemory += "//" + data
                
            } else {
                breakRef = 1
            }
        })
        this.set(newMemory)
    }

    //remove da array de memória o item correspondente ao index passado
    removeChildByIndex(index) {
        let memory = this.getElements()
        if (memory.length >= index && index >= 0) {
            memory.splice(index, 1)
            this.set(memory)
            return memory
        } else {
            return -1
        }
    }
}
