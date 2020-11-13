import React from "react";
import {FormComposer, FormComposerConfig, FormComposerProvider} from "@form-composer/core";


export interface PageyaProps {
    formConfig: FormComposerConfig
}

export const Pageya: React.FC<PageyaProps> = ({formConfig, children}) => {
    const formComposer = new FormComposer(formConfig);
    return (
        <FormComposerProvider formComposer={formComposer}>
            {children}
        </FormComposerProvider>
    )
}
