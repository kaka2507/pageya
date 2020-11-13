import React, {FC} from 'react'
import {FieldsBuilder, Form, Field} from '@form-composer/core'
import {Form as FinalForm, useForm} from 'react-final-form'

export interface FormBuilderProps {
    form: Form,
    fields?: Field[]
}

const FF: any = FinalForm

export const FormBuilder: FC<FormBuilderProps> = ({form, fields}) => {
    const renderFields = fields? fields : form.fields
    return (
        <FF form={form.finalForm}>
            {() => {
                const finalForm = useForm();
                console.log('form:', finalForm);
                return (
                    <FieldsBuilder form={form} fields={renderFields}/>
                )
            }}
        </FF>
    )
}