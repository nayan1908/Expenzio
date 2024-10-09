import { DatePicker, Form, Input } from "antd-mobile";
import { useEffect, useState } from "react";
import { formattedDate } from "../../helper/general";

const CustomDatePicker = (props) => {
    const { name = "date", label = "Date" } = props;
    const [datePopupIsVisible, setDatePopupIsVisible] = useState(false);
    const [date, setDate] = useState(props?.date || null);

    const handleDateChange = (value) => {
        setDate(value);
        setDatePopupIsVisible(false);

        props?.onChange && props.onChange(value);
    };

    useEffect(() => {
        setDate(props.date);
    }, [props?.date]);

    return (
        <Form.Item
            // arrow={false}
            name={name}
            label={label}
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
    )
}

export default CustomDatePicker;