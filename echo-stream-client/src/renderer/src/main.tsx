import './assets/main.css'
import 'virtual:uno.css'
import '@unocss/reset/normalize.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ConfigProvider, theme } from 'antd'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#00F268',
          borderRadius: 12
        },
        components: {
          Table: {
            cellFontSizeSM: 12,
            cellPaddingInlineSM: 8,
            cellPaddingBlockSM: 8,
            borderColor: 'none',
            headerColor: '#a3a3a3'
          }
        }
      }}
    >
      <Router>
        <App />
      </Router>
    </ConfigProvider>
  </React.StrictMode>
)
