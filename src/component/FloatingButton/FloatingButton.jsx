import { FloatingBubble } from "antd-mobile";
import { AddOutline } from 'antd-mobile-icons';

const FloatingButton = (props) => {
    const { onClick = null } = props;
    
    return (
        <FloatingBubble
            style={{
                '--initial-position-bottom': '24px',
                '--initial-position-right': '24px',
                '--edge-distance': '24px',
                '--size': '35px'
            }}>
            <AddOutline fontSize={30} onClick={onClick}/>
        </FloatingBubble>
    );
}

export default FloatingButton;