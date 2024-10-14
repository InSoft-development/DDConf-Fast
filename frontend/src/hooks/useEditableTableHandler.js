import { useState } from 'react';

const useEditableTableHandler = () => {
    
    const [formValues, setFormValues] = useState([]);

    const addRow = (e) => {
        const newFormValues = [...formValues, {
            id: formValues.length,
            main: null,
            second: null,
            comment: null
        }]

        setFormValues(newFormValues);
    }

    const removeRow = (index) => {
        const newFormData = [...formValues]
            .filter((_, rowId) => rowId !== index)
            .map((row, index) => {
                return {
                    ...row,
                    id: index
                }
            })

        setFormValues(newFormData)

    }

    const changeCellValue = (e) => {
        const newValue = e.target.value;
        const [index, fieldName] = e.target.id.split('.');

        const newFormValues = [...formValues].map(row => {

            if (row.id === Number(index)) {
                return {
                    ...row,
                    [fieldName]: newValue
                }
            }

            return row;
        })
        setFormValues(newFormValues);
    }

    return {
        formValues,
        setFormValues,
        addRow,
        removeRow,
        changeCellValue,
    }

}

export default useEditableTableHandler;