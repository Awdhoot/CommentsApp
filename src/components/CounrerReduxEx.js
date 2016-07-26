/**
 * Created by synerzip on 22/7/16.
 */
import {createStore} from 'redux'
import React from 'react'

const  counter = (state = 0, action={}) => {
  /*if(typeof state === 'undefined'){
   return 0; //as initial state
   }*/
  switch (action.type){
    case "INCREMENT":{
      return state + 1;
    }
    case "DECREMENT":{
      return state - 1;
    }
    default : return state;
  }
};
/*expect(
    counter(0,{type: "INCREMENT"})
).toEqual(1);

expect(
    counter(2,{type: "INCREMENT"})
).toEqual(3);
expect(
    counter(2,{type: "DECREMENT"})
).toEqual(1);
expect(
    counter(0,{type: "NEW_ACTION"})
).toEqual(0);
expect(
    counter(undefined,{type: "WHATEVER"})
).toEqual(0);

console.log('Tests passed!');*/

const counterStore = createStore(counter);



const ShowCounter = ({value}) => {
  return (<h1>{value}</h1>)
};

const IncrementCounter = ({onIncrement}) => {
  return (
      <p><button class="button" onClick={onIncrement}> INCREMENT </button> </p>
  )
};
const DecrementCounter = ({onDecrement})=> {
  return (<p> <button class="button" onClick={onDecrement}> DECREMENT </button> </p>);
};

export default class  Counter extends React.Component{
  componentDidMount(){
    this.unSubscribe = counterStore.subscribe(() =>{
      this.forceUpdate();
    })
  }
  componentWillUnmount(){
    this.unSubscribe();
  }
  render(){
    return (
        <div>
          <h4>Redux Counter example</h4>
          <ShowCounter value= {counterStore.getState()} />
          <IncrementCounter
              onIncrement ={()=>{
                counterStore.dispatch({
                type:"INCREMENT"
              })}} />
          <DecrementCounter
              onDecrement={()=>{counterStore.dispatch({
                type:"DECREMENT"
              })}} />
        </div>
    )
  }
};
