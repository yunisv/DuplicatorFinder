import React from "react";
import {Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {changeSearchInputValue} from "../store/reducers/searchInputSlice";
import {fetchList} from "../store/reducers/ActionCreator";

const { Search } = Input;

const SearchInput = () => {
    const searchValue = useSelector((state: any) => state.searchInput)
    const dispatch = useDispatch();
    // "http://127.0.0.1:5000/getDuplicateFiles?dir=C:\\Users\\yunis\\Documents\\as"

    return(
        <div style={{display:"flex", justifyContent: "center", width: "99%", marginTop: "2px"}}>
            <Search value={searchValue} onChange={(e) => {dispatch(changeSearchInputValue(e.currentTarget.value))}} placeholder="directory path here..." onPressEnter={(e) => { // @ts-ignore
                dispatch(fetchList(searchValue))}} onSearch={() => {dispatch(fetchList(searchValue))}} style={{ width: "100%", backgroundColor: "#fafafa"}} />
        </div>
    )
}

export default SearchInput