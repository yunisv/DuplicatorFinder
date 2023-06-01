import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { incrementNumber, decrementNumber } from "./store/reducers/counter";
import {Layout } from "antd";
import Speedometer from "./speedometer/Speedometer";

import styles from "./app.module.css"
import "./app.css"
import SearchInput from "./infoModules/SearchInput";
import DirectoryInformer from "./infoModules/DirectoryInformer";
import TreeFolder from "./infoModules/TreeFolder";
import BottomInformer from "./infoModules/BottomInformer";
import CollapseElement from "./collapse/CollapseElement";
import {fetchList} from "./store/reducers/ActionCreator";

function App() {
  // const counter = useSelector((state: any) => state.counter)
  const dispatch = useDispatch();
  const {isLoading, error, listDuplicate} = useSelector((state: any)=> state.listDuplicate)

  // useEffect(() => {
  //   // @ts-ignore
  //   dispatch(fetchList())
  // }, [ ])

  return (
    <div className="App">
      <Layout style={{backgroundColor: "#fff"}} className="layout">
        <TreeFolder />
        <div className={styles.content}>
          {isLoading && <h1>LOADING</h1>}
          {error && <h1>ERROR</h1>}
          {/*{listDuplicate.length !== 0 && JSON.stringify(listDuplicate)}*/}
          <Speedometer />
          <div className={styles.informersDiv}>
            <SearchInput />
            <DirectoryInformer />
            <BottomInformer />
          </div>
          <div className={styles.collapseDiv} >
            <CollapseElement />
          </div>
          {/*<p>*/}
          {/*  Counter: {counter}*/}
          {/*</p>*/}
          {/*<button onClick={() => {dispatch(incrementNumber(3))}}>Add + 1</button>*/}
          {/*<button onClick={() => {dispatch(decrementNumber())}}>Add - 1</button>*/}
        </div>
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
      </Layout>
    </div>
  );
}

export default App;
