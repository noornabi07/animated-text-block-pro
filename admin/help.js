import { createRoot } from 'react-dom/client';
import './help.scss';
import AppContainer from './Index';


document.addEventListener('DOMContentLoaded', () => {
  const helpEl = document.getElementById('bplAdminHelpPage');
  const renderEl = helpEl.querySelector('.renderHere');

  createRoot(renderEl).render(<AppContainer mainEl={helpEl} />);
});