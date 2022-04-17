import React, { Component } from 'react';
import Styled from 'styled-components'
import {Menu, menuOn, menuOff} from "../Menu/Menu";
import Storage from '../../assets/js/LSlibrary'
import '../Menu/style.css'


//Elementos de render do corpo principal da página 
const Days = Styled.section`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
width: 100vw;
min-height: 100vh;
height: auto;
`
const DayBody = Styled.div`
width: 100%;
min-height: 90vh;
background-color: #2E3140;                                                  //cor de fundo do body
`
const DayHeader = Styled.h2`
color: #F0F0F2;                                                            //cor da letra dos dias
display: flex;
background-color: #2E3140;
height: 10vh;
font-size: 1.5rem;
justify-content: center;
align-items: center;
font-weight: bold;
cursor: pointer;
`
const DayContainer = Styled.div`
height: 100vh;
:not(:last-child) {
    border-right: 1px 1px 1px solid rgba(0, 0, 0, .5)
}
`

export default class MainBody extends Component{
    constructor(props) {
        super(props)

        //Esqueleto base dos dados da agenda
        this.ref = {
            sunday: [],
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [], 
            friday: [], 
            saturday: []
        }

        //Inicia a sessão do Local Storage para verficar ser há elementos salvos (caso não haja, um slot de armazenamento com o esqueleto principal é criado)
        this.storage = new Storage('agenda')
        //Se já houverem tarefas salvas, o state as recebe. Caso contrário o state recebe o esqueleto base. 
        this.state = this.storage.isNotEmpty() ? this.updateTasks() : this.ref

        //Se o storage estiver vaziu, ele recebe a estrutura básica de dados 
        if (!this.storage.isNotEmpty()) {
            this.storage.set(this.state)
        } else {
            this.updateTasks()
        }
    }

    //retorna as tarefas armazenadas no localStorage. 
    updateTasks() {
        const elements = this.storage.getElements()
        return elements[0]
    }

    render () {
        return (
            <>
            {/* Renderiza o menu de adição de terefas */}
            <Menu data={this.state} mudarState={this.setState.bind(this)}/>

            {/* Renderiza o corpo da página - contêm os cards de tarefas */}
            <Days onClick={menuOff}>
                <DayContainer>
                    <DayHeader onClick={menuOn}>Domingo</DayHeader>
                    <DayBody className='sunday' id="sunday">
                        <Tasks day={this.state.sunday}/>
                    </DayBody>
                </DayContainer>

                <DayContainer>
                    <DayHeader onClick={menuOn}>Segunda</DayHeader>
                    <DayBody className='monday' id="monday">
                        <Tasks day={this.state.monday}/>
                    </DayBody>
                </DayContainer>

                <DayContainer>
                    <DayHeader onClick={menuOn}>Terça</DayHeader>
                    <DayBody className='tuesday' id="tuesday">
                        <Tasks day={this.state.tuesday}/>
                    </DayBody>
                </DayContainer>

                <DayContainer>
                    <DayHeader onClick={menuOn}>Quarta</DayHeader>
                    <DayBody className='wednesday' id="wednesday">
                        <Tasks day={this.state.wednesday}/>
                    </DayBody>
                </DayContainer>

                <DayContainer>
                    <DayHeader onClick={menuOn}>Quinta</DayHeader>
                    <DayBody className='thursday' id="thursday">
                        <Tasks day={this.state.thursday}/>
                    </DayBody>
                </DayContainer>

                <DayContainer>
                    <DayHeader onClick={menuOn}>Sexta</DayHeader>
                    <DayBody className='friday' id="friday">
                        <Tasks day={this.state.friday}/>
                    </DayBody>
                </DayContainer>
                
                <DayContainer>
                    <DayHeader onClick={menuOn}>Sábado</DayHeader>
                    <DayBody className='saturday' id="saturday">
                        <Tasks day={this.state.saturday}/>
                    </DayBody>
                </DayContainer>
            </Days>
            </>
    )
    }
}


// Elementos de render das tarefas 
const Card = Styled.div`
:not(:first-child) {
    margin-top: 15px; 
    margin-bottom: 15px; 
}
margin-left: 5px; 
margin-right: 5px; 
padding: 10px;
border-radius: 10px;
box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6); 
`
const CardTitle = Styled.h2`
font-size: 1.8rem;
text-align: center;
color: blue;
`
const CardBody = Styled.p`
text-align: center;
font-size: 1.5rem;

`
const CardRemove = Styled.a`
:hover {
    filter: invert(30%);
    cursor: pointer;
}
`
const CardComplete = Styled.a`
:hover {
    filter: invert(30%);
    cursor: pointer;
}
`
const CardRemoveContainer = Styled.div`
display: flex;
justify-content: space-between; 
margin-top: 10px;
`


//Funçao que cria os cards de tarefa 
function Tasks(props) {
    return (
        props.day.map((task, index) => {
            return (
                <Card key={index} style={{backgroundColor: task.color}} id={task.id} className={task.completed ? 'ready': ''}>
                    <CardTitle>{task.title}</CardTitle>
                    <CardBody>{task.text}</CardBody>
                    <CardRemoveContainer className='excession'>
                        <CardRemove
                            onClick={remover}
                        >Remover</CardRemove>
                        <CardComplete
                            onClick={completar}
                        >{task.completed ? 'Descompletar' : 'Completar'}</CardComplete>
                    </CardRemoveContainer>
                </Card>
            )
        })
    )
}


//FUNCIONAMENTO DO STORAGE
//As atualizações de remoção, conclusão e adição de tarefas ocorrem em duas frentes de maneira independente. São elas a página HTML renderizada e o Local Storage. Desta maneira ocorre a atualização em tempo real de elementos na tela e ao mesmo tempo o estado atual é armazenado no Local Storage.


function completar(event) {
    event.preventDefault()

    // Coletar informações referentes a tarefa a ser completada
    let local = event.target.parentNode.parentNode
    let id = parseInt(local.getAttribute('id'))
    let day =  event.target.parentNode.parentNode.parentNode.getAttribute('id')

    // Coletar estado atual de armazenamento
    const storage = new Storage('agenda')
    let modificar = storage.getElements()

    // Adicionar a classe de conclusão visual e o botão completar
    if (event.target.innerText == 'Completar') {
        local.classList.add('ready')
        event.target.innerText = 'Descompletar'

        modificar[0][day][id].completed = true

    } else {
        event.target.innerText = 'Completar'
        local.classList.remove('ready')

        modificar[0][day][id].completed = false
    }

    //Envia ao Local Storage os dados modificados
    storage.set(modificar[0])
}


function remover(event) {
    //pegar informações 
    event.preventDefault()
    let local = event.target.parentNode.parentNode
    let id = parseInt(local.getAttribute('id'))
    let dia =  event.target.parentNode.parentNode.parentNode.getAttribute('id')
    console.log(id, dia)

    //remover da tela
    local.remove()

    //pegar local storage
    const storage = new Storage('agenda')
    let modificar = storage.getElements()

    //remover do local storage
    console.log(modificar[0][dia])
    modificar[0][dia].splice(id, 1)

    //refatorar ids
    modificar[0][dia].map((element, index) => {
        element.id = index
    })

    //mandar de volta pro storge
    storage.set(modificar[0])
}
