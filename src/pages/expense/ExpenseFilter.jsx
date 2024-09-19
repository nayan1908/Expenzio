import { useState } from "react";
import { Button, DatePicker, Form, Input, SearchBar } from "antd-mobile";
import CustomPopup from "../../component/CustomPopup/CustomPopup";
import { formattedDate } from "../../helper/general";
import { FilterOutline } from 'antd-mobile-icons';

const ExpenseFilter = (props) => {
    const { getExpenseData, setPagination } = props;

    const [form] = Form.useForm();
    const [filterIsOpen, setFilterIsOpen] = useState(false);
    const [datePopupIsVisible, setDatePopupIsVisible] = useState(false);
    const [date, setDate] = useState(null);

    const onClearClick = () => {
        form.resetFields();
        setDate(null);
        setPagination({
            page_index: 1,
            per_page: 10,
            total_count: 0,
            total_pages: 0,
            has_next_page: false,
            has_prev_page: false
        });
    }

    const searchOnChange = (value) => {
        console.log(value)
    }

    const handleDateChange = (value) => {
        setDate(value);
        setDatePopupIsVisible(false);
    };

    const formOnFinish = formData => {
        formData.is_new_request = true;
        formData.date = date;
        setFilterIsOpen(false);
        getExpenseData(formData);
    }

    return (
        <div className="search-bar-container" align="center">
            <SearchBar clearable placeholder="Search..." onChange={searchOnChange} />
            <Button
                fill='none'
                onClick={() => {
                    setFilterIsOpen(true)
                }}
            >
                <FilterOutline fontSize={24} />
            </Button>
            <CustomPopup
                popupIsOpen={filterIsOpen}
                popupOnClose={() => setFilterIsOpen(false)}
                // bodyStyle={{ height: '150vw' }}
                // closeIcon={<Form.Header>Filter</Form.Header>}

            >
                <Form
                    onFinish={formOnFinish}
                    form={form}
                    layout='horizontal'
                    footer={
                        <div className="button-container">
                            <Button size="middle" block type="button" onClick={onClearClick}>
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
                        name="title"
                        label="Title"
                    >
                        <Input placeholder="Title" clearable />
                    </Form.Item>

                    <Form.Item
                        name='description'
                        label='Description'
                        normalize={value => value.trimStart()}
                        rules={[
                            { max: 150 }
                        ]}
                    >
                        <Input placeholder="Description" clearable />
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label="Price"
                    >
                        <Input type="number" placeholder="Price" step="1" clearable />
                    </Form.Item>

                    <Form.Item
                        // arrow={false}
                        name="date"
                        label="Date"
                        onClick={() => {
                            setDatePopupIsVisible(true);
                        }}
                    >
                        <Input
                            type="text"
                            placeholder="Date"
                            value={date ? formattedDate(date) : 'Select date'}
                            onClick={() => setDatePopupIsVisible(true)}
                            readOnly
                            clearable
                        />
                        <DatePicker
                            visible={datePopupIsVisible}
                            onConfirm={handleDateChange}
                            onCancel={() => setDatePopupIsVisible(false)}
                            max={new Date()}
                        />
                    </Form.Item>
                </Form>
            </CustomPopup>
        </div>
    );
}

export default ExpenseFilter;