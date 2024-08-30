import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, InfiniteScroll, Input, List, SearchBar } from "antd-mobile";
import CustomHeader from "../../component/CustomHeader/CustomHeader";
import ExpenseContent from "./ExpenseContent";
import { apiRequest } from "../../helper/general";
import NoRecord from "../../component/NoRecord/NoRecord";
import FloatingButton from "../../component/FloatingButton/FloatingButton";
import CustomPopup from "../../component/CustomPopup/CustomPopup";
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

    const searchOnChange = (value) => {
        console.log(value)
    }

    const getExpenseData = async (isRetry) => {
        try {
            data.length === 0 && setIsLoading(true);

            const apiParams = {
                method: "POST",
                apiParams: {
                    start_date: "",
                    end_date: "",
                    per_page: pagination.per_page,
                    page_index: (pagination.has_next_page) ? pagination.page_index + 1 : pagination.page_index
                }
            }

            const apiRes = await apiRequest("expense", apiParams);
            if (apiRes?.settings?.success === 1) {
                if (apiRes.data?.length > 0) {
                    setData(prev => [...prev, ...apiRes.data]);
                    setHasMore(apiRes.pagination.has_next_page);
                    setPagination(apiRes.pagination);
                } else {
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
                <div className="search-bar-container" align="center">
                    <SearchBar clearable placeholder="Search..." onChange={searchOnChange} />
                    <CustomPopup>
                        <Form
                            layout='horizontal'
                            footer={
                                <div className="button-container">
                                    <Button size="middle" block type="button" >
                                        Clear
                                    </Button>
                                    <Button size="middle" block type="submit" color="primary">
                                        Search
                                    </Button>
                                </div>
                            }
                        >
                            <Form.Header>Filter</Form.Header>

                            <Form.Item
                                name="date"
                                label="Date"
                                rules={[
                                    { required: true, message: 'Please select date' },
                                ]}
                            >
                                <Input type="date" placeholder="Date" />
                            </Form.Item>

                          
                        </Form>
                    </CustomPopup>
                </div>
            }
        >
            {!isLoading && data.length > 0 ?
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
                : <NoRecord />
            }

            <FloatingButton onClick={() => navigate('/expense/add')} />

        </CustomHeader>
    );
}

export default Expense;