import React, { useState } from 'react';
import {Checkbox, Divider, Button, message, Popconfirm} from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import {DeleteOutlined, FolderOpenOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {deleteDuplicateFiles, fetchList, openFile} from "../store/reducers/ActionCreator";

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

    const successDelete = () => {
        messageApi.open({
            type: 'success',
            content: 'Files deleted successfully',
        });
    };

    const errorDelete = () => {
        messageApi.open({
            type: 'error',
            content: 'Error when deleting files',
        });
    };

    const warningDelete = () => {
        messageApi.open({
            type: 'warning',
            content: 'Please select files for deleting (also need to safe 1 file)',
        });
    };

    const successOpen = () => {
        messageApi.open({
            type: 'success',
            content: 'Files opened successfully',
        });
    };

    const errorOpen = (message: string) => {
        messageApi.open({
            type: 'error',
            content: 'Error when opening file',
        });
    };

    const warningOpen = () => {
        messageApi.open({
            type: 'warning',
            content: 'Please select only one file to open',
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
                   if (checkedList.length !== 0 && !checkAll) {
                       console.log(checkedList);
                       // @ts-ignore
                       dispatch(deleteDuplicateFiles({fileUrls: checkedList, successFunc: successDelete, errorFunc: errorDelete}));
                       // @ts-ignore
                       dispatch(fetchList(searchValue))
                   } else {
                       warningDelete()
                   }
                }}
                okText="Yes"
                cancelText="No"
            >
                <Button icon={<DeleteOutlined />}>Delete duplicate files</Button>
            </Popconfirm>
            <Button style={{marginLeft: 5}} icon={<FolderOpenOutlined />} onClick={() => {
                console.log(checkedList);
                if (checkedList.length === 1) {
                    // @ts-ignore
                    dispatch(openFile({path: checkedList[0], successFunc: successOpen, errorFunc: errorOpen}));
                    // @ts-ignore
                    dispatch(fetchList(searchValue))
                } else {
                    warningOpen()
                }
            }}>Open file</Button>
            <Divider />
            <CheckboxGroup style={{display: "flex", flexDirection: "column"}} options={props.listFiles} value={checkedList} onChange={onChange} />
        </div>
    );
};

export default CollapseItem;