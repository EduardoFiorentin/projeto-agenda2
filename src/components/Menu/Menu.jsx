import React, { Component } from 'react';
import Styled from 'styled-components'
import './style.css'
import Storage from '../../assets/js/LSlibrary'


// Controla a abertura e fechamento do menu de adição de tarefas+
export function menuOff(event) {
    event.stopPropagation()

    console.log('fechar')
    if (!document.querySelector('.menu-container').classList.contains('close')) {
        document.querySelector('.menu-container').classList.add('close')
    }
}
export function menuOn(event) {
    event.stopPropagation()
    document.querySelector('.menu-container').classList.remove('close')
}



export class Menu extends Component{
    constructor(props) {
        super(props)
    }

    createTask() {
        const title = document.querySelector('#title').value
        const text = document.querySelector('#text').value
        const day = document.querySelector('#select-day').value
        const color = document.querySelector('#select-color').value

        
        let state = this.props.data
        
        let task = {
            id: state[day].length,
            title,
            text,
            color,
            completed: false
        }
        
        state[day].push(task)
        console.log(state);
        
        this.props.mudarState(state)
        
        const storage = new Storage('agenda')
        let modificar = storage.getElements()
        modificar[0][day].push(task)
        storage.set(modificar[0])


    }


    render() {
        return (
            <div className="menu-container">
                <MenuLoad>
                    <MenuLoadButton>carregar</MenuLoadButton>
                    <MenuSaveButton>salvar</MenuSaveButton>
                </MenuLoad>
                <MenuSelectContainer id="select-container">
                    <MenuSelect id="select-color">
                        <MenuSelectOption value="white">Branco</MenuSelectOption>
                        <MenuSelectOption value="rgba(255, 20, 20, .8)">Vermelho</MenuSelectOption>
                        <MenuSelectOption value="rgba(255, 255, 0, .8)">Amarelo</MenuSelectOption>
                        <MenuSelectOption value="rgba(0, 255, 50, .6)">Verde</MenuSelectOption>
                        <MenuSelectOption value="lightgrey">Cinza</MenuSelectOption>
                    </MenuSelect>
                    <MenuSelect id="select-day">
                        <MenuSelectOption className="Domingo" value='sunday'>Domingo</MenuSelectOption>
                        <MenuSelectOption className="Segunda" value='monday'>Segunda</MenuSelectOption>
                        <MenuSelectOption className="Terça" value="tuesday">Terça</MenuSelectOption>
                        <MenuSelectOption className="Quarta" value='wednesday'>Quarta</MenuSelectOption>
                        <MenuSelectOption className="Quinta" value='thursday'>Quinta</MenuSelectOption>
                        <MenuSelectOption className="Sexta" value="friday">Sexta</MenuSelectOption>
                        <MenuSelectOption className="Sabado" value="saturday">Sábado</MenuSelectOption>
                    </MenuSelect>
                </MenuSelectContainer>
                <MenuTitle>
                    <MenuTitleInput id="title" placeholder='titulo'/>
                </MenuTitle>
                <MenuTextBox>
                    <MenuTextInput resize id="text" placeholder='texto'/>
                </MenuTextBox>
                <MenuCreateTask>
                    <MenuCreateTaskButton onClick={this.createTask.bind(this)}>Criar tarefa
                    </MenuCreateTaskButton>
                </MenuCreateTask>
            </div>
        )
    }
}



const base = Styled.div`
display: flex;
width: 100%;
justify-content: space-around;
margin-top: 20px;
`
const MenuLoad = Styled(base)``
const MenuSelectContainer = Styled(base)``
const MenuSelectDay = Styled(base)``
const MenuTitle = Styled(base)``
const MenuTextBox = Styled(base)``
const MenuCreateTask = Styled(base)``
const MenuLoadButton = Styled.button`
width: 45%;
height: 45px;
font-size: 1.3rem;
text-transform: uppercase;
`
const MenuSaveButton = Styled.button`
width: 45%;
height: 45px;
font-size: 1.3rem;
text-transform: uppercase;
`
const MenuTitleInput = Styled.input`
width: 80%;
padding: 10px;
height: : 10px;
font-size: 1.5rem;
background-color: #F0F0F2;
`
const MenuTextInput = Styled.textarea`
width: 80%;
height: 300px;
resize: none;
font-size: 1.3rem;
padding: 10px;
background-color: #F0F0F2;
`
const MenuSelect = Styled.select`
width: 45%;
text-align: center;
font-size: 1.2rem;
height: 2rem;
background-color: #CCCFD9;
`
const MenuSelectOption = Styled.option`
`
const MenuCreateTaskButton = Styled.button`
width: 45%;
height: 45px;
font-size: 1.3rem;
text-transform: uppercase;
`
