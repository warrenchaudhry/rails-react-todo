import React, { useState, createRef } from 'react';
import axios from 'axios';
import setAxiosHeaders from "./AxiosHeaders";
import _ from 'lodash';

const TodoItem = (props) => {
  const { todoItem } = props;
  const [ complete, setComplete] = useState(todoItem.complete);
  const inputRef = createRef();
  const completedRef = createRef();
  const path = `/api/v1/todo_items/${todoItem.id}`;

  const handleDestroy = () => {
    setAxiosHeaders();
    const confirmation = confirm('Are you sure you want to proceed?')
    if(confirmation){
      axios
        .delete(path)
        .then(response => {
          props.getTodoItems();
        })
        .catch(error => {
          console.log(error)
        });
    }
  }

  const updateTodoItem = _.debounce((inputVal, isChecked) => {
    setAxiosHeaders();
    axios
      .put(path, {
        todo_item: {
          title: inputVal,
          complete: isChecked
        }
      })
      .then(response => {})
      .catch(error => {
        console.log(error);
      });
  }, 1000);

  const handleChange = () => {
    const isChecked = completedRef.current.checked;
    setComplete(isChecked)
    updateTodoItem(inputRef.current.value, isChecked);
  }

  return (
    <tr className={`${complete ? 'table-light' : ''}`}>
      <td>
        <svg
            className={`bi bi-check-circle ${complete ? 'text-success' : 'text-muted'}`}
            width="2em"
            height="2em"
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              fillRule="evenodd"
              d="M17.354 4.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L10 11.293l6.646-6.647a.5.5 0 01.708 0z"
              clipRule="evenodd"
          />
          <path
              fillRule="evenodd"
              d="M10 4.5a5.5 5.5 0 105.5 5.5.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63.5.5 0 11-.5.865A5.472 5.472 0 0010 4.5z"
              clipRule="evenodd"
          />
        </svg>
      </td>
      <td>
        <input
            type="text"
            defaultValue={todoItem.title}
            disabled={complete}
            onChange={ handleChange }
            ref={inputRef}
            className="form-control"
            id={`todoItem__title-${todoItem.id}`}
        />
      </td>
      <td className="text-right">
        <div className="form-check form-check-inline">
          <input
              type="boolean"
              defaultChecked={complete}
              onChange={ handleChange }
              ref={completedRef}
              type="checkbox"
              className="form-check-input"
              id={`complete-${todoItem.id}`}
          />
          <label
              className="form-check-label"
              htmlFor={`complete-${todoItem.id}`}
          >
            Complete?
          </label>
        </div>
        <button onClick={ handleDestroy } className="btn btn-outline-danger">Delete</button>
      </td>
    </tr>
  )
}

export default TodoItem;
