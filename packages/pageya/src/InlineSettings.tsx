import React from 'react'
import {Field} from "@form-composer/core";
import {FormBuilder} from "./FormBuilder";
import {BlockContext} from "./block";
import {usePage} from "./use-page";
import {Button, Drawer, Grid, Row, Typography} from 'antd';
import {CloseSquareOutlined, SettingOutlined} from '@ant-design/icons'

const {useBreakpoint} = Grid
const {Title} = Typography

interface InlineSettingsProps {
    fields: Field[]
}

export function InlineSettings({fields}: InlineSettingsProps) {
    const [open, setOpen] = React.useState(false)
    const noExtraFields = !(fields && fields.length)

    const toggleOpen = (event: any) => {
        event.stopPropagation()
        event.preventDefault()
        setOpen(!open)
    }

    if (noExtraFields) {
        return null
    }

    return (
        <>
            <Button
                type="text"
                style={{display: 'flex', alignItems: 'center'}}
                onClick={toggleOpen}
                icon={<SettingOutlined/>}/>
            <SettingsModal fields={fields} open={open} onClose={() => setOpen(false)}/>
        </>
    )
}

interface SettingsModalProps {
    fields: Field[]
    open: boolean,

    onClose(): void
}

function SettingsModal({fields, open, onClose}: SettingsModalProps) {
    const {form} = usePage()
    const {name} = React.useContext(BlockContext)

    let formFields = fields

    if (name) {
        formFields = fields.map((field: any) => ({
            ...field,
            name: `${name}.${field.name}`,
        }))
    }
    const screens = useBreakpoint();
    const drawerWidth = screens.xs ? '100%' : '500px'
    return (
        <Drawer
            title={
                <Row align="top">
                    <Title level={5}>Edit component</Title>
                    <div style={{flexGrow: 1, display: 'flex', justifyContent: 'flex-end'}}>
                        <Button
                            type="text"
                            onClick={onClose}
                            icon={<CloseSquareOutlined style={{fontSize: '20px'}}/>}
                        />
                    </div>
                </Row>
            }
            width={drawerWidth}
            closable={false}
            visible={open}
            onClose={onClose}
            footer={null}
        >
            <FormBuilder form={form} fields={formFields}/>
        </Drawer>
    )
}