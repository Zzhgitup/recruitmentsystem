import React, { memo, useState, useEffect, useCallback } from 'react';
import type { FC, ReactNode } from 'react';
import type { PaginationProps } from 'antd';
import { Table, Pagination, Button, Space, Form, Input, Radio, message, Modal, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
  getAllQuestion,
  QuestionAdd,
  QuestionUpload,
  deleteQuestion,
  getAllType
} from '@/service/modules/user';
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
const showTotal: PaginationProps['showTotal'] = (total) => `共 ${total} 页`;
const User: FC<IProps> = () => {
  const [openUpload, setUploadOpen] = useState(false);
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
      title: '类别',
      dataIndex: 'questionBankType',
      width: 40,
      key: 'questionBankType',
      render: (_: any, { questionBankType }: any) => <>{questionBankType == 1 ? '面试' : '笔试'}</>
    },
    {
      title: '类型',
      dataIndex: 'typeName',
      width: 70,
      key: 'typeName'
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      dataIndex: 'key',
      width: 100,
      render: (_: any, record: any) => (
        <Space size="middle">
          <a onClick={() => onUserRevise(record)}>修改</a>
          <a onClick={() => onUserDelete(record)}>刪除</a>
        </Space>
      )
    }
  ];
  const onUserRevise = (data: any) => {
    setUploadOpen(true);
    const { id, answer, question, typeId, questionBankType } = data;
    formUpload.setFieldsValue({
      id,
      answer,
      question,
      typeId,
      questionBankType
    });
  };
  const onUserDelete = (data: any) => {
    setopenConfirm(true);
    setdeleteForm({ id: data.id, question: data.question });
  };
  const [messageApi, contextHolder] = message.useMessage();
  const [listdata, setlistdata] = useState<questionsType[]>([]);
  const [pagination, setpagination] = useState({ pageNum: 1, pageSize: 5 });
  const [total, setTotal] = useState(20);
  const [searchForm, setsearchForm] = useState({
    questionBankType: 1,
    typeId: ''
  });
  // const key = 'updatable';
  const getUserCb = useCallback(
    () => getAllQuestion({ ...pagination, ...searchForm }),
    [pagination, searchForm]
  );
  useEffect(() => {
    getUserCb()
      .then((res) => {
        console.log(res);
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
  const invform = {
    questionBankType: 1,
    typeId: ''
  };
  const addInvForm = {
    questionBankType: 1,
    typeId: 1
  };
  const [formADD] = Form.useForm();
  const [formUpload]: any = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
  const onFinish = (values: any) => {
    onReset();
    if (values.time) {
      setsearchForm({
        questionBankType: values.questionBankType,
        typeId: values.typeId
      });
    } else {
      setsearchForm({
        questionBankType: values.questionBankType,
        typeId: values.typeId
      });
    }
  };

  const onAddOk = async () => {
    try {
      const values = await formADD.validateFields();
      const res = await QuestionAdd(values);
      if (res.status == 200) {
        setpagination({ ...pagination });
        message.success('添加成功！');
        setOpenADD(false);
        formADD.resetFields();
      } else {
        message.error('添加失败！');
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  const onUploadOk = async () => {
    try {
      const values = await formUpload.validateFields();
      const res = await QuestionUpload(values);
      if (res.status == 200) {
        setpagination({ ...pagination });
        message.success('修改成功！');
        setUploadOpen(false);
        formUpload.resetFields();
      } else {
        message.error('修改失败！');
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  //打开添加框
  const [openADD, setOpenADD] = useState(false);
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

  const deleteIDFn = async () => {
    console.log(deleteForm);

    try {
      const res = await deleteQuestion({ ids: deleteForm.id });
      if (res.status == 200) {
        setpagination({ ...pagination });
        messageApi.open({
          type: 'success',
          content: '删除成功！'
        });
        setopenConfirm(false);
      } else {
        message.error('删除失败！');
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  const [openConfirm, setopenConfirm] = useState(false);
  const [deleteForm, setdeleteForm] = useState({ id: 1, question: '啊' });
  return (
    <div>
      {contextHolder}
      <Modal
        title="Modal"
        open={openConfirm}
        onOk={deleteIDFn}
        onCancel={() => setopenConfirm(false)}
        okText="确认"
        cancelText="取消"
      >
        <p>
          你确认删除 <span style={{ color: '#1677FF' }}>{deleteForm.question}</span> 的问题信息吗？
        </p>
      </Modal>
      <Modal
        title="添加问题"
        centered
        open={openADD}
        onOk={onAddOk}
        onCancel={() => setOpenADD(false)}
        width={400}
        cancelText="取消"
        okText="添加"
      >
        <Form
          layout="horizontal"
          form={formADD}
          size="large"
          style={{ marginBottom: '10px' }}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 14 }}
          validateMessages={validateMessages}
          name="addFormName"
          initialValues={addInvForm}
        >
          <Form.Item
            label="问题"
            name="question"
            rules={[{ required: true }, { type: 'string', min: 2, max: 100 }]}
          >
            <Input placeholder="请填写问题" style={{ width: '250px' }} />
          </Form.Item>
          <Form.Item
            label="回答"
            name="answer"
            rules={[{ required: true }, { type: 'string', min: 2, max: 100 }]}
          >
            <Input placeholder="请填写回答" style={{ width: '250px' }} />
          </Form.Item>
          <Form.Item label="类别" name="questionBankType">
            <Select>
              <Select.Option value={0}>笔试</Select.Option>
              <Select.Option value={1}>面试</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="类型" name="typeId">
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
        </Form>
      </Modal>
      <Modal
        title="修改问题信息"
        centered
        open={openUpload}
        onOk={onUploadOk}
        onCancel={() => setUploadOpen(false)}
        width={400}
        cancelText="取消"
        okText="修改"
      >
        <Form
          layout="horizontal"
          form={formUpload}
          size="large"
          style={{ marginBottom: '10px' }}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 14 }}
          validateMessages={validateMessages}
          name="uploadFormName"
        >
          <Form.Item style={{ display: 'none' }} label="id" name="id">
            <Input />
          </Form.Item>
          <Form.Item
            label="问题"
            name="question"
            rules={[{ required: true }, { type: 'string', min: 2, max: 100 }]}
          >
            <Input placeholder="请填写问题" style={{ width: '250px' }} />
          </Form.Item>
          <Form.Item
            label="回答"
            name="answer"
            rules={[{ required: true }, { type: 'string', min: 2, max: 100 }]}
          >
            <Input placeholder="请填写回答" style={{ width: '250px' }} />
          </Form.Item>
          <Form.Item label="类别" name="questionBankType">
            <Select>
              <Select.Option value={0}>笔试</Select.Option>
              <Select.Option value={1}>面试</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="类型" name="typeId">
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
        </Form>
      </Modal>
      <Form
        layout="inline"
        form={form}
        size="large"
        style={{ margin: '0 0 10px 10px' }}
        onFinish={onFinish}
        initialValues={invform}
      >
        <Form.Item label="类型" name="questionBankType">
          <Radio.Group>
            <Radio.Button value={1}>面试</Radio.Button>
            <Radio.Button value={0}>笔试</Radio.Button>
          </Radio.Group>
        </Form.Item>
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
          <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
            搜索
          </Button>
        </Form.Item>
        <Button
          onClick={() => setOpenADD(true)}
          style={{ backgroundColor: '#0DD068' }}
          type="primary"
          icon={<SearchOutlined />}
        >
          添加
        </Button>
      </Form>
      <Table
        columns={columns}
        bordered
        dataSource={listdata}
        pagination={false}
        rowKey={(listdata) => listdata.id}
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

export default memo(User);
