import React, { memo, useState, useEffect, useCallback } from 'react';
import type { FC, ReactNode } from 'react';
import type { PaginationProps } from 'antd';
import {
  Table,
  Pagination,
  Button,
  Space,
  Form,
  Input,
  message,
  Modal,
  Select,
  Radio,
  DatePicker,
  Tag
} from 'antd';
import { SearchOutlined, PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons';
import {
  allInterviewPage,
  intervieweesAdd,
  interviewStatusUpload,
  // deleteQuestion,
  interviewPlaceUpload
} from '@/service/modules/user';
import { useNavigate } from 'react-router-dom';
interface IProps {
  children?: ReactNode;
}
export interface interviewType {
  id: number;
  question: string;
  answer: string;
  questionBankType: number;
}

const showTotal: PaginationProps['showTotal'] = (total) => `共 ${total} 页`;
const Interview: FC<IProps> = () => {
  const [openUpload, setUploadOpen] = useState(false);
  const [openStatusUpload, setStatusUploadOpen] = useState(false);
  const navigate = useNavigate();
  function statusToCh(num: number) {
    switch (num) {
      case 0:
        return '待笔试';
      case 1:
        return '笔试未通过';
      case 2:
        return '待面试';
      case 3:
        return '进入二面';
      case 4:
        return '进入三面';
      case 5:
        return '已录取';
      default:
        return '面试未通过';
    }
  }
  const columns: Array<any> = [
    {
      title: '姓名',
      width: 80,
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '学号',
      width: 120,
      dataIndex: 'studentId',
      key: 'studentId'
    },
    {
      title: '班级',
      width: 85,
      dataIndex: 'claas',
      key: 'claas'
    },
    {
      title: '性别',
      width: 65,
      dataIndex: 'sex',
      key: 'sex',
      render: (_: any, { sex }: any) => (
        <>
          <Tag color={sex === 1 ? 'blue' : 'pink'}>{sex === 1 ? '男' : '女'}</Tag>
        </>
      )
    },
    {
      title: '报名时间',
      width: 110,
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '状态',
      width: 105,
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => (
        <>
          <Tag color={status === 5 ? 'green' : 'grey'}>{statusToCh(status)}</Tag>
        </>
      )
    },
    {
      title: '面试地点',
      width: 70,
      dataIndex: 'interviewPlace',
      key: 'interviewPlace'
      // render: (status: string) => (
      //   <>

      //   </>
      // )
    },
    {
      title: '面试时间',
      width: 110,
      dataIndex: 'interviewData',
      key: 'interviewData'
    },
    {
      title: '操作',
      key: 'operation',
      width: 225,
      fixed: 'right',
      dataIndex: 'key',
      render: (_: any, record: any) => (
        <Space size="middle">
          <a onClick={() => onInterviewRevise(record)}>地点时间</a>
          <a onClick={() => onStatusRevise(record)}>状态修改</a>
          <a onClick={() => onToInterview(record)}>面试</a>
          <a style={{ display: 'none' }} onClick={() => onUserDelete(record)}>
            刪除
          </a>
        </Space>
      )
    }
  ];
  const onStatusRevise = (data: any) => {
    setStatusUploadOpen(true);
    const { id, status } = data;
    formStatusUpload.setFieldsValue({
      id,
      status
    });
  };
  const onInterviewRevise = (data: any) => {
    setUploadOpen(true);
    const { id, answer, question, status } = data;
    formUpload.setFieldsValue({
      id,
      answer,
      question,
      status
    });
  };
  const onToInterview = (data: any) => {
    if (data.status == 0) {
      message.info('请先修改面试者的面试状态！');
      return;
    }
    setopenConfirm2(true);
    setinterviewForm({ id: data.id, username: data.username });
  };
  const onUserDelete = (data: any) => {
    setopenConfirm(true);
    setdeleteForm({ id: data.id, question: data.question });
  };
  const [messageApi, contextHolder] = message.useMessage();
  const [listdata, setlistdata] = useState<interviewType[]>([]);
  const [pagination, setpagination] = useState({ pageNum: 1, pageSize: 5 });
  const [total, setTotal] = useState(20);
  const [searchForm, setsearchForm] = useState({ status: '' });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  const getUserCb = useCallback(
    () => allInterviewPage({ ...pagination, ...searchForm }),
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
    status: ''
  };
  const addInvForm = {
    status: 1
  };
  const [formADD] = Form.useForm();
  const [formUpload]: any = Form.useForm();
  const [formStatusUpload]: any = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
  const onFinish = (values: any) => {
    onReset();
    if (values.time) {
      setsearchForm({ status: values.status });
    } else {
      setsearchForm({
        status: values.status
      });
    }
  };
  const onAddOk = async () => {
    try {
      const values = await formADD.validateFields();
      const res = await intervieweesAdd(values);
      console.log(res);

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
      values.time = values.time.format('YYYY-MM-DD HH:mm:ss');
      const res = await interviewPlaceUpload(values);
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
  const onStatusUploadOk = async () => {
    try {
      const values = await formStatusUpload.validateFields();
      const res = await interviewStatusUpload(values);
      if (res.status == 200) {
        setpagination({ ...pagination });
        message.success('修改成功！');
        setStatusUploadOpen(false);
        formStatusUpload.resetFields();
      } else {
        messageApi.open({
          type: 'error',
          content: '修改失败！'
        });
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
      email: '您输入的${label}不合理 ! ',
      number: '您输入的${label}不合理 ! ',
      string: '您输入的${label}不合理 !'
    },
    string: {
      range: '${label} 应该在 ${min} 到 ${max} 之间'
    }
  };

  const deleteIDFn = async () => {
    message.info('待开发！');

    // try {
    //   const ids =
    //     deleteForm.id == 0
    //       ? selectedRowKeys.map((id) => `ids=${id}`).join('&')
    //       : `ids=${deleteForm.id}`;
    //   const res = await deleteQuestion(ids);
    //   if (res.status == 200) {
    //     setpagination({ ...pagination });
    //     messageApi.open({
    //       type: 'success',
    //       content: '删除成功！'
    //     });
    //     setopenConfirm(false);
    //   } else {
    //     message.error('删除失败！');
    //   }
    // } catch (errorInfo) {
    //   console.log('Failed:', errorInfo);
    // }
  };
  const ToInterview = async () => {
    console.log(interviewForm);
    const userId = interviewForm.id;
    sessionStorage.setItem('interviewUserId', userId.toString());
    navigate(`../interviewing`, { replace: false });
  };
  const [openConfirm, setopenConfirm] = useState(false);
  const [openConfirm2, setopenConfirm2] = useState(false);
  const [deleteForm, setdeleteForm] = useState({ id: 1, question: '啊' });
  const [interviewForm, setinterviewForm] = useState({ id: 1, username: '啊' });
  return (
    <div>
      {contextHolder}
      <Modal
        title="进入面试"
        open={openConfirm2}
        onOk={ToInterview}
        onCancel={() => setopenConfirm2(false)}
        okText="确认"
        cancelText="取消"
      >
        <p>
          你确认进入 <span style={{ color: '#1677FF' }}>{interviewForm.username}</span> 的面试吗？
        </p>
      </Modal>
      <Modal
        title="删除信息"
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
        title="添加面试者"
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
            label="学号"
            name="studentId"
            rules={[{ required: true }, { type: 'string', min: 11, max: 11 }]}
          >
            <Input placeholder="请填写学号" style={{ minWidth: '250px' }} />
          </Form.Item>
          <Form.Item
            label="姓名"
            name="username"
            rules={[{ required: true }, { type: 'string', min: 2, max: 10 }]}
          >
            <Input placeholder="请填写姓名" style={{ minWidth: '250px' }} />
          </Form.Item>
          <Form.Item
            label="班级"
            name="claas"
            rules={[{ required: true }, { type: 'string', min: 3, max: 10 }]}
          >
            <Input placeholder="请填写班级" style={{ minWidth: '250px' }} />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true }, { type: 'email', min: 3, max: 100 }]}
          >
            <Input placeholder="请填写邮箱" style={{ minWidth: '250px' }} />
          </Form.Item>
          <Form.Item
            label="QQ"
            name="qqNumber"
            rules={[{ required: true }, { type: 'string', min: 4, max: 15 }]}
          >
            <Input placeholder="请填写QQ" style={{ minWidth: '250px' }} />
          </Form.Item>
          <Form.Item label="性别" rules={[{ required: true }]} name="sex">
            <Radio.Group>
              <Radio value={0}>女</Radio>
              <Radio value={1}>男</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="修改面试时间"
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
            label="面试地点"
            name="place"
            rules={[{ required: true }, { type: 'string', min: 2, max: 10 }]}
          >
            <Input placeholder="请填写面试地点" style={{ minWidth: '250px' }} />
          </Form.Item>
          <Form.Item label="面试时间" name="time" rules={[{ required: true }]}>
            <DatePicker
              showTime
              placeholder="请选择面试时间"
              style={{ width: '240px' }}
              format="YYYY-MM-DD HH:mm:ss"
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="修改面试状态"
        centered
        open={openStatusUpload}
        onOk={onStatusUploadOk}
        onCancel={() => setStatusUploadOpen(false)}
        width={400}
        cancelText="取消"
        okText="修改"
      >
        <Form
          layout="horizontal"
          form={formStatusUpload}
          size="large"
          style={{ marginBottom: '10px' }}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 14 }}
          name="uploadStatusFormName"
        >
          <Form.Item style={{ display: 'none' }} label="id" name="id">
            <Input />
          </Form.Item>
          <Form.Item label="类别" name="status">
            <Select>
              <Select.Option value={0}>待笔试</Select.Option>
              <Select.Option value={1}>笔试未通过</Select.Option>
              <Select.Option value={2}>待面试</Select.Option>
              <Select.Option value={3}>进入二面</Select.Option>
              <Select.Option value={4}>进入三面</Select.Option>
              <Select.Option value={5}>已录取</Select.Option>
              <Select.Option value={6}>面试未通过</Select.Option>
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
        <Form.Item label="状态" name="status" style={{ width: '200px' }}>
          <Select>
            <Select.Option value={0}>待笔试</Select.Option>
            <Select.Option value={1}>笔试未通过</Select.Option>
            <Select.Option value={2}>待面试</Select.Option>
            <Select.Option value={3}>进入二面</Select.Option>
            <Select.Option value={4}>进入三面</Select.Option>
            <Select.Option value={5}>已录取</Select.Option>
            <Select.Option value={6}>面试未通过</Select.Option>
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
            onClick={() => setOpenADD(true)}
            style={{ backgroundColor: '#0DD068', marginRight: '10px' }}
            type="primary"
            icon={<PlusSquareOutlined />}
          >
            添加
          </Button>
          <Button
            onClick={() => {
              setopenConfirm(true);
              setdeleteForm({ id: 0, question: '所选问题' });
            }}
            danger
            disabled={selectedRowKeys.length == 0}
            style={{ marginRight: '10px' }}
            type="primary"
            icon={<MinusSquareOutlined />}
          >
            批量删除
          </Button>
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        bordered
        dataSource={listdata}
        pagination={false}
        rowKey={(listdata) => listdata.id}
        rowSelection={rowSelection}
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

export default memo(Interview);
