import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, NavBar, Popup } from "antd-mobile";
import CustomAvatar from "../CustomAvatar/CustomAvatar";
import { MENU_ARR } from "./custome-header-menu";

const user = {
    name: " Novalee Spicer",
    email: "novalee.spicer@gmail.com"
};

const CustomHeader = ({ title, children, className = "" }) => {
    const navigate = useNavigate();

    const [visible, setVisible] = useState(false)

    const onBack = () => setVisible(true);


    return (
        <div className={className}>
            <NavBar onBack={onBack} style={{padding: "0px"}}> {title} </NavBar>
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
                    <List.Item
                        description={user.email}
                        prefix={<CustomAvatar name={user.name} />}
                    >
                        {user.name}
                    </List.Item>

                    {MENU_ARR.map(menu =>
                        <List.Item
                            key={menu.name}
                            clickable
                            arrow={false}
                            prefix={menu.icon}
                            onClick={() => navigate(menu.url)}
                        >
                            {menu.name}
                        </List.Item>
                    )}
                </List>
            </Popup>
            {children}
        </div>
    )
}

export default CustomHeader;