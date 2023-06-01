import React from 'react';
import { Descriptions } from 'antd';
import styles from "./bottomInformer.module.css"
import {useSelector} from "react-redux";

const BottomInformer: React.FC = () => {
    const search_path = useSelector((state: any) => state.searchInput)
    return (
        (
            <div className={styles.container}>
                <Descriptions>
                    <Descriptions.Item label="Search path">{search_path}</Descriptions.Item>
                </Descriptions>
                <Descriptions>
                    <Descriptions.Item label="Spent time">2.79 seconds</Descriptions.Item>
                </Descriptions>
            </div>
        )
    )
}

export default BottomInformer;