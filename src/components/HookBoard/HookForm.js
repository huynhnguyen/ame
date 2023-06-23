import React, {useState, useEffect} from "react";
import validator from '@rjsf/validator-ajv8';
import Form from '@rjsf/core';
import './form.css';
export const HookForm = ({schema, defaultData, name, description, submit})=>{
    const [uiSchema, setUI] = useState();
    useEffect(()=>{
        if(schema?.properties){
            const UISchema = {};
            UISchema['ui:title'] = name
            UISchema['ui:description'] = description
            UISchema['ui:classNames'] = 'uform'
            Object.keys(schema.properties).map((key, idx)=>{
                UISchema[key]={ 'ui:classNames':'form-field', 
                                'ui:style':{'--b':'black','--r':'0.25rem'}}
                if(['address','text'].includes(key) && ['locale'].includes(key)){
                    UISchema[key]['ui:widget'] = 'textarea'
                }
            });
            UISchema['ui:submitButtonOptions'] = {
                'submitText':'Gởi',
                'props':{'className':'btn btn-sm btn-primary text-white my-[0.5rem]'}
            }
            setUI(UISchema);
        }
    }, [schema])
    return uiSchema && <Form
        uiSchema={uiSchema}
        schema={schema}
        className="uform "
        validator={validator}
        formData={defaultData}
        onSubmit={(e)=>{
            submit(e.formData)
        }}
    />
}