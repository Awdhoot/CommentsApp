/**
 * Created by synerzip on 20/7/16.
 */
import React from 'react';
import {createStore, combineReducers} from 'redux'
import ReactDOM from 'react-dom'
import {Button} from 'react-router'
import {Provider} from 'react-redux'

const todo = (todo,action) => {
  switch(action.type){
    case "ADD_TODO":{
      return {
        id: action.id,
        text:action.text,
        completed:false
      }
    }
    case "TOGGLE_TODO":{
      if(action.id !== todo.id)
        return todo;
      return Object.assign({},todo,{completed: !todo.completed})
    }
    default : return todo;
  }
};

const todos = (state=[], action={}) => {
  switch(action.type){
    case "ADD_TODO":{
      return [
        ...state,
        todo(undefined,action)
      ]
    }
    case "TOGGLE_TODO": {
      return state.map(t =>todo(t,action));
    }
    default: return state
  }
};

const visibilityFilter = (state ="SHOW_ALL",action ={}) => {
  switch(action.type){
    case "SET_FILTER" :{
      return action.filter;
    }
    default: return state;
  }
};

/*const todoApp = (state={}, action ={}) => {
 return {
 todos: todos(state.todos, action),
 filter: visibilityFilter(state.filter, action)
 }
 };*/


const todoApp = combineReducers({
  todos: todos, //this field will be managed by TODOS reducer
  filter: visibilityFilter //this field will be managed by VISIBILITYFILTER reducer
});



/*


const testAddtodo = () => {
  var stateBe4 = [];
  var action={
    type: "ADD_TODO",
    id:0,
    text:"TODO"
  };
  var stateAfter = [{
    id:0,
    text: "TODO",
    completed:false
  }];

  expect(todos(stateBe4, action)).toEqual(stateAfter);
};

const testToggleTodo = () => {
  var stateprev = [{
    id: 0,
    text: "TODO",
    completed: false
  },
    {
      id: 1,
      text: "TODO",
      completed: false
    }];
  var stateCurr= [
    {
      id: 0,
      text: "TODO",
      completed: false
    },
    {
      id: 1,
      text: "TODO",
      completed: true
    }
  ];
  var action = {
    type: "TOGGLE_TODO",
    id: 1
  };
  expect(todos(stateprev, action)).toEqual(stateCurr);

};

*/


let counter =0;

const getVisibleTodos = (todos, filter) => {
  switch(filter){
    case "SHOW_ALL":{
      return todos;
    }
    case "SHOW_COMPLETED":{
      return todos.filter(todo => {
        return todo.completed;
      })
    }
    case "SHOW_ACTIVE":{
      return todos.filter(todo => {
        return !todo.completed
      })
    }
  }
};

const Todo = ({onClick,completed,text}) => {
  return (
      <li onClick={onClick} style={{
        color: completed ? 'green' : 'red',
        cursor: 'pointer'
      }}>{text}</li>
  )
};


const AddTodo = (props,{store}) => {
  let input;
  //let store = context.store;
  return (
      <div>
        <input type="text" ref={node => {
          input = node;
        }}/>
        <button onClick={() => {
            store.dispatch({
              type:"ADD_TODO",
              text:input.value,
              id: counter ++
            });
          input.value = "";
        }}>
          add todo
        </button>
      </div>
  )
};
//to receive context

AddTodo.contextTypes = {
  store: React.PropTypes.object
};

class VisibleTodoList extends React.Component{
  componentDidMount(){
    const store = this.context.store;
    this.unSubscribe = store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount(){
    this.unSubscribe();
  }
  render(){
    const store = this.context.store;
    const state = store.getState();

    return(
        <TodosList
            todos={getVisibleTodos(state.todos, state.filter)}
            onTodoClick={id => store.dispatch({
                type:"TOGGLE_TODO",
                id })} />
    )
  }
}
//to receive context
VisibleTodoList.contextTypes = {
  store: React.PropTypes.object
};

const TodosList = ({todos, onTodoClick}) => {
  return (
      <ul>
        {todos.map(todo =>
                <Todo
                    key={todo.id}
            {...todo}
                    onClick={()=> onTodoClick(todo.id)}
                />
        )}
      </ul>
  )
};

const TodoApp = () =>  {
    return (
        <div>
          <h1>HELLO FROM TODO</h1>
            <AddTodo />
            <VisibleTodoList />
            <Footer />
        </div>
    );
};

const Footer = () => {
  return (
      <p>
        <FilterLink filter="SHOW_ALL">SHOW ALL </FilterLink>
              {'  '}
        <FilterLink filter="SHOW_COMPLETED">SHOW COMPLETED </FilterLink>
              {'  '}
        <FilterLink filter="SHOW_ACTIVE" >SHOW ACTIVE </FilterLink>
      </p>
  )
};

class FilterLink extends React.Component{
  componentDidMount(){
    const {store} = this.context;
    this.unSubscribe = store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount(){
    this.unSubscribe();
  }

  render(){
    const props= this.props;
    const {store} = this.context;

    const state= store.getState();
    return(
        <Link active={props.filter === state.filter}
            onClick={() => {
              store.dispatch({
                type: "SET_FILTER",
                filter: props.filter
              })}}>
        {props.children}
        </Link>
    )
  }
}
//to receive context
FilterLink.contextTypes = {
  store: React.PropTypes.object
};

const Link = ({ children, active, onClick}) => {
  if(active){
    return (<span>{children}</span>);
  }
  return (
      <a href="#" onClick= {(e) => {
        e.preventDefault();
        onClick();
      }}>
          {children}
      </a>
  )
};

/*class Provider extends React.Component{
  getChildContext(){
    return {
      store: this.props.store
    }
  }
  render(){
    return (this.props.children);
  }
}*/
//to send as context
/*Provider.childContextTypes =  {
  store: React.PropTypes.object
};*/

/*
ReactDOM.render(<Provider store={createStore(todoApp)}>
  <TodoApp   />
  </Provider>, document.getElementById("todo"));

*/
