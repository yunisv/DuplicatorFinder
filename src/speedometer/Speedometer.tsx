import styles from "./speedometer_style.module.css";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeSpeedometerValue} from "../store/reducers/speedometerSlice";

const Speedometer = () => {
    const {dataDuplicate} = useSelector((state: any)=> state.listDuplicate)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(changeSpeedometerValue(30))
    })
    return(
        <div style={{marginTop: 20}}>
            <div className={styles.el} id="el" data-value={`${dataDuplicate.duplicate_count}/${dataDuplicate.total_files}`}>
                <span className={styles.span} style={{transform: `rotate(${dataDuplicate.duplicate_percentage * 1.8}deg)`}} id="needle"></span>
            </div>
            <strong className={styles.speedometer_hover}>Duplicate files finder</strong>
        </div>
    )
}

export default Speedometer