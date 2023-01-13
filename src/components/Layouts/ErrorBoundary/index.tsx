import React, { ReactNode } from 'react';
import { Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import styles from './styles.module.less';

interface IProps {
  children: ReactNode;
}

interface IState {
  hasError: boolean;
  errorInfo: any;
}

// const CATCH_HAS_REFRESH_URL_PARAM = '____ErrorBoundary';

export class ErrorBoundary extends React.Component<IProps, IState> {
  router = useRouter();
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  constructor(props: IProps) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: {},
    };
  }

  componentDidCatch(err: Error) {
    this.setState({ errorInfo: err.message });
  }

  onRefresh = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles['error-boundary-comp-wrapper']}>
          <div className={styles['error-boundary-container']}>
            <div className={styles['title']}>
              <strong>Page Load Error</strong>
            </div>

            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={this.onRefresh}
              className={styles['refresh-button']}
            >
              Reload
            </Button>

            <div className={styles['error-info']}>
              <pre>
                <code>{JSON.stringify(this.state.errorInfo)}</code>
              </pre>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
