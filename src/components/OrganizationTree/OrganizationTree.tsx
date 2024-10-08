import { Empty, MenuProps, message, Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllOrganization } from '../../state/orgSlice/orgSelector'
import { useEffect, useMemo, useState } from 'react'
import { setOrganization, setOrganizations } from '../../state/orgSlice/orgSlice'
import { OrgTreeModifiedData } from '../../helpers/treeHelper'
import { BiEdit, BiPlusCircle, BiTrash } from 'react-icons/bi'
import EmployeeDrawer from '../../components/EmployeeDrawer/EmployeeDrawer'
import { useForm } from 'antd/es/form/Form'
import { addSubordinate, deleteEmployee, findEmployeeById, generateUniqueEmpId, updateEmployeeById } from '../../helpers/employeeHelpers'
import { BsEye } from 'react-icons/bs'
import { fetchOrgsData, updateOrgData } from '../../api'
import { Container, StyledTree, Title } from './OrganizationTreeStyles'

function OrganizationTree() {

    const dispatch = useDispatch()
    const [messageApi, contextHolder] = message.useMessage()
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchOrgsData()
            dispatch(setOrganizations(data))
        }
        fetchData()
    }, [])

    const orgData = useSelector(selectAllOrganization)
    const Organizations = useMemo(() => {
        if (!orgData) return [];
        return orgData.map(org => ({
            ...org,
        }));
    }, [orgData]);

    const [openDrawer, setOpenDrawer] = useState(false)
    const [form] = useForm()
    const [drawerType, setDrawerType] = useState<"view" | "create" | "update">("create")

    const employeeMenuProps = (orgId: number, employeeId: number): MenuProps["items"] => [
        {
            key: "1",
            label: "Edit",
            icon: <BiEdit />,
            onClick: () => {
                form.resetFields()
                const data = findEmployeeById(Organizations, orgId, employeeId)
                form.setFieldsValue({
                    ...data,
                    orgId: orgId
                })
                setOpenDrawer(true)
                setDrawerType("update")
            }
        },
        {
            key: "2",
            label: "View",
            icon: <BsEye />,
            onClick: () => {
                form.resetFields()
                const data = findEmployeeById(Organizations, orgId, employeeId)
                form.setFieldsValue(data)
                setOpenDrawer(true)
                setDrawerType("view")
            }
        },
        {
            key: "3",
            label: "Add Subordinate",
            icon: <BiPlusCircle />,
            onClick: () => {
                setDrawerType("create")
                form.resetFields()
                const data = findEmployeeById(Organizations, orgId, employeeId)
                form.setFieldsValue({
                    id: employeeId,
                    orgId: orgId,
                    superiorName: `${data?.name} ${data?.position}`
                })
                setOpenDrawer(true)
            }
        },
        {
            key: "4",
            label: "Delete",
            icon: <BiTrash />,
            onClick: () => {
                const data = findEmployeeById(Organizations, orgId, employeeId)
                Modal.confirm({
                    centered: true,
                    title: `Would you like to delete the Employee - ${data?.name}`,
                    onOk: async () => {
                        const updatedOrg = deleteEmployee(Organizations, orgId, employeeId)
                        if (updatedOrg) {
                            const data = await updateOrgData(updatedOrg, orgId)
                            dispatch(setOrganization(data))
                            messageApi.success({
                                content: "Employee Deleted",
                                duration: 1
                            })
                        }
                    }
                })
            }
        },
    ]
    const data = Organizations.map((data) => {
        return OrgTreeModifiedData(data, employeeMenuProps)
    })

    const onSubmit = async () => {
        if (drawerType === "update") {
            const data = form.getFieldsValue()
            const { orgId, ...empData } = data
            const updatedOrg = updateEmployeeById(Organizations, orgId, empData.id, empData)
            if (updatedOrg) {
                const data = await updateOrgData(updatedOrg, orgId)
                dispatch(setOrganization(data))
                messageApi.success({
                    content: "Employee Updated",
                    duration: 1
                })
            }
            setOpenDrawer(false)
        }
        else if (drawerType === "create") {
            const data = form.getFieldsValue()
            const { orgId, id, superiorName, ...empData } = data
            const organization = Organizations.find(org => org.id === orgId);
            if (organization) {
                const empId = generateUniqueEmpId(organization)
                const updatedOrg = addSubordinate(Organizations, orgId, id, {
                    id: empId,
                    ...empData
                })
                if (updatedOrg) {
                    const data = await updateOrgData(updatedOrg, orgId)
                    dispatch(setOrganization(data))
                    messageApi.success({
                        content: "Employee Added",
                        duration: 1
                    })
                }
            }
            setOpenDrawer(false)
        }
    }

    return (
        <Container>
            <Title>
                Organization List
            </Title>
            {
                Organizations.length ? <>
                    {contextHolder}
                    <StyledTree
                        showIcon={true}
                        treeData={data}
                        autoExpandParent
                        defaultExpandAll
                    />
                    <EmployeeDrawer
                        form={form}
                        onClose={() => setOpenDrawer(false)}
                        onSubmit={onSubmit}
                        open={openDrawer}
                        type={drawerType}
                    />
                </> : <Empty />
            }
        </Container>
    )
}

export default OrganizationTree
