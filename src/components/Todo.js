import React from 'react';

export default props => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div
      style={{
        textDecoration: props.todo.complete ? 'line-through' : ''
      }}
      onClick={props.toggleComplete}
    >
      {props.todo.text}
    </div>
    <button class="btn btn-danger ml-3" onClick={props.onDelete}>
      Delete
    </button>
  </div>
);
