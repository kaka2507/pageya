import React from "react";
import {getBlocks, getTags} from "./utils";
import {Block} from './block'
import {Button, Col, Divider, Image, Modal, Row, Tag} from 'antd'
import {PlusCircleTwoTone} from '@ant-design/icons'

const {CheckableTag} = Tag;

interface AddBlockMenuProps {
    blocks: Block[]
    position?: 'top' | 'bottom' | 'left' | 'right'

    addBlock(data: any): void
}

export function AddBlockMenu({
                                 blocks,
                                 addBlock,
                                 position,
                             }: AddBlockMenuProps) {
    const allTags: string[] = getTags(blocks);
    const [open, setOpen] = React.useState(false)
    const [selectedTags, setSelectedTags] = React.useState<string[]>([])
    const filteredBlocks = getBlocks(blocks, selectedTags);

    const toggleTag = (tag: string) => {
        if (selectedTags.indexOf(tag) === -1) {
            setSelectedTags([...selectedTags, tag])
        } else {
            setSelectedTags(selectedTags.filter(e => e !== tag))
        }
    }

    const styles = {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 150,
        width: (position === 'top' || position === 'bottom') ? '100%' : undefined,
        height: (position === 'left' || position === 'right') ? '100%' : undefined,
        top: !position ? '0' : position === 'top' ? '-18px' : undefined,
        bottom: position === 'bottom' ? '-15px' : undefined,
        left: position === 'right' ? '-16px' : undefined,
        right: position === 'left' ? '-16px' : undefined,
        flexDirection: (position === 'top' || position === 'bottom') ? 'row' : 'column'
    } as React.CSSProperties

    return (
        <div style={styles}>
            <Button
                onClick={() => setOpen(true)}
                type="text"
                icon={<PlusCircleTwoTone style={{fontSize: '20px'}}/>}
            />
            <Modal
                title="Available Blocks"
                visible={open}
                onCancel={() => setOpen(false)}
                footer={null}
                width='100%'
            >
                <Row justify="center" style={{backgroundColor: '#00000011', borderRadius: '5px', padding: '20px 10px'}}>
                    {allTags.map(tag => (
                        <CheckableTag
                            key={tag}
                            checked={selectedTags.indexOf(tag) !== -1}
                            onChange={() => toggleTag(tag)}
                            style={{fontSize: '16px'}}
                        >
                            #{tag}
                        </CheckableTag>
                    ))}
                </Row>
                <Divider/>
                <Row justify="center" gutter={[16, 16]} style={{backgroundColor: '#00000022'}}>
                    {filteredBlocks.map((block: Block, index: number) => (
                        <Col
                            key={index}
                            xs={{span: 24}}
                            sm={{span: 12}}
                            md={{span: 12}}
                            lg={{span: 8}}
                            onClick={() => {
                                addBlock({
                                    _template: block.template.name,
                                    ...block.template.defaultItem,
                                })
                                setOpen(false)
                            }}
                        >
                            <Image width='100%' preview={false} src={block.template.screenshot} />
                        </Col>
                    ))}
                </Row>
            </Modal>
        </div>
    )
}