
import { useEffect, useState } from 'react';
import { Card } from 'antd-mobile';
import { apiRequest, formattedDate, formattedNumber } from "../../helper/general";
import CustomHeader from "../../component/CustomHeader/CustomHeader";
import SpinLoader from '../../component/Loader/SpinLoader';
import NoRecord from '../../component/NoRecord/NoRecord';
import './dashboard.css';

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    const getDashboardData = async () => {
        setIsLoading(true)

        const apiRes = await apiRequest("dashboard");
        setIsLoading(false);

        if (apiRes?.settings?.success === 1) {
            setData(apiRes.data);
        }
    }

    useEffect(() => {
        getDashboardData();
    }, []);

    let content = <SpinLoader />;
    if (!isLoading) {
        if (data.length === 0) {
            content = <NoRecord />
        } else {
            let totalAmt = data.reduce((acc, item) => acc + item.total, 0);
            content = <>
                <Card title="Total" extra={<b>{formattedNumber(totalAmt)}</b>}/>
                {data.map(item => (
                    <Card key={item.month_year} title={formattedDate(item.month_year, 'MMM-YYYY')}>
                        <span>Total</span>
                        <span>{formattedNumber(item.total)}</span>
                    </Card>
                ))}
            </>
        }
    }

    return (
        <>
            <CustomHeader title="Dashboard" className="dashboard">
              
                {content}
            </CustomHeader>
        </>
    )
}

export default Dashboard;