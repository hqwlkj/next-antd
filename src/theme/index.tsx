import React from 'react';
import { ConfigProvider } from 'antd';

const withTheme = (node: React.ReactNode) => (
  <ConfigProvider
    prefixCls="next-antd"
    iconPrefixCls="next-antd-icon"
    theme={{
      token: {
        colorPrimary: '#D2906A',
        borderRadius: 0,
        fontFamily: 'Labil-Regular',
        fontSize: 14,
        colorLink: '#141414',
      },
      components: {},
    }}
  >
    <ConfigProvider>{node}</ConfigProvider>
  </ConfigProvider>
);

export default withTheme;
