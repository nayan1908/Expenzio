import { Popup } from "antd-mobile";

const CustomPopup = (props) => {
    const { children, buttonTitle = null, popupIsOpen, popupOnClose, position = "bottom", ...rest } = props;

    return (
        <Popup
            {...rest}
            showCloseButton
            position={position}
            visible={popupIsOpen}
            onClose={popupOnClose}
        >
            {children}
        </Popup>
    );
}

export default CustomPopup;