import React from 'react';
import { Puck } from '@measured/puck';
import '@measured/puck/dist/index.css';

// Import trực tiếp file cấu hình đầu não của anh mentor gửi (nhảy 2 tầng dấu chấm ra src)
import { puckConfig } from '../admin-puck-config.jsx';

const initialData = {
  content: [],
  root: {},
};

export default function PuckEditorTest() {
  return (
    <div style={{ height: '100vh', width: '100vw', reference: 'client' }}>
      <Puck 
        config={puckConfig} 
        data={initialData} 
        onChange={(data) => console.log("Dữ liệu thay đổi:", data)} 
      />
    </div>
  );
}