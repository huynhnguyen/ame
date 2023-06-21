import React from "react";
import validator from '@rjsf/validator-ajv8';
import Form from '@rjsf/core';
const _schema = {
    title: 'Todo',
    type: 'object',
    required: ['title'],
    properties: {
      title: { type: 'string', title: 'Title', default: 'A new task' },
      done: { type: 'boolean', title: 'Done?', default: false },
    },
  };
export const HookModal = ({schema, id, defaultData, loading, error})=>{
    return <dialog className="modal" id={id}>
        {schema && <Form
            method="dialog"
            className="modal-box"
            schema={schema}
            validator={validator}
            onChange={(e)=>console.log('changed')}
            onSubmit={(e)=>console.log('submitted')}
            onError={(e)=>console.log('errors')}
        />}
    </dialog>
}