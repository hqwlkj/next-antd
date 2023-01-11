import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Input, List, Modal, Row, Space } from 'antd';
import classNames from 'classnames';
import styles from './index.module.less';

const SellOnPietraDialog = ({
  isModalOpen,
  isMobile,
  className,
  onCancel,
}: {
  isModalOpen?: boolean;
  isMobile?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  className?: string;
}) => {
  const stepData: Array<{ title: string; description: string }> = [
    {
      title: 'Join Pietra.',
      description: 'You must be a member to list your products.',
    },
    {
      title: "Send your items to Pietra's Fulfillment Center.",
      description:
        "We'll photograph, store, and ship products to customers. You must be a member to list your products.",
    },
    {
      title: 'Start selling on Pietra Creator Marketplace.',
      description:
        "You can manage your listings, pricing, and you'll be paid out for sales weekly.",
    },
  ];

  const [form] = Form.useForm();
  const handleOk = () => {};
  const handleCancel = () => {};
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Modal
      centered
      closable={false}
      onCancel={() => onCancel?.()}
      title="List Your Products on Pietra's Creator Marketplace"
      width={isMobile ? '100%' : 700}
      className={classNames(styles.sellOnPietraDialogWarp, className, {
        [styles.mobileWarp]: isMobile,
      })}
      open={isModalOpen}
      footer={null}
    >
      <p className={styles.text}>
        We help Creators of all sizes sell more products. Every Creator owns their customer data
        from each sale and takes home more money per sale than almost any other marketplace.
      </p>
      <div className={styles.roundedBorder}>Here&apos;s what you do to get selling quickly</div>
      <div className={styles.signupStepsWarp}>
        <List
          itemLayout="horizontal"
          dataSource={stepData}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<CheckCircleOutlined />}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
      <Divider style={{ backgroundColor: '#000000' }} />
      <Form
        name="basic"
        className={styles.formContent}
        form={form}
        layout={'vertical'}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark={false}
        size={'middle'}
      >
        <Form.Item
          label="Brand Name"
          name="brandName"
          rules={[{ required: true, message: 'Please provide your brand name.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Brand Website"
          name="brandWebsite"
          rules={[{ required: true, message: 'Please provide a valid website URL.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Brand Instagram"
          name="brandInstagram"
          rules={[{ required: true, message: 'Please provide your brand instagram.' }]}
        >
          <Input />
        </Form.Item>
        <Row gutter={[24, 0]}>
          <Col md={12} sm={24} xs={24}>
            <Form.Item
              label="Contact Email"
              name="contactEmail"
              rules={[{ required: true, message: 'Please provide a valid email address.' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} sm={24} xs={24}>
            <Form.Item
              label="Contact Phone (Optional)"
              name="contactPhone"
              rules={[{ required: false }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item className={styles.formSubmitBtnWarp}>
          <Button type="primary" htmlType="submit" className={styles.submitBtn}>
            Apply Now
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SellOnPietraDialog;
