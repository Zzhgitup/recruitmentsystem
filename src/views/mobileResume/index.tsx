import React, { memo, useState, useEffect, useCallback } from 'react';
import type { FC, ReactNode } from 'react';
import type { PaginationProps, UploadProps } from 'antd';
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
  Upload
} from 'antd';
import { SearchOutlined, PlusSquareOutlined, UploadOutlined } from '@ant-design/icons';
import {
  allResumePage,
  resumeAdd,
  resumeUpload,
  resumeDelete,
  userInfo
} from '@/service/modules/user';
import PhotoReception from '@/components/PhotoReception';
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
const showTotal: PaginationProps['showTotal'] = (total) => `共 ${total} 条`;
const MobileResume: FC<IProps> = () => {
  const [openUpload, setUploadOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const columns: Array<any> = [
    {
      title: '正面',
      dataIndex: 'filePath1',
      width: 160,
      key: 'filePath1',
      render: (_: any) => <Image placeholder width={160} src={_}></Image>
    },
    {
      title: '反面',
      dataIndex: 'filePath2',
      width: 160,
      key: 'filePath2',
      render: (_: any) => <Image placeholder width={160} src={_}></Image>
    },
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
      title: '操作',
      key: 'operation',
      fixed: 'right',
      dataIndex: 'key',
      width: 150,
      render: (_: any, record: any) => (
        <Space size="small">
          <Button type="text" onClick={() => onUserRevise(record)}>
            修改
          </Button>
          <Button danger type="text" onClick={() => onUserDelete(record)}>
            刪除
          </Button>
        </Space>
      )
    }
  ];
  const onUserRevise = (data: any) => {
    setUploadOpen(true);
    const { userId, username } = data;
    formUpload.setFieldsValue({
      userId,
      username
    });
  };
  const onUserDelete = (data: any) => {
    setopenConfirm(true);
    setdeleteForm({ userId: data.userId, username: data.username });
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
  const [formADD]: any = Form.useForm();
  const [formPhoto]: any = Form.useForm();
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
      const reStudentId = await userInfo({ studentId: values.studentId });
      if (!reStudentId.data) {
        message.error('你填写的学号不存在！');
        return;
      }
      const formData = new FormData();
      formData.append('one', values.filePath1.originFileObj);
      formData.append('two', values.filePath2.originFileObj);
      messageApi.open({
        key: 'uploading',
        type: 'loading',
        content: 'Loading...'
      });
      const res = await resumeAdd({ id: reStudentId.data[0].id }, formData);
      if (res.status == 200) {
        setpagination({ ...pagination });
        messageApi.open({
          key: 'uploading',
          type: 'success',
          content: '添加成功！'
        });
        reopenADD();
      } else {
        message.error('添加失败！');
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  const onPhotoOk = async () => {
    try {
      const values = await formPhoto.validateFields();
      const reStudentId = await userInfo({ studentId: values.studentId });
      if (!reStudentId.data) {
        message.error('你填写的学号不存在！');
        return;
      }
      const formData = new FormData();
      const res = await resumeAdd({ id: reStudentId.data[0].id }, formData);
      messageApi.open({
        key: 'uploading',
        type: 'loading',
        content: 'Loading...'
      });
      if (res.status == 200) {
        setpagination({ ...pagination });
        messageApi.open({
          key: 'uploading',
          type: 'success',
          content: '添加成功！'
        });
        rePhotoADD();
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
      const formData = new FormData();

      if (values.filePath1) {
        formData.append('one', values.filePath1.originFileObj);
      }
      if (values.filePath2) {
        formData.append('two', values.filePath2.originFileObj);
      }
      if (!values.filePath2 && !values.filePath1) {
        message.info('请上传你要修改的文件！');
        return;
      }
      const res = await resumeUpload({ id: values.userId }, formData);
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
  const [openPhotoADD, setPhotoADD] = useState(false);
  const reopenADD = () => {
    setOpenADD(false);
    formADD.resetFields();
  };
  const rePhotoADD = () => {
    setPhotoADD(false);
    formPhoto.resetFields();
  };

  const reopenUpload = () => {
    setUploadOpen(false);
    formUpload.resetFields();
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
  const deleteIDFn = async () => {
    try {
      const ids = `ids=${deleteForm.userId}`;
      const res = await resumeDelete(ids);
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
  const [deleteForm, setdeleteForm] = useState({ userId: 1, username: '啊' });
  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    let isImg = false;
    if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
      isImg = true;
    }
    if (!isImg) {
      message.error(`${file.name} 不是图片格式`);
    }
    return isImg || Upload.LIST_IGNORE;
  };
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (e.fileList.length == 1) {
      e.fileList[0].status = 'done';
      return e.fileList[0];
    } else if (e.fileList.length > 1) {
      for (const i of e.fileList) {
        i.status = 'error';
      }
      e.file.status = 'done';
      return e.file;
    } else {
      return undefined;
    }
  };
  const handleUploadPhoto1 = (photo: File | null) => {
    // handle the uploaded photo here
    formPhoto.setFieldValue('filePath1', photo);
    console.log(photo);
  };
  const handleUploadPhoto2 = (photo: File | null) => {
    // handle the uploaded photo here
    formPhoto.setFieldValue('filePath2', photo);
    console.log(photo);
  };
  return (
    <div>
      {contextHolder}
      <Modal
        title="修改简历"
        open={openConfirm}
        onOk={deleteIDFn}
        onCancel={() => setopenConfirm(false)}
        okText="确认"
        cancelText="取消"
      >
        <p>
          你确认删除 <span style={{ color: '#1677FF' }}>{deleteForm.username}</span> 的问题信息吗？
        </p>
      </Modal>

      <Modal
        title="拍照上传"
        centered
        open={openPhotoADD}
        onOk={onPhotoOk}
        onCancel={() => rePhotoADD()}
        width={400}
        cancelText="取消"
        okText="添加"
      >
        {openPhotoADD && (
          <Form
            layout="horizontal"
            labelAlign="left"
            form={formPhoto}
            size="large"
            style={{ marginBottom: '10px' }}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 14 }}
            validateMessages={validateMessages}
            name="addFormName"
          >
            <Form.Item
              label="学号"
              name="studentId"
              rules={[{ required: true }, { type: 'string', min: 2, max: 100 }]}
            >
              <Input placeholder="请填写你要添加同学的学号" style={{ minWidth: '250px' }} />
            </Form.Item>
            <Form.Item
              label="正面"
              name="filePath1"
              valuePropName="filePath1"
              getValueFromEvent={normFile}
              rules={[{ required: true }]}
            >
              <PhotoReception onReturnPhoto={handleUploadPhoto1}></PhotoReception>
            </Form.Item>
            <Form.Item
              label="反面"
              name="filePath2"
              valuePropName="filePath2"
              getValueFromEvent={normFile}
              rules={[{ required: true }]}
            >
              <PhotoReception onReturnPhoto={handleUploadPhoto2}></PhotoReception>
            </Form.Item>
          </Form>
        )}
      </Modal>
      <Modal
        title="简历上传"
        centered
        open={openADD}
        onOk={onAddOk}
        onCancel={() => reopenADD()}
        width={400}
        cancelText="取消"
        okText="添加"
      >
        <Form
          layout="horizontal"
          labelAlign="left"
          form={formADD}
          size="large"
          style={{ marginBottom: '10px' }}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 14 }}
          validateMessages={validateMessages}
          name="addFormName"
        >
          <Form.Item
            label="学号"
            name="studentId"
            rules={[{ required: true }, { type: 'string', min: 2, max: 100 }]}
          >
            <Input placeholder="请填写你要添加同学的学号" style={{ minWidth: '250px' }} />
          </Form.Item>
          <Form.Item
            label="正面"
            name="filePath1"
            valuePropName="filePath1"
            getValueFromEvent={normFile}
            rules={[{ required: true }]}
          >
            <Upload.Dragger
              customRequest={() => beforeUpload}
              name="filePath1"
              listType="picture-card"
              accept=".png,.jpg,.jpeg,image/png,image/jpg,image/jpeg"
              beforeUpload={beforeUpload}
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽添加图片</p>
            </Upload.Dragger>
          </Form.Item>
          <Form.Item
            label="反面"
            name="filePath2"
            valuePropName="filePath2"
            getValueFromEvent={normFile}
            rules={[{ required: true }]}
          >
            <Upload.Dragger
              customRequest={() => beforeUpload}
              name="filePath2"
              listType="picture-card"
              accept=".png,.jpg,.jpeg,image/png,image/jpg,image/jpeg"
              beforeUpload={beforeUpload}
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽添加图片</p>
            </Upload.Dragger>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="修改问题信息"
        centered
        open={openUpload}
        onOk={onUploadOk}
        onCancel={() => reopenUpload()}
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
          <Form.Item style={{ display: 'none' }} label="userId" name="userId">
            <Input />
          </Form.Item>
          <Form.Item label="姓名" name="username">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="正面"
            name="filePath1"
            valuePropName="filePath1"
            getValueFromEvent={normFile}
          >
            <Upload.Dragger
              name="filePath1"
              listType="picture-card"
              accept=".png,.jpg,.jpeg,image/png,image/jpg,image/jpeg"
              customRequest={() => beforeUpload}
              beforeUpload={beforeUpload}
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽添加图片</p>
            </Upload.Dragger>
          </Form.Item>
          <Form.Item
            label="反面"
            name="filePath2"
            valuePropName="filePath2"
            getValueFromEvent={normFile}
          >
            <Upload.Dragger
              name="filePath2"
              listType="picture-card"
              accept=".png,.jpg,.jpeg,image/png,image/jpg,image/jpeg"
              customRequest={() => beforeUpload}
              beforeUpload={beforeUpload}
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽添加图片</p>
            </Upload.Dragger>
          </Form.Item>
        </Form>
      </Modal>
      <Form
        layout="horizontal"
        labelCol={{ span: 1 }}
        wrapperCol={{ span: 4 }}
        style={{ margin: '20px', maxWidth: 600 }}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item label="姓名" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="班级" name="claas">
          <Input />
        </Form.Item>
        <Form.Item label="学号" name="studentId">
          <Input />
        </Form.Item>
        <Form.Item label="qq" name="qq">
          <Input />
        </Form.Item>
        <Form.Item label="性别:" name="sex">
          <Radio.Group>
            <Radio.Button value={undefined}>全部</Radio.Button>
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
          {/* <Button
            onClick={() => setPhotoADD(true)}
            style={{ backgroundColor: '#0DD068', marginRight: '10px' }}
            type="primary"
            icon={<PlusSquareOutlined />}
          >
            拍照上传
          </Button> */}
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        bordered
        dataSource={listdata}
        pagination={false}
        rowKey={(listdata) => listdata.userId}
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

export default memo(MobileResume);
