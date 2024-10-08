import { Tree } from "antd";
import styled from "styled-components";

export const StyledTree = styled(Tree)`
.ant-tree {
    background-color: transparent !important;
}

span.ant-tree-node-content-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

span.ant-tree-node-content-wrapper {
    width: 100%;
}

span.ant-tree-title {
    width: 100%;
}

span.ant-tree-title {
    display: block !important;
}

span.ant-tree-checkbox-inner {
    border: 1px solid black !important;
    background-color: transparent !important;
}

span.ant-tree-checkbox-inner:hover {
     border: 1px solid #333333 !important;
}

:where(.css-dev-only-do-not-override-9ntgx0).ant-tree .ant-tree-checkbox .ant-tree-checkbox-inner:after {
  border-color: black;
}

.ant-tree .ant-tree-checkbox-indeterminate .ant-tree-checkbox-inner:after{
    background-color: black;
}

.ant-tree .ant-tree-checkbox-checked:not(.ant-tree-checkbox-disabled):hover .ant-tree-checkbox-inner{
    background-color: transparent !important;
}

.ant-tree-treenode {
    width: 100%;
}
.ant-tree-treenode:first-child {
   padding: 4px 0px;
}

.ant-tree-switcher{
    display: flex;
    align-items: center;
    justify-content: center;
}
.ant-tree-switcher::before{
    top: auto;
}
`

export const Title = styled.div`
    color: black;
    padding: 15px 0px;
    font-size: 1.2em;
    font-weight: 500;
`


export const Container = styled.div`
  width: 50vw;
  padding: 0px 15px 15px;
  background-color: white;
  border-radius: 4px;
`
