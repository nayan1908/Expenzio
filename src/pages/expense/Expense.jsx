import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InfiniteScroll, List } from "antd-mobile";
import CustomHeader from "../../component/CustomHeader/CustomHeader";
import ExpenseContent from "./ExpenseContent";
import { apiRequest, systemDate } from "../../helper/general";
import NoRecord from "../../component/NoRecord/NoRecord";
import FloatingButton from "../../component/FloatingButton/FloatingButton";
import ExpenseFilter from "./ExpenseFilter";
import SpinLoader from "../../component/Loader/SpinLoader";
import "./expense.css";

const Expense = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [pagination, setPagination] = useState({
        page_index: 1,
        per_page: 10,
        total_count: 0,
        total_pages: 0,
        has_next_page: false,
        has_prev_page: false
    });

    const getExpenseData = async (filterData = {}) => {
        try {
            let pageIndex = 1;
            if (pagination.has_next_page && filterData?.is_new_request === false) {
                pageIndex = pagination.page_index + 1;
            }
            if (data.length === 0 && filterData?.is_new_request === false) {

            } else {
                setIsLoading(true);
            }

            const apiParams = {
                method: "POST",
                apiParams: {
                    title: filterData?.title ? filterData.title : '',
                    description: filterData?.description ? filterData.description: '',
                    start_date: filterData?.date ? systemDate(filterData.date) : '',
                    end_date: filterData?.date ? systemDate(filterData.date) : '',
                    per_page: pagination.per_page,
                    page_index: (pagination.has_next_page) ? pagination.page_index + 1 : pagination.page_index
                    // page_index: pageIndex
                }
            }

            const apiRes = await apiRequest("expense", apiParams);
            if (apiRes?.settings?.success === 1) {
                if (apiRes.data?.length > 0) {
                    // setData(prev => [...prev, ...apiRes.data]);
                    setData(prev => apiRes.data);
                    setHasMore(apiRes.pagination.has_next_page);
                    setPagination(apiRes.pagination);
                } else {
                    setData([]);
                    setHasMore(false);
                }
            }
        } catch ({ message }) {

        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getExpenseData();
    }, []);



    return (
        <CustomHeader
            title="Expense"
            className="expense"
            extraContent={
                <ExpenseFilter {...{ getExpenseData, setPagination }} />
            }
        >
            {isLoading && <SpinLoader />}
            {!isLoading && data.length === 0 && <NoRecord />}
            {!isLoading && !isLoading && data.length > 0 &&
                <>
                    <List className="expense-list">
                        {data.map((item, index) => (
                            <List.Item>
                                <ExpenseContent key={index} data={item} />
                            </List.Item>
                        ))}
                    </List>
                    <InfiniteScroll loadMore={getExpenseData} hasMore={hasMore} />
                </>
            }

            <FloatingButton onClick={() => navigate('/expense/add')} />

        </CustomHeader>
    );
}

export default Expense;