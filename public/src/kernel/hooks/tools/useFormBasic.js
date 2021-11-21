import React from 'react';

/**
 * Es un hook que permite manejar formularios basicos,
 * @param formInit {Object} Sera de tipo {name: value, ...}
 * @returns {Array}
 */
export default function useFormBasic(formInit){
    const [formValues, setFormValues] = React.useState({...formInit});

    const handleChangeInput = (e, name) => {
        const newFormValues = {...formValues};
        newFormValues[name] = e.target.value;
        setFormValues(newFormValues);
    };

    const setValue = (name, value) => {
        const newFormValues = {...formValues};
        newFormValues[name] = value;
        setFormValues(newFormValues);
    };

    const setValues = (values) => {
        setFormValues({...values})
    }

    const cleanForm = () => {
        setFormValues(formInit);
    }

    return [
        formValues,
        handleChangeInput,
        setValue,
        cleanForm,
        setValues
    ]

}