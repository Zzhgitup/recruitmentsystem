import React, { memo, useState, useEffect, useCallback } from 'react';
import type { FC, ReactNode } from 'react';
import { Table, Button, Space, Form, Input, message, Modal } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import { getAllType, typeAdd, typeUpload, deleteType } from '@/service/modules/user';
interface IProps {
  children?: ReactNode;
}
interface SortType {
  id: number;
  typeName: string;
}
const Student: FC<IProps> = () => {
  const [openUpload, setUploadOpen] = useState(false);
  const columns: Array<any> = [
    {
      title: '类型名',
      width: 100,
      dataIndex: 'typeName',
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
    const { id, typeName } = data;
    formUpload.setFieldsValue({
      id,
      typeName
    });
  };
  const onUserDelete = (data: any) => {
    setopenConfirm(true);
    setdeleteForm({ id: data.id, typeName: data.typeName });
  };
  const [messageApi, contextHolder] = message.useMessage();
  const [listdata, setlistdata] = useState<SortType[]>([]);
  const [pagination, setpagination] = useState({ page: 1, pageSize: 50 });

  const getTypeCb = useCallback(() => getAllType(), [pagination]);
  useEffect(() => {
    getTypeCb()
      .then((res) => {
        console.log(res);
        setlistdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getTypeCb]);
  const [formADD] = Form.useForm();
  const [formUpload]: any = Form.useForm();
  const onAddOk = async () => {
    try {
      const values = await formADD.validateFields();
      console.log(values);

      const res = await typeAdd(values);
      console.log(res);
      if (res.status == 200) {
        setpagination({ ...pagination });
        messageApi.open({
          type: 'success',
          content: '添加成功！'
        });
        setOpenADD(false);
        formADD.resetFields();
      } else {
        message.error('添加失败！');
      }
    } catch (errorInfo: any) {
      message.warning(errorInfo.errorFields[0].errors);
    }
  };
  const onUploadOk = async () => {
    try {
      const values = await formUpload.validateFields();
      const res = await typeUpload(values);
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
    try {
      const res = await deleteType({ ids: deleteForm.id });
      console.log(res);
      if (res.status == 200) {
        setpagination({ ...pagination });
        message.success('删除成功！');
        setopenConfirm(false);
      } else {
        message.error('删除失败！');
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  const [openConfirm, setopenConfirm] = useState(false);
  const [deleteForm, setdeleteForm] = useState({ id: 1, typeName: '啊' });
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
          你确认删除 <span style={{ color: '#1677FF' }}>{deleteForm.typeName}</span> 的问题信息吗？
        </p>
      </Modal>
      <Modal
        title="添加题库类型"
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
        >
          <Form.Item
            label="题库类型"
            name="typeName"
            rules={[{ required: true }, { type: 'string', min: 2, max: 9 }]}
          >
            <Input placeholder="请填写题库类型" style={{ width: '250px' }} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="修改题库类型"
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
            label="题库类型"
            name="typeName"
            rules={[{ required: true }, { type: 'string', min: 0, max: 9 }]}
          >
            <Input placeholder="请填写姓名" style={{ width: '250px' }} />
          </Form.Item>
        </Form>
      </Modal>
      <Button
        onClick={() => setOpenADD(true)}
        style={{ backgroundColor: '#0DD068', marginBottom: '10px' }}
        type="primary"
        icon={<PlusSquareOutlined />}
      >
        添加
      </Button>
      <Table
        columns={columns}
        bordered
        dataSource={listdata}
        pagination={false}
        rowKey={(listdata) => listdata.id}
        loading={listdata.length == 0}
        scroll={{
          x: '100%'
        }}
      />
    </div>
  );
};

export default memo(Student);
