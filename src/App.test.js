import "./index.css";
import React, { useState } from "react";

function App() {
  const [notes, upDateNotes] = useState("");
  const [items, updateItems] = useState("");
  const [list, keepList] = useState([]);
  const [strikeList,strike] = useState([]);
  const [editState, changeState] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    upDateNotes(value);
  }

  function Struck(props) {
    console.log("f");
    if(props.strikes[props.id]==0){
      return <textarea className="inputItem" name="inputItem" onChange={props.onChange} defaultValue={props.defaultValue} value={props.value} id={props.id}></textarea>
    }
    else{
      return <textarea className="striked" defaultValue={props.defaultValue} readonly="readonly"/>
    }
  }

  function changeListItem(event){
    const value=event.target.value;
    updateItems(event.target.value);
    const ind=parseInt(event.target.id, 10);
    list[ind]=value;
    console.log(list);
  }

  function addNote(event) {
    event.preventDefault();
    keepList((prevList) => {
      return [...prevList, notes];
    });
    strike((prevList)=>{
      return [...prevList, 0];
    })
    upDateNotes("");
  }

  function deleteItem(event) {
    //const givenItem=event.target;
    strike((prevList) => {
      return prevList.filter((item,index) => {
        return index !==parseInt(event.target.id, 10);
      })
    })
    keepList((prevList) => {
      return prevList.filter((item, index) => {
        return index !== parseInt(event.target.id, 10);
      });
    });
  }

  function doneTask(event) {
    if(strikeList[event.target.id]===0){
      strikeList[event.target.id]=1;
    }
    else{
      strikeList[event.target.id]=0;
    }
    console.log(list);
  }

  // function doneTask(id) {
  //   if(strikeList[id]===0){
  //     strikeList[id]=1;
  //   }
  //   else{
  //     strikeList[id]=0;
  //   }
  //   console.log(list);
  // }

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
          value={notes} 
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
              <Struck onChange={changeListItem} defaultValue={item} value={item} id={index} strikes={strikeList}/>
              {/* <input className="inputItem" name="inputItem" onChange={changeListItem} defaultValue={item} value={item} id={index}></input> */}
              <button className="listbutton" onClick={deleteItem} id={index}>
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
