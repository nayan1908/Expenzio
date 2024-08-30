import { Button, Popup } from "antd-mobile";
import { useState } from "react";
import { FilterOutline } from 'antd-mobile-icons'

const CustomPopup = (props) => {
    const { children, buttonTitle = null, position = "bottom" } = props;
    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            <Button
                onClick={() => {
                    setIsVisible(true)
                }}
                fill='none'
            >
                <FilterOutline fontSize={24} /> {buttonTitle}
            </Button>
            <Popup
            onClose={()=>{  
                setIsVisible(false)
              }}
                showCloseButton
                visible={isVisible}
                // onMaskClick={() => {
                //     setIsVisible(false)
                // }}
                position={position}
                // bodyStyle={{ width: '60vw' }}
            >
                {children}
            </Popup>
        </>
    );
}

export default CustomPopup;