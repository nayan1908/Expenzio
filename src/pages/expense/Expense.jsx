import { Badge, Ellipsis, Grid, InfiniteScroll, List, SearchBar, Space, Tag } from "antd-mobile";
import { useState } from "react";
import { mockRequest } from "./expense-data";
import CustomHeader from "../../component/CustomHeader/CustomHeader";
import { DownOutline, UpOutline } from 'antd-mobile-icons'
import ExpenseContent from "./ExpenseContent";

const Expense = () => {
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const loadMore = async () => {
        const append = await mockRequest();
        setData(val => [...val, ...append]);
        setHasMore(append.length > 0);
    }

    const searchOnChange = (value) => {
        console.log(value)
    } 
    return (
        <CustomHeader title="Expense" className="expense">
            <SearchBar placeholder="Search..." onChange={searchOnChange} />  

            <List className="expense-list">
                {data.map((item, index) => (
                    <List.Item>
                        <ExpenseContent key={index} data={item} />
                    </List.Item>
                ))}
            </List>
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
        </CustomHeader>
    );
}

export default Expense;