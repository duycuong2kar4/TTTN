import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css' // <-- BIẾN QUAN TRỌNG: Bắt buộc phải có dòng import này thì web mới có màu nhe bồ!

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)