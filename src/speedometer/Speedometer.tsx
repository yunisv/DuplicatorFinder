import styles from "./speedometer_style.module.css";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeSpeedometerValue} from "../store/reducers/speedometerSlice";

const Speedometer = () => {
    const speedometerValue = useSelector((state: any) => state.speedometerValue)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(changeSpeedometerValue(30))
    })
    return(
        <>
            <div className={styles.el} id="el" data-value={"1400/1400"}>
                <span className={styles.span} style={{transform: `rotate(${speedometerValue}deg)`}} id="needle"></span>
            </div>
            <strong className={styles.speedometer_hover}>Duplicate files finder</strong>
        </>
    )
}

export default Speedometer