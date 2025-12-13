import { message } from 'antd';
import { baseApiUrl } from '../redux/feature/baseApi';

export const ErrorToast = (msg) => {
  message.error(msg || 'Something went wrong!');  
};

export const SuccessToast = (msg) => {
  message.success(msg || 'Operation successful!');
};

// Get Image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  return imagePath.startsWith('/') ? `${baseApiUrl}${imagePath}` : `${baseApiUrl}/${imagePath}`;
};