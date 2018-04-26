import React from 'react';
import ReactDOM from 'react-dom';

import URLQRCode from './components/URLQRCode';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <URLQRCode
    onURLChange={ (e) => { console.log('qrcode changed:', e) } }
  />,
  document.getElementById('root'));
registerServiceWorker();
