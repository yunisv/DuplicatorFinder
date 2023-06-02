import React from "react";
import {Card, Statistic} from "antd";
import {ArrowUpOutlined} from "@ant-design/icons";
import styles from "./directoryInformer.module.css"
import {useSelector} from "react-redux";

const DirectoryInformer = () => {
    const {dataDuplicate} = useSelector((state: any)=> state.listDuplicate)

    return(
        <div className={styles.container}>
            <div className={styles.item}><Statistic title="Total files" value={dataDuplicate.total_files}/></div>
            <div className={styles.item}><Statistic title="Total dublicates" value={dataDuplicate.duplicate_count}/></div>
            <div className={styles.item}>
                <Card bordered={false}>
                    <Statistic
                        title="Dublicate %"
                        value={dataDuplicate.duplicate_percentage}
                        precision={2}
                        valueStyle={{ color: 'rgba(255, 80, 0)' }}
                        prefix={<ArrowUpOutlined />}
                        suffix="%"
                    />
                </Card>
            </div>
        </div>
    )
}

export default DirectoryInformer