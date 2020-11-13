import React from "react";
import {BlockContainerContext} from "./BlockContainerContext";

export function useBlockContainer() {
    const blockContainerContext = React.useContext(BlockContainerContext)

    if (!blockContainerContext) {
        throw new Error('useBlocks must be within an BlockContainerContext')
    }

    return blockContainerContext
}