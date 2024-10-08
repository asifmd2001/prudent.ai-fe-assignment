import { Button, Drawer, Form, FormInstance, Input, InputNumber } from 'antd';
import styled from 'styled-components';
type DrawerType = "view" | "create" | "update"

type EmployeeDrawerProps = {
    open: boolean
    onClose: () => void
    form: FormInstance<any>
    type: DrawerType
    onSubmit: () => void
}

const FormContainer = styled.div`
overflow-y: auto;
`


const ButtonContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-end;
gap: 10px;
`

function EmployeeDrawer({ open, onClose, form, type, onSubmit }: EmployeeDrawerProps) {
    const title = (type: DrawerType) => {
        if (type === "create") {
            return "Add"
        } else if (type === "update")
            return "Update"
        else {
            return "View"
        }
    }
    const actionButtons = (type: DrawerType) => {
        if (type === "create") {
            return [{
                label: "create",
                onClick: () => {
                    form.submit()
                }
            }]
        } else if (type === "update")
            return [{
                label: "Save",
                onClick: () => {
                    form.submit()
                }
            }]
        else {
            return []
        }
    }

    return (
        <Drawer
            title={`${title(type)} Employee`}
            onClose={onClose}
            width={500}
            open={open}
            placement='right'
            closeIcon
        >
            <FormContainer>
                <Form onFinish={onSubmit} className={`${type} dataForm`} form={form} disabled={type === "view"}>
                    <Form.Item hidden name="orgId" >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item hidden name="id" >
                        <InputNumber />
                    </Form.Item>
                    {
                        type === "create" && <Form.Item  name="superiorName" label="Superior Name">
                            <Input readOnly />
                        </Form.Item>
                    }
                    <Form.Item name="name" label="Employee Name">
                        <Input />
                    </Form.Item>
                    <Form.Item name="position" label="Employee Position">
                        <Input />
                    </Form.Item>
                </Form>
                <ButtonContainer>
                    {
                        actionButtons(type).map((data, index) => {
                            return <Button key={index} type='primary' onClick={data.onClick}>{data.label}</Button>
                        })
                    }
                </ButtonContainer>
            </FormContainer>
        </Drawer>
    )
}

export default EmployeeDrawer