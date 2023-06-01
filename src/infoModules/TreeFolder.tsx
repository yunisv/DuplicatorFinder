import React from 'react';
import {Tree, Layout} from 'antd';
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';
import {useDispatch} from "react-redux";
import {changeSearchInputValue} from "../store/reducers/searchInputSlice";

const { DirectoryTree } = Tree;
const { Sider } = Layout;


const treeData: DataNode[] = [
    {
        title: 'parent 0',
        key: '0-0',
        children: [
            { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
            { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
        ],
    },
    {
        title: 'parent 1',
        key: '0-1',
        children: [
            { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
            { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
        ],
    },
];
const TreeFolder: React.FC = () => {
    const dispatch = useDispatch();

    const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
        console.log('Trigger Select', keys, info);
        dispatch(changeSearchInputValue(keys))
    };

    const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
        console.log('Trigger Expand', keys, info);
    };

    return (
        <Sider width={200} style={{ background: "transparent" }}>
            <DirectoryTree
                multiple
                defaultExpandAll
                onSelect={onSelect}
                onExpand={onExpand}
                treeData={treeData}
            />
        </Sider>
    );
};

export default TreeFolder;