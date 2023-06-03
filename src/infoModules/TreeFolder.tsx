import React from 'react';
import {Tree, Layout, Button} from 'antd';
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';
import {useDispatch, useSelector} from "react-redux";
import {changeSearchInputValue} from "../store/reducers/searchInputSlice";
import {DeleteOutlined, FolderViewOutlined} from "@ant-design/icons";
import {fetchDirectoryTree, fetchList} from "../store/reducers/ActionCreator";

const { DirectoryTree } = Tree;
const { Sider } = Layout;


// const treeData: DataNode[] = [
//     {
//         title: 'parent 0',
//         key: '0-0',
//         children: [
//             { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
//             { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
//         ],
//     },
//     {
//         title: 'parent 1',
//         key: '0-1',
//         children: [
//             { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
//             { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
//         ],
//     },
// ];
const TreeFolder: React.FC = () => {
    const dispatch = useDispatch();

    const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
        console.log('Trigger Select', keys, info);
        dispatch(changeSearchInputValue(keys))
    };

    const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
        console.log('Trigger Expand', keys, info);
    };

    const {isLoading, error, directoryTree } = useSelector((state: any) => state.directoryTree)
    const searchValue = useSelector((state: any) => state.searchInput)

    return (
        <Sider width={200} style={{ background: "transparent" }}>
            <Button onClick={() => { // @ts-ignore
                dispatch(fetchDirectoryTree(searchValue))}} icon={<FolderViewOutlined />}>Show tree directory</Button>
            {isLoading && <span>Loading...</span>}
            {directoryTree.length !== 0 && <DirectoryTree
                multiple
                onSelect={onSelect}
                onExpand={onExpand}
                treeData={directoryTree}
            />}
        </Sider>
    );
};

export default TreeFolder;