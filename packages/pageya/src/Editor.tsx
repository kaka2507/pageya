import React from "react";
import {createForm, Field} from "@form-composer/core";
import {Block} from "./block";
import {Page} from "./Page";
import {BlockContainer} from "./BlockContainer";
import "antd/dist/antd.css";

export interface EditorProps {
    initialValues?: object
    metaFields?: Field[],
    blocks: Block[],
    onChange?:  Function,
    onSubmit: Function,
    onBack?: Function,
}

export const Editor = ({initialValues, metaFields, blocks, onChange, onSubmit, onBack}: EditorProps) => {
    const form = createForm({
        initialValues,
        onSubmit: async (values) => {
            onSubmit(values);
        },
        fields: metaFields ? metaFields : []
    }, onChange)
    return (
        <Page form={form} onBack={onBack}>
            <BlockContainer name="blocks" blocks={blocks}/>
        </Page>
    )
}