import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './App';
import './branding/tailwind.css';
import './branding/theme.css';
import './branding/responsive.css';

// vite-react-ssg arma el router (createBrowserRouter en cliente, estático en build)
// e hidrata. `npm run dev` sigue usando Vite; el build usa `vite-react-ssg build`.
export const createRoot = ViteReactSSG({ routes });
