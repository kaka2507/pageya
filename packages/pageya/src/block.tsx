import React from "react";
import {Field} from "@form-composer/core";

export interface BlockTemplate {
    name: string,
    label: string
    screenshot: string,
    tags: string,
    defaultItem?: object | (() => object)
    fields?: Field[]
}

export interface Block {
    Component: React.FC<any>
    template: BlockTemplate
}

export interface BlockState {
    name?: string

    [key: string]: any
}

export const BlockContext = React.createContext<BlockState>({})
