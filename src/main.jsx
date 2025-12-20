import './index.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { router } from './router/Routes';
import { RouterProvider } from 'react-router-dom';
import { store } from './redux/store';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
