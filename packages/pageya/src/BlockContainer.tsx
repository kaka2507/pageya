import React, {useContext, useState} from "react";
import {Field as FinalField} from "react-final-form";
import {Block, BlockContext} from "./block";
import {usePage} from "./use-page";
import {AddBlockMenu} from "./AddBlockMenu";
import {BlocksControls} from "./BlockControl";
import {BlockContainerContext} from "./BlockContainerContext";
import {Row} from 'antd'


export interface BlockContainerProps {
    name: string
    blocks: Block[]
    direction?: 'vertical' | 'horizontal'
    min?: number
    max?: number
}

export const BlockContainer = ({
                                   name,
                                   blocks,
                                   direction,
                                   min,
                                   max,
                               }: BlockContainerProps) => {
    const blockMap = React.useMemo(() => {
        return blocks.reduce((result, block) => {
            result[block.template.name] = block;
            return result;
        }, {})
    }, [blocks])
    const [activeBlock, setActiveBlock] = useState(-1)
    const {form, setFocusedBlock} = usePage()
    const parentField = useContext(BlockContext)
    const fieldName = (parentField && parentField.name) ? `${parentField.name}.${name}` : name

    return (
        <FinalField name={fieldName}>
            {({input}) => {
                const allData: { _template: string }[] = input.value || []

                const move = (from: number, to: number) => {
                    const movement = to - from
                    setActiveBlock(activeBlock => activeBlock + movement)
                    form.mutators.move(fieldName, from, to)
                    setFocusedBlock(`${fieldName}.${to}`)
                }
                const remove = (index: number) => {
                    form.mutators.remove(fieldName, index)

                    const isOnlyItem = input.value.length === 1
                    const isLastItem = input.value.length - 1 === index

                    if (isOnlyItem) {
                        setFocusedBlock('')
                    } else if (isLastItem) {
                        setFocusedBlock(`${input.name}.${index - 1}`)
                    } else {
                        setFocusedBlock(`${input.name}.${index}`)
                    }
                }
                const insert = (index: number, block: any) => {
                    form.mutators.insert(fieldName, index, block)
                    setFocusedBlock(`${fieldName}.${index}`)
                }

                return (
                    <BlockContainerContext.Provider
                        value={{
                            count: allData.length,
                            blocks,
                            activeBlock,
                            setActiveBlock,
                            direction: direction ? direction : 'vertical',
                            min,
                            max,
                            insert,
                            move,
                            remove,
                        }}>
                        {allData.length < 1 && (
                            <Row align="middle" justify="center">
                                <AddBlockMenu
                                    addBlock={block => insert(0, block)}
                                    blocks={blocks}
                                />
                            </Row>
                        )}
                        {allData.map((data, index) => {
                            const block = blockMap[data._template]
                            if (!block) {
                                console.warn(
                                    'Unrecognized block of type:',
                                    data._template
                                )
                                return null
                            }

                            const blockName = `${input.name}.${index}`
                            return (
                                <BlockContext.Provider key={index} value={{
                                    name: blockName,
                                    ...block,
                                }}>
                                    <BlocksControls index={index}>
                                        <block.Component {...data}/>
                                    </BlocksControls>
                                </BlockContext.Provider>
                            )
                        })}
                    </BlockContainerContext.Provider>
                )
            }}
        </FinalField>
    )
}
