import { message } from 'antd';

export const ErrorToast = (msg) => {
  message.error(msg || 'Something went wrong!');  
};

export const SuccessToast = (msg) => {
  message.success(msg || 'Operation successful!');
};