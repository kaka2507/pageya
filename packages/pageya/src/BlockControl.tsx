import React from 'react'
import {usePage} from "./use-page";
import {AddBlockMenu} from "./AddBlockMenu";
import {BlockContext} from "./block";
import {InlineSettings} from "./InlineSettings";
import {
    DeleteOutlined,
    VerticalAlignBottomOutlined,
    VerticalAlignTopOutlined,
    VerticalLeftOutlined,
    VerticalRightOutlined
} from '@ant-design/icons'
import {Button} from "antd";
import {useBlockContainer} from "./use-block-container";

export interface BlocksControlsProps {
    children: React.ReactNode
    index: number
}

export function BlocksControls({
                                   children,
                                   index,
                               }: BlocksControlsProps) {
    const {focusedBlock, setFocusedBlock} = usePage()
    const {name, template} = React.useContext(BlockContext)
    const {
        insert,
        move,
        remove,
        blocks,
        count,
        direction,
        min,
        max,
    } = useBlockContainer()
    const isFirst = index === 0
    const isLast = index === count - 1

    const addBeforePosition = direction === 'horizontal' ? 'left' : 'top'
    const addAfterPosition = direction === 'horizontal' ? 'right' : 'bottom'

    const removeBlock = (event: any) => {
        event.stopPropagation()
        event.preventDefault()
        remove(index)
    }
    const moveBlockUp = (event: any) => {
        event.stopPropagation()
        event.preventDefault()
        move(index, index - 1)
    }
    const moveBlockDown = (event: any) => {
        event.stopPropagation()
        event.preventDefault()
        move(index, index + 1)
    }

    const withinLimit = (limit: number | undefined) => {
        if (!limit) return true
        return !(limit === count || (max === count && min === count))
    }

    const setActiveBlock = (event: any) => {
        event.stopPropagation()
        event.preventDefault()
        setFocusedBlock(name!)
    }

    const isActive = name === focusedBlock

    const inactiveStyle = {
        position: 'relative',
        width: '100%',
        cursor: 'pointer',
    } as React.CSSProperties;

    const activeStyle = {
        position: 'relative',
        width: '100%',
        border: '1px solid #2296fe',
        borderRadius: '10px',
        cursor: 'pointer',
    } as React.CSSProperties;

    const menuStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        display: 'flex',
        border: '1px solid #edecf3',
        borderRadius: '5px',
        zIndex: 150,
        backgroundColor: '#FFFFFF',
        paddingLeft: '10px',
    } as React.CSSProperties;

    return (
        <div style={isActive ? activeStyle : inactiveStyle}
             onClick={setActiveBlock}
        >
            {isActive && (
                <>
                    {withinLimit(max) && (
                        <>
                            <AddBlockMenu
                                addBlock={block => insert(index, block)}
                                blocks={blocks}
                                position={addBeforePosition}
                            />
                            <AddBlockMenu
                                addBlock={block => insert(index + 1, block)}
                                blocks={blocks}
                                position={addAfterPosition}
                            />
                        </>
                    )}
                    <div style={menuStyle}>
                        <Button type="text"
                                style={{display: 'flex', alignItems: 'center'}}
                                disabled={isFirst}
                                onClick={moveBlockUp}
                                icon={direction === 'vertical' ? <VerticalAlignTopOutlined/> :
                                    <VerticalLeftOutlined/>}/>
                        <Button type="text"
                                style={{display: 'flex', alignItems: 'center'}}
                                disabled={isLast}
                                onClick={moveBlockDown}
                                icon={direction === 'vertical' ? <VerticalAlignBottomOutlined/> :
                                    <VerticalRightOutlined/>}/>
                        <InlineSettings fields={template.fields}/>
                        {withinLimit(min) && (
                            <Button
                                type="text"
                                style={{display: 'flex', alignItems: 'center'}}
                                onClick={removeBlock}
                                icon={<DeleteOutlined/>}/>
                        )}
                    </div>
                </>
            )}
            {children}
        </div>
    )
}
