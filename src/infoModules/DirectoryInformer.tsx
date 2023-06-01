import React from "react";
import {Card, Statistic} from "antd";
import {ArrowUpOutlined} from "@ant-design/icons";
import styles from "./directoryInformer.module.css"

const DirectoryInformer = () => {
    return(
        <div className={styles.container}>
            <div className={styles.item}><Statistic title="Total files" value={112893}/></div>
            <div className={styles.item}><Statistic title="Total dublicates" value={112893}/></div>
            <div className={styles.item}>
                <Card bordered={false}>
                    <Statistic
                        title="Dublicate %"
                        value={11.28}
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