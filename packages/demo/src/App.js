import React, {useMemo, useCallback} from 'react';
import {Pageya, Editor} from "pageya";
import {Hero01Block, Hero02Block, Hero03Block} from "./blocks";
import './styles/style.css'
import {
    BooleanFieldComponent,
    ChoiceFieldComponent,
    LongTextFieldComponent,
    TextFieldComponent
} from "@form-composer/ant-fields";

const BLOCKS = [
    Hero01Block,
    Hero02Block,
    Hero03Block,
]

const App = () => {
    const onSubmit = useCallback(values => {
        alert('onSubmit:\n' + JSON.stringify(values))
    }, [])

    const metaFields = useMemo(() => [
        {
            name: 'meta',
            label: 'Meta',
            component: 'object',
            fields: [
                {name: 'title', label: 'Title', component: 'text'},
                {name: 'description', label: 'Description', component: 'text'}
            ],
            shrink: false
        }
    ], [])

    const formConfig = useMemo(() => ({
        fieldTypes: [
            TextFieldComponent,
            LongTextFieldComponent,
            ChoiceFieldComponent,
            BooleanFieldComponent,
        ],
    }), [])

    return (
        <Pageya formConfig={formConfig}>
            <Editor metaFields={metaFields} blocks={BLOCKS} onSubmit={onSubmit}/>
        </Pageya>
    )
};

export default App;
