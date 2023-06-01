import React, {useState} from 'react';
import { Collapse } from 'antd';
import {ExpandIconPosition} from "antd/es/collapse/Collapse";
import styles from "./collapseElement.module.css"
import CollapseItem from "./CollapseItem";
import {useSelector} from "react-redux";

const { Panel } = Collapse;

const CollapseElement: React.FC = () => {
    const [expandIconPosition, setExpandIconPosition] = useState<ExpandIconPosition>('start');
    const onChange = (key: string | string[]) => {
        // console.log(key);
    };

    const {dataDuplicate} = useSelector((state: any)=> state.listDuplicate)

    const fileInfo = (name: string, hash: string) => (
        <div className={styles.collapseBox}>
            <span className={styles.fileName}>{name}</span>
            <span className={styles.hashName}>{hash}</span>
        </div>
    );

    const genExtra = () => (
        <div className={styles.duplicateNumberBox}>
            <span className={styles.duplicateNumber}>123</span>
        </div>
    );

    const panelItems: (JSX.Element | null)[] = Object.entries(dataDuplicate.listDuplicateFiles).map(([key, value]) => {
        if (Array.isArray(value)) {
            return (
                <Panel
                    header={fileInfo(value[0] as string, key)}
                    key={value[0]}
                    extra={genExtra()}
                >
                    <CollapseItem listFiles={value} />
                </Panel>
            );
        }
        // Обработка случая, когда value не является массивом
        return null;
    });

    return (
        // @ts-ignore
        <Collapse style={{marginBottom: 50}} defaultActiveKey={['1']} onChange={onChange} expandIconPosition={expandIconPosition}>
            {panelItems}
        </Collapse>
    );
};

export default CollapseElement;