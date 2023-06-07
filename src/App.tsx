import React from 'react';
import { useSelector} from "react-redux";
import {Layout, Spin} from "antd";
import Speedometer from "./speedometer/Speedometer";

import styles from "./app.module.css"
import "./app.css"
import SearchInput from "./infoModules/SearchInput";
import DirectoryInformer from "./infoModules/DirectoryInformer";
import TreeFolder from "./infoModules/TreeFolder";
import BottomInformer from "./infoModules/BottomInformer";
import CollapseElement from "./collapse/CollapseElement";
import Links from "./Links/Links";

function App() {
  const {isLoading} = useSelector((state: any)=> state.listDuplicate)

  return (
    <div className="App">
      <Links />
      <Layout style={{backgroundColor: "#fff"}} className="layout">
        <TreeFolder />
        <div className={styles.content}>
          {isLoading && <Spin style={{marginTop: 30}} tip="Loading" size="large">
            <div className="content" />
          </Spin>}
          <Speedometer />
          <div className={styles.informersDiv}>
            <SearchInput />
            <DirectoryInformer />
            <BottomInformer />
          </div>
          <div className={styles.collapseDiv} >
            <CollapseElement />
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default App;
