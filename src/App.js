import "./index.css";
import React, { useState } from "react";

function App() {
  const [notes, upDateNotes] = useState({content : "", isDone : false});
  const [items, updateItems] = useState("");
  const [list, keepList] = useState([]);
  const [editState, changeState] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    upDateNotes((prevValue)=>{
      return {content: value, isDone:prevValue.isDone};
    });
  }

  function changeListItem(event){
    const value=event.target.value;
    updateItems(event.target.value);
    const ind=parseInt(event.target.id, 10);
    list[ind]={content:value,isDone:list[ind].isDone};
    console.log(list);
  }

  function addNote(event) {
    event.preventDefault();
    keepList((prevList) => {
      return [...prevList, notes];
    });
    upDateNotes((prevValue)=>{
      return {content: "" ,isDone:prevValue.isDone};
    });
  }

  function deleteItem(event) {
    keepList((prevList) => {
      return prevList.filter((item, index) => {
        return index !== parseInt(event.target.id, 10);
      });
    });
  }

  function doneTask(event) {
    const x=parseInt(event.target.id, 10);
    let updatedList=list.map((item,index)=>{
      if(x===index){
        if(x===index){
          item.isDone=!item.isDone;
        }
      }
      return item;
    })
    keepList(updatedList);
    console.log();
    console.log(list);
  }

  function editable(event) {
    event.preventDefault();
    changeState((prevValue) => {
      if (prevValue=== false) {
        return true;
      } else {
        return false;
      }
    });
  }

  return (
    <div className="App">
      <h1 className="heading">
        <centre>To do list</centre>
      </h1>
      <form>
        <input
          name="listItem"
          className="listItem"
          onChange={handleChange}
          placeholder="Add a Task"
          value={notes.content} 
        />
        <button className="addButton" onClick={addNote}>
          +
        </button>
      </form>
      <ul className="list">
        {list.map((item, index) => {
          return (
            <li className="listitem">
              {" "}
              <button className="doneButton" onClick={doneTask} id={index}>
                ✔️
              </button>
              {" "} 
              {console.log(item)}
              <input className={item.isDone ? "striked": "inputItem"} name="inputItem" onChange={changeListItem} defaultValue={item.content} value={item.content} id={index}></input>
              <button className="deletebutton" onClick={deleteItem} id={index}>
                🗑️
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
