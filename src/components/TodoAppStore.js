/**
 * Created by synerzip on 20/7/16.
 */
import React from 'react';
import expect from 'expect';
import {createStore, combineReducers} from 'redux'


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

const visibilityFilter = (state ="SHOW_ALL",action ={}) => {
  switch(action.type){
    case "SET_FILTER" :{
      return action.filter;
    }
    default: return state;
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
testAddtodo();
testToggleTodo();

export default todoApp;