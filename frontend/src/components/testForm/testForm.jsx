import React from 'react';
import style from './testForm.module.css';
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";

export const TestForm = () => {
    const {register, control, handleSubmit, reset} = useForm({
        defaultValues:{
            test: [{firstName: "Bill", lastName: "Luo"}]
        }
    });
    const {
        fields,
        append,
        prepend,
        remove,
        swap,
        move,
        insert,
        replace
      } = useFieldArray({
        control,
        name: "test"
      });
    //   const onSubmit = (data) => console.log("data", data);
    // const onSubmit = data =>{
    //     console.log(data);
    // };
    const onSubmit = (data) =>{
        console.log(JSON.stringify(data));
        reset();
       
      }




  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
     <ul>
        {fields.map((item, index) => {
          return (
            
            <li key={item.id}>
              <input
                {...register(`test.${index}.firstName`, { required: true })}
              />

              <Controller
                render={({ field }) => <input {...field} />}
                name={`test.${index}.lastName`}
                control={control}
              />
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>

      <button
          type="button"
          onClick={() => {
            append({ firstName: "appendBill", lastName: "appendLuo" });
          }}
        >
          append
        </button>


        <input type="submit" />
    </form>
    </>
    
    // <div>testForm</div>
  )
}
export default TestForm;