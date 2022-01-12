import {showMessage} from "react-native-flash-message";

class Notification {
    static send({title, message, type, isHideNavigation, duration}) {

        const body = {
            message: title,
            description: message,
            type: type,
            duration: duration || 5000,
            isHideNavigation
        };

        showMessage(body);
    }
}

const colors = {
    danger: "#F5386A",
    info: "#2D4EC2",
    success: "#10B879",
    warning: "#B67D28"
};
const icons = {
    danger: "alert-triangle",
    info: "#3BA8C2",
    success: "#10B879",
    warning: "#B67D28"
};

export default Notification
export {
    colors,
    icons
}
