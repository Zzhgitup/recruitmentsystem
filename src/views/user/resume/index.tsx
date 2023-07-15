import React, { memo, useState, useEffect, useCallback } from 'react';
import type { FC, ReactNode } from 'react';
import type { PaginationProps } from 'antd';
import {
  Table,
  Pagination,
  Button,
  Space,
  Image,
  Form,
  Input,
  Radio,
  message,
  Modal,
  Select
} from 'antd';
import { SearchOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { allResumePage, resumeAdd, resumeUpload, resumeDelete } from '@/service/modules/user';
interface IProps {
  children?: ReactNode;
}
export interface resumeType {
  id: string;
  userId: number;
  filePath1: string;
  filePath2: string;
  studentId: string;
  username: string;
}
const showTotal: PaginationProps['showTotal'] = (total) => `共 ${total} 页`;
const Resume: FC<IProps> = () => {
  const [openUpload, setUploadOpen] = useState(false);
  const columns: Array<any> = [
    {
      title: '正面',
      dataIndex: 'filePath1',
      width: 200,
      key: 'filePath1',
      render: (_: any) => <Image width={200} src={_}></Image>
    },
    {
      title: '反面',
      dataIndex: 'filePath2',
      width: 200,
      key: 'filePath2',
      render: (_: any) => <Image width={200} src={_}></Image>
    },
    {
      title: '姓名',
      width: 60,
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '学号',
      width: 80,
      dataIndex: 'studentId',
      key: 'studentId'
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
    const { id, answer, question, typeId, sex } = data;
    formUpload.setFieldsValue({
      id,
      answer,
      question,
      typeId,
      sex
    });
  };
  const onUserDelete = (data: any) => {
    setopenConfirm(true);
    setdeleteForm({ id: data.id, question: data.question });
  };
  const [messageApi, contextHolder] = message.useMessage();
  const [listdata, setlistdata] = useState<resumeType[]>([]);
  const [pagination, setpagination] = useState({ pageNum: 1, pageSize: 5 });
  const [total, setTotal] = useState(20);
  const [form] = Form.useForm();
  const getUserCb = useCallback(
    () => allResumePage({ ...pagination, ...form.getFieldsValue() }),
    [pagination]
  );
  useEffect(() => {
    getUserCb()
      .then((res) => {
        console.log(res);
        setlistdata(res.data);
        // setTotal(res.data.total);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getUserCb]);
  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    setpagination({ pageSize: 5, pageNum: pageNumber });
  };
  const addInvForm = {
    sex: 1,
    typeId: 1
  };
  const [formADD] = Form.useForm();
  const [formUpload]: any = Form.useForm();
  const onFinish = (values: any) => {
    console.log(values);
    console.log(form.getFieldsValue());
    setpagination({ ...pagination });
    // form.setFieldsValue(values);

    // setsearchForm({
    //   sex: values.sex,
    //   typeId: values.typeId
    // });
  };
  const onAddOk = async () => {
    try {
      const values = await formADD.validateFields();
      const res = await resumeAdd(values);
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
      const res = await resumeUpload(values);
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
  const deleteIDFn = async () => {
    console.log(deleteForm);

    try {
      const res = await resumeDelete({ ids: deleteForm.id });
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
            <Input.TextArea placeholder="请填写问题" style={{ minWidth: '250px' }} />
          </Form.Item>
          <Form.Item
            label="回答"
            name="answer"
            rules={[{ required: true }, { type: 'string', min: 2, max: 100 }]}
          >
            <Input.TextArea placeholder="请填写回答" style={{ minWidth: '250px' }} />
          </Form.Item>
          <Form.Item label="类别" name="sex">
            <Select>
              <Select.Option value={0}>女</Select.Option>
              <Select.Option value={1}>男</Select.Option>
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
            <Input.TextArea placeholder="请填写问题" style={{ minWidth: '250px' }} />
          </Form.Item>
          <Form.Item
            label="回答"
            name="answer"
            rules={[{ required: true }, { type: 'string', min: 2, max: 100 }]}
          >
            <Input.TextArea placeholder="请填写回答" style={{ minWidth: '250px' }} />
          </Form.Item>
          <Form.Item label="类别" name="sex">
            <Select>
              <Select.Option value={0}>女</Select.Option>
              <Select.Option value={1}>男</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Form
        layout="inline"
        form={form}
        style={{ margin: '0 0 10px 10px' }}
        onFinish={onFinish}
        labelCol={{ span: 5 }}
      >
        <Form.Item label="姓名" name="name" style={{ maxWidth: '160px' }}>
          <Input />
        </Form.Item>
        <Form.Item label="班级" name="claas" style={{ maxWidth: '160px' }}>
          <Input />
        </Form.Item>
        <Form.Item label="学号" name="studentId" style={{ maxWidth: '180px' }}>
          <Input />
        </Form.Item>
        <Form.Item label="qq" name="qq" style={{ maxWidth: '180px' }}>
          <Input />
        </Form.Item>
        <Form.Item label="性别：" name="sex">
          <Radio.Group style={{ marginLeft: '10px' }}>
            <Radio.Button value={1}>男</Radio.Button>
            <Radio.Button value={0}>女</Radio.Button>
          </Radio.Group>
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
            onClick={() => setOpenADD(true)}
            style={{ backgroundColor: '#0DD068', marginRight: '10px' }}
            type="primary"
            icon={<PlusSquareOutlined />}
          >
            添加
          </Button>
        </Form.Item>
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

export default memo(Resume);
