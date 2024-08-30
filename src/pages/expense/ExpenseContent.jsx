import { Ellipsis, Grid } from "antd-mobile";
import { DownOutline, UpOutline } from 'antd-mobile-icons';
import { formattedNumber } from "../../helper/general";

const ExpenseContent = ({ data }) => {
    return (
        <Grid columns={12} gap={8}>
            <Grid.Item span={12} className="expense-title">
                {data.title}
            </Grid.Item>
            <Grid.Item span={6}>
                {data.date}
            </Grid.Item>
            <Grid.Item span={6} className="text-right">
                {formattedNumber(data.price)}
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