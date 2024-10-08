import { DataNode } from "antd/es/tree"
import { Dropdown, MenuProps, Tooltip } from "antd";
import { ItemType } from "antd/es/menu/interface";
import styled from "styled-components";
import { BsThreeDots } from "react-icons/bs";
import { Employee, Organization } from "../state/orgSlice/types";
import { CgOrganisation } from "react-icons/cg";
import { PiPerson } from "react-icons/pi";
import { BiUser } from "react-icons/bi";

export const NodeLabelDiv = styled.div`
display: flex;
font-size: 1em;
height: 35px;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-left:5px;
flex: 1;
&:hover{
    .nodeButtonGroup{
        visibility: visible;
    }
}
`

export const NodeLabelButton = styled.button`
background-color: transparent;
border: none;
font-size: 0.7em;
`

export const NodeButtonGroup = styled.div`
display: flex;
visibility: hidden;
`



export const NodeToolTip = styled(Tooltip)`
width: fit-content;
`

export const TitleIconButton = styled.button`
background: transparent;
border: 0px;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
color: inherit;
& svg{
    width: 15px;
    height: 15px;
}
`



const STRING_LENGTH = 30

export const labelView = (label: string) => {
    let newLabel = label.length < STRING_LENGTH ? label : label.slice(0, STRING_LENGTH) + "..."
    return (<NodeToolTip placement="topLeft" title={label} color={"#000"} style={{ width: "fit-content" }
    }>
        {newLabel}
    </NodeToolTip>
    )
}

const TreeTitleLabel = ({ label }: { label: string }) => {
    return (
        <NodeLabelDiv>
            <i>{labelView(label)} </i>
        </NodeLabelDiv>)
}


const TitleLabel = ({ label, menuItems }: { label: string, menuItems: ItemType[] }) => {
    return (
        <NodeLabelDiv>
            <i>{labelView(label)} </i>
            < NodeButtonGroup className='nodeButtonGroup' >
                <Dropdown
                    trigger={["click"]}
                    menu={{
                        items: menuItems
                    }
                    }
                    arrow
                >
                    <Tooltip title="More" >
                        <TitleIconButton>
                            {<BsThreeDots />}
                        </TitleIconButton>
                    </Tooltip>
                </Dropdown>
            </NodeButtonGroup>
        </NodeLabelDiv>)
}

type MenuItemType = (orgId: number, employeeId: number) => MenuProps["items"]

const formatEmployeeData = (employees: Employee[], menuItems: MenuItemType, orgId: number): any => {

    return (employees ?? [])?.map(employee => ({
        title: <TitleLabel label={`${employee.name}  (${employee.position})`} menuItems={menuItems(orgId, employee.id)!} />,
        key: employee.id.toString(),
        children: formatEmployeeData(employee.subordinates ?? [], menuItems, orgId),
        icon: <BiUser />
    }));
};


export const OrgTreeModifiedData = (data: Organization, menuProps: MenuItemType) => {
    let newData: DataNode = {
        key: data.name,
        title: <TreeTitleLabel label={`${data.name}`} />,
        icon: <CgOrganisation />,
        children: [{
            key: "Employees",
            title: <TreeTitleLabel label={"Employee"} />,
            icon: <PiPerson />,
            children: formatEmployeeData(data.employees, menuProps, data.id)
        }]
    }
    return newData
}




