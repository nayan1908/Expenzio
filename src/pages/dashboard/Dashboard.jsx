import { NavBar, TabBar } from 'antd-mobile'
import {
    Route,
    Switch,
    useHistory,
    useLocation,
    MemoryRouter as Router,
} from 'react-router-dom'
import {
    AppOutline,
    MessageOutline,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons'

import  './dashboard.css';

const location = useLocation()
const { pathname } = location

const setRouteActive = (value) => {
    
}

const tabs = [
    {
        key: '/home',
        title: '首页',
        icon: <AppOutline />,
    },
    {
        key: '/todo',
        title: '待办',
        icon: <UnorderedListOutline />,
    },
]

const Dashboard = () => {
    return (
        <h1>Dashboard</h1>
    )
}

export default Dashboard;