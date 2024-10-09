import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, NavBar, Popup } from "antd-mobile";
import CustomAvatar from "../CustomAvatar/CustomAvatar";
import { MENU_ARR } from "./custome-header-menu";
import { deleteSession, getSession } from "../../helper/auth";
import Logo from "../Loader/Logo/Logo";

const CustomHeader = ({ title, children, className = "", extraContent = null }) => {
    const navigate = useNavigate();
    const session = getSession();

    const [visible, setVisible] = useState(false)

    const onBack = () => setVisible(true);

    const menuOnClick = (menu) => {
        if (menu.key === "logout") {
            deleteSession();    // delete session and redirect to login
            navigate(menu.url);
        } else {
            navigate(menu.url);
        }
    }

    return (
        <div className={className}>
            <NavBar onBack={onBack} style={{ padding: "0px" }}> {title} </NavBar>
            <Popup
                visible={visible}
                onMaskClick={() => {
                    setVisible(false)
                }}
                position='left'
                className="menu-drawer"
                bodyStyle={{ width: '70vw' }}
            >
                <List className="menu-list">
                    <List.Item onClick={() => navigate("/dashboard")} arrow={false}>
                        <Logo />
                    </List.Item>
                    <List.Item
                        description={session.email}
                        prefix={<CustomAvatar name={session.name} />}
                    >
                        {session.name}
                    </List.Item>

                    {MENU_ARR.map(menu =>
                        <List.Item
                            key={menu.name}
                            clickable
                            arrow={false}
                            prefix={menu.icon}
                            onClick={() => menuOnClick(menu)}
                        >
                            {menu.name}
                        </List.Item>
                    )}
                </List>
            </Popup>
            {extraContent}
            <div className="main-content">
                {children}
            </div>
        </div>
    )
}

export default CustomHeader;