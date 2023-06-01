import React, { useState } from 'react';
import {Checkbox, Divider, Button, message, Popconfirm} from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { DeleteOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {deleteDuplicateFiles, fetchList} from "../store/reducers/ActionCreator";

const CheckboxGroup = Checkbox.Group;

// const plainOptions: string[] = ['C:\\\\Users\\\\yunis\\\\Documents\\\\as\\\\1 — копия (2) — копия.txt', '\'C:\\\\Users\\\\yunis\\\\Documents\\\\as\\\\1 — копия (2).txt\'', 'Orange'];
const defaultCheckedList: string[] = [];

interface collapseItemElementType {
    listFiles: any[]
}
const CollapseItem: React.FC<collapseItemElementType> = (props) => {
    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const dispatch = useDispatch();
    const searchValue = useSelector((state: any) => state.searchInput)

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Files deleted successfully',
        });
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Error when deleting files',
        });
    };

    const onChange = (list: CheckboxValueType[]) => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < props.listFiles.length);
        setCheckAll(list.length === props.listFiles.length);
    };

    const onCheckAllChange = (e: CheckboxChangeEvent) => {
        setCheckedList(e.target.checked ? props.listFiles : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    return (
        <div>
            {contextHolder}
            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                Check all
            </Checkbox>
            <Popconfirm
                title="Delete the files"
                description="Are you sure to delete this files?"
                onConfirm={() => {
                    console.log(checkedList);
                    // @ts-ignore
                    dispatch(deleteDuplicateFiles({fileUrls: checkedList, successFunc: success, errorFunc: error}));
                    // @ts-ignore
                    dispatch(fetchList(searchValue))
                }}
                okText="Yes"
                cancelText="No"
            >
                <Button icon={<DeleteOutlined />}>Delete duplicate files</Button>
            </Popconfirm>
            <Divider />
            <CheckboxGroup style={{display: "flex", flexDirection: "column"}} options={props.listFiles} value={checkedList} onChange={onChange} />
        </div>
    );
};

export default CollapseItem;