import { Ellipsis, Grid } from "antd-mobile";
import { DownOutline, UpOutline } from 'antd-mobile-icons';
import "./expense.css";

const ExpenseContent = ({ data }) => {
    return (
        <Grid columns={12} gap={8}>
            <Grid.Item span={9}>
                {data.date}
            </Grid.Item>
            <Grid.Item span={3} className="expense-price">
                {data.price}
            </Grid.Item>
            <Grid.Item span={12}>
                {data.title}
            </Grid.Item>

            <Grid.Item span={12}>
                <Ellipsis
                    rows={3}
                    direction='end'
                    content={data.description}
                    expandText={
                        <>
                            Expand
                            <DownOutline />
                        </>
                    }
                    collapseText={
                        <>
                            close
                            <UpOutline />
                        </>
                    }
                />
                {/* <Tag color='#87d068' fill='outline'>
                        Primary
                    </Tag> */}
            </Grid.Item>
        </Grid>
    )
}

export default ExpenseContent;