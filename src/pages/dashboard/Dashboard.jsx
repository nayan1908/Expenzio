
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

    return (
        <>
        <CustomHeader title="Dashboard" className="dashboard">
            {/* <p>Dashboard data will come here</p> */}
            {isLoading && <SpinLoader />}
            {!isLoading && data.length === 0 && <NoRecord />}
            {!isLoading && data?.length > 0 && data.map(item => (

                <Card title={formattedDate(item.month_year, 'MMM-YYYY')}>
                    <span>Total</span>
                    <span>{formattedNumber(item.total)}</span>
                </Card>
            ))
            }
        </CustomHeader>
        </>
    )
}

export default Dashboard;