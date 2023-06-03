import React from 'react';
import {Button, Descriptions, message, Popconfirm} from 'antd';
import styles from "./bottomInformer.module.css"
import {useDispatch, useSelector} from "react-redux";
import {DeleteOutlined} from "@ant-design/icons";
import {deleteDuplicateFiles, fetchList} from "../store/reducers/ActionCreator";

const BottomInformer: React.FC = () => {
    const dispatch = useDispatch();

    const search_path = useSelector((state: any) => state.searchInput)
    const {dataDuplicate} = useSelector((state: any)=> state.listDuplicate)
    const [messageApi, contextHolder] = message.useMessage();

    const deleteAll = () => {
        let result: string[] = []
        // @ts-ignore
        Object.values(dataDuplicate.listDuplicateFiles).map((value: string[], index, array) => {
            value.map((value, index) => {
                if (index !== 0) {
                    result.push(value)
                }
            })
        })
        return result
    }

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


    return (
        (
            <div className={styles.container}>
                <Descriptions>
                    <Descriptions.Item label="Search path">{search_path}</Descriptions.Item>
                </Descriptions>
                <Descriptions>
                    <Descriptions.Item label="Spent time">2.79 seconds</Descriptions.Item>
                </Descriptions>
                <Popconfirm
                    title="Delete the files"
                    description="Are you sure to fast delete?"
                    onConfirm={() => {
                        // @ts-ignore
                        dispatch(deleteDuplicateFiles({fileUrls: deleteAll(), successFunc: successDelete, errorFunc: errorDelete}));
                        // @ts-ignore
                        dispatch(fetchList(search_path))
                    }}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button style={{marginBottom: 10}} icon={<DeleteOutlined />}>Fast clear</Button>
                </Popconfirm>
            </div>
        )
    )
}

export default BottomInformer;