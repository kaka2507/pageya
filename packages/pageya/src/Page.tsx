import React from "react";
import {Form as FinalForm} from "react-final-form";
import {Form} from "@form-composer/core";
import {Button, Tooltip} from "antd";
import {RollbackOutlined, SaveOutlined} from '@ant-design/icons'
import {PageContext} from "./use-page";

const FF: any = FinalForm

export interface PageProps {
    form: Form
    children: React.ReactElement | React.ReactElement[]
    onBack?: Function
}

export function Page({form, children, onBack}: PageProps) {
    const [focusedBlock, setFocusedBlock] = React.useState<string>('')
    const pageState = React.useMemo(() => {
        return {
            form,
            focusedBlock,
            setFocusedBlock
        }
    }, [form, focusedBlock])

    return (
        <PageContext.Provider value={pageState}>
            <div onClick={() => setFocusedBlock('')}>
                <FF form={form.finalForm}>
                    {() => children}
                </FF>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', position: 'fixed', right: '-20px', bottom: '20px'}}>
                <Tooltip title="Save Page">
                    <Button type="dashed"
                            shape="round"
                            icon={<SaveOutlined/>}
                            style={{margin: '4px', display: 'flex', alignItems: 'center'}}
                            onClick={() => form.submit()}>
                        Save
                    </Button>
                </Tooltip>
                {onBack && (
                    <Tooltip title="Back to previous page">
                        <Button type="dashed"
                                shape="round"
                                icon={<RollbackOutlined/>}
                                style={{margin: '4px', display: 'flex', alignItems: 'center'}}
                                onClick={() => onBack()}>
                            Back
                        </Button>
                    </Tooltip>
                )}
            </div>
        </PageContext.Provider>
    )
}