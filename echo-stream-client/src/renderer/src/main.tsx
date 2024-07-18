import './assets/main.css'
import 'virtual:uno.css'
import '@unocss/reset/normalize.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ConfigProvider, theme } from 'antd'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#00F268',
          borderRadius: 12
        }
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
)
