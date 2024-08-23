import React,{createContext,useContext} from 'react'
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';

const NotificationContext = createContext();
export const useNotification =()=> useContext(NotificationContext);

export const NotificationProvider = ({children}) => {
  const notify = (message, type = "default") => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "info":
        toast.info(message);
        break;
      case "warning":
        toast.warning(message);
        break;
      default:
        toast(message);
    }
  };
  return (
    <NotificationContext.Provider value={notify}>
        {children}
        <ToastContainer position="bottom-left"/>
    </NotificationContext.Provider>
  )
}




