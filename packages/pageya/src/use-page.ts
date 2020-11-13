import React from "react";
import {Form} from "@form-composer/core";

export interface PageState {
    form: Form
    focusedBlock: string

    setFocusedBlock(field: string): void
}

export const PageContext = React.createContext<PageState | null>(
    null
)

export function usePage() {
    const pageFormContext = React.useContext(PageContext)

    if (!pageFormContext) {
        throw new Error('usePageForm must be within an PageFormContext')
    }

    return pageFormContext
}