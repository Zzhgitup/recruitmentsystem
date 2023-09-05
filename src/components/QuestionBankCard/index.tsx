import React, { memo, useState, useEffect, useCallback } from 'react';
import type { FC, ReactNode } from 'react';
import type { PaginationProps } from 'antd';
import { Table, Pagination, Button, Form, Input, message, Modal, Select } from 'antd';
import { SearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { getAllQuestion, getAllType, randomQuestion } from '@/service/modules/user';
interface IProps {
  children?: ReactNode;
}
interface SortType {
  id: number;
  typeName: string;
}
export interface questionsType {
  id: number;
  question: string;
  answer: string;
  questionBankType: number;
}
const showTotal: PaginationProps['showTotal'] = (total) => `共 ${total} 条`;
const QuestionBankCard: FC<IProps> = () => {
  const [openRandom, setOpenRandom] = useState(false);
  const [loading, setLoading] = useState(true);
  const columns: Array<any> = [
    {
      title: '问题',
      width: 200,
      dataIndex: 'question',
      key: 'question'
    },
    {
      title: '回答',
      width: 200,
      dataIndex: 'answer',
      key: 'answer'
    },
    {
      title: '类型',
      dataIndex: 'typeName',
      width: 80,
      key: 'typeName'
    }
  ];
  const [messageApi, contextHolder] = message.useMessage();
  const [listdata, setlistdata] = useState<questionsType[]>([]);
  const [pagination, setpagination] = useState({ pageNum: 1, pageSize: 5 });
  const [total, setTotal] = useState(20);
  const [searchForm, setsearchForm] = useState({
    questionBankType: 1,
    typeId: ''
  });

  const getUserCb = useCallback(
    () => getAllQuestion({ ...pagination, ...searchForm }),
    [pagination, searchForm]
  );
  useEffect(() => {
    getUserCb()
      .then((res) => {
        console.log(res);
        setLoading(false);
        setlistdata(res.data.records);
        setTotal(res.data.total);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getUserCb]);
  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    setpagination({ pageSize: 5, pageNum: pageNumber });
  };
  const [form] = Form.useForm();
  const [formRandom] = Form.useForm();

  const invform = {
    questionBankType: 1,
    typeId: ''
  };
  const onReset = () => {
    form.resetFields();
  };
  const onFinish = (values: any) => {
    onReset();
    if (values.time) {
      setsearchForm({
        questionBankType: 1,
        typeId: values.typeId
      });
    } else {
      setsearchForm({
        questionBankType: 1,
        typeId: values.typeId
      });
    }
  };

  const onRandomOk = async () => {
    try {
      const values = await formRandom.validateFields();
      const res = await randomQuestion({ typeId: values.typeId });
      if (res.status == 200) {
        messageApi.open({
          type: 'success',
          content: '查询成功'
        });
        const { answer, question } = res.data;
        formRandom.setFieldsValue({
          answer,
          question,
          questionBankType: 1
        });
      } else {
        message.error('生成失败！');
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  const validateMessages = {
    required: '请填写您要添加的${label}!',
    types: {
      email: '$您输入的{label}不合理 ! ',
      number: '$您输入的{label}不合理 ! ',
      string: '$您输入的{label}不合理 !'
    },
    number: {
      range: '${label} must be between ${min} and ${max}'
    },
    string: {
      range: '${label} 应该在 ${min} 到 ${max} 之间'
    }
  };
  const [TypeList, setTypeList] = useState<SortType[]>([]);
  useEffect(() => {
    (async function () {
      const res = await getAllType();
      setTypeList(res.data);
    })();
  }, []);

  return (
    <div style={{ overflow: 'hidden' }}>
      {contextHolder}
      <Modal
        title="随机一题"
        centered
        open={openRandom}
        onOk={onRandomOk}
        onCancel={() => setOpenRandom(false)}
        width={400}
        cancelText="取消"
        okText="点击生成随机一题"
      >
        <Form
          layout="horizontal"
          form={formRandom}
          size="large"
          style={{ marginBottom: '10px' }}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          validateMessages={validateMessages}
          name="randomFormName"
        >
          <Form.Item label="问题" name="question">
            <Input.TextArea readOnly style={{ minWidth: '250px' }} />
          </Form.Item>
          <Form.Item label="回答" name="answer">
            <Input.TextArea readOnly style={{ minWidth: '250px' }} />
          </Form.Item>
          <Form.Item label="类型" name="typeId" extra="注意：可根据所选的类型进行分类">
            <Select style={{ width: '250px' }}>
              {TypeList.map((item) => {
                return (
                  <Select.Option key={item.id} value={item.id}>
                    {item.typeName}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Form
        layout="inline"
        form={form}
        style={{ margin: '0 0 10px 10px' }}
        onFinish={onFinish}
        initialValues={invform}
      >
        <Form.Item label="类别" name="typeId" style={{ width: '200px' }}>
          <Select>
            {TypeList.map((item) => {
              return (
                <Select.Option key={item.id} value={item.id}>
                  {item.typeName}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            style={{ marginRight: '10px' }}
            icon={<SearchOutlined />}
            htmlType="submit"
          >
            搜索
          </Button>
          <Button
            onClick={() => setOpenRandom(true)}
            style={{ backgroundColor: '#0DD068' }}
            type="primary"
            icon={<QuestionCircleOutlined />}
          >
            随机一题
          </Button>
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        bordered
        dataSource={listdata}
        pagination={false}
        rowKey={(listdata) => listdata.id}
        loading={loading}
        scroll={{
          x: '100%'
        }}
      />
      <Pagination
        style={{ float: 'right', padding: '10px 20px' }}
        defaultCurrent={1}
        total={total}
        showQuickJumper
        pageSize={pagination.pageSize}
        current={pagination.pageNum}
        showTotal={showTotal}
        onChange={onChange}
      />
    </div>
  );
};

export default memo(QuestionBankCard);
