import React, { Component } from 'react';
import Todo from './Todo'

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todo: [
        { id: 1551274974621, check: false, content: 'Доробити todo', visual: true, },
        { id: 1551274974622, check: false, content: 'Заповнити форму як справи', visual: true, },
      ],
      valueInput: "",
      arhivTasks: [],
    }
  }

  render() {
    const arrTodo = this.state.todo.map((el, index) => {
      if (!el.visual) return null;
      return (<Todo key={index} click={() => this.updateCheck(el.id)} data={ el } />)
    });
    const task = this.countTask(this.state.todo);

    return (
      <div className="Container">
        <span>Завдання {task} з {this.state.todo.length}</span><br />
        {arrTodo}
        <input
          className="Font" 
          placeholder="add..."
          value={this.state.valueInput}
          onChange={(event) => this.valueInput(event)}
          type="text"
        />
        <button className="Font" onClick={() => this.addTodo()}>Добавити</button><br />
        <button className="Font" onClick={() => this.viewMark()}>Виконані</button>
        <button className="Font" onClick={() => this.viewAll()}>Всі</button>
        <button className="Font" onClick={() => this.active()}>Завдання</button>
        <button className="Font" onClick={() => this.toAthive()}>В архів</button>
        <hr />
        <div className="Arhiv">Архів:</div>
        <ul className="Arhiv">{ this.state.arhivTasks.map(el => <li key={el.id}>{el.content}</li>)}</ul>
      </div>
    )
  }

  updateCheck = (id) => {
    const index = this.state.todo.findIndex(el => el.id === id)

    let arrtodo = [...this.state.todo];
    arrtodo[index].check = !this.state.todo[index].check;
    
    this.setState({ todo: arrtodo, })
  }

  valueInput = (event) => {
    const text = event.target.value;
    this.setState({ valueInput: text })
  }

  toAthive = () => {
    let arrTodo = [...this.state.todo];
    let arrT = [];
    let arrA = [];
    
    for (let i = 0; i < arrTodo.length; i++) {
      if (arrTodo[i].check === false) arrT.push(arrTodo[i]);
      if (arrTodo[i].check === true) arrA.push(arrTodo[i])
    }
    let arr = [...this.state.arhivTasks];
    arrA.forEach(el => arr.push(el));

    this.setState({ 
      todo: arrT,
      arhivTasks: arr.reverse(),
     })
  }
  active = () => {
    let arrTodo = [...this.state.todo];
    let arrMark = [];

    arrMark = arrTodo.map(el => { return {...el, visual: !el.check }})
    arrMark = arrTodo.map(el => { return {...el, visual: !el.check }})
       
    this.setState({ todo: arrMark })
  }
  viewMark = () => {
    let arrTodo = [...this.state.todo];
    let arrMark = [];
    
    arrMark = arrTodo.map(el => { return {...el, visual: el.check }})
    arrMark = arrTodo.map(el => { return {...el, visual: el.check }})
    
    this.setState({ todo: arrMark })
  }

  viewAll = () => {
    let arrTodo = [...this.state.todo];
    let arrMark = [];
    for (let i = 0; i < arrTodo.length; i++) {
      arrTodo[i].visual = true;
      arrMark.push(arrTodo[i]);
    }
    this.setState({ todo: arrMark })
  }
  
  addTodo = () => {
    if (!this.state.valueInput) return;
    const setId = new Date().getTime();
    const form = { id: setId, check: false, content: this.state.valueInput, visual: true, };
    let tec = [...this.state.todo];
    tec.push(form);

    this.setState({ todo: tec, valueInput: '' });
  }

  countTask = (arrtodo) => {
    const tasks = arrtodo.filter(el => el.check === false);
    return tasks.length;
  }
}

export default App;
