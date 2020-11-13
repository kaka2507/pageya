import {Block} from "./block";
import React from "react";

export interface BlockContainerState {
    count: number
    blocks: Block[]
    activeBlock: number | null
    setActiveBlock: any
    direction: 'vertical' | 'horizontal'
    min?: number
    max?: number

    insert(index: number, data: any): void

    move(from: number, to: number): void

    remove(index: number): void
}

export const BlockContainerContext = React.createContext<BlockContainerState | null>(
    null
)
