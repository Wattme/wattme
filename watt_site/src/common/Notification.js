// https://fkhadra.github.io/react-toastify/positioning-toast

import { toast } from 'react-toastify';

const Notification = (
    {
        title = 'Системное уведомление',
        message = '',
        type = 'info'
    }
) => {

    switch (type) {
        case "info": {
            toast.info(message);
            break;
        }
        case "success": {
            toast.success(message);
            break;
        }
        case "warning": {
            toast.warn(message);
            break;
        }
        case "error": {
            toast.error(message);
            break;
        }
    }

}

const notificationTypes = {
    info: "info",
    success: "success",
    warning: "warning",
    error: "error",
};

export {
    Notification,
    notificationTypes
}
