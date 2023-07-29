import React, { memo, useState, useEffect, useCallback } from 'react';
import type { FC, ReactNode } from 'react';
import type { PaginationProps, UploadProps } from 'antd';
import { Table, Button, Space, message, Modal, Pagination, Upload, Tag } from 'antd';
import {
  PlusSquareOutlined,
  InboxOutlined,
  MinusSquareOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { allPage, intervieweeDelete, usersAddByfile } from '@/service/modules/user';
interface IProps {
  children?: ReactNode;
}
interface SortType {
  id: number;
  studentId: string;
  username: string;
  sex: number;
}

const Interviewee: FC<IProps> = () => {
  const columns: Array<any> = [
    {
      title: '姓名',
      width: 100,
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '学号',
      width: 100,
      dataIndex: 'studentId',
      key: 'studentId'
    },
    {
      title: '性别',
      width: 100,
      dataIndex: 'sex',
      key: 'sex',
      render: (_: any, { sex }: any) => (
        <>
          <Tag color={sex === 1 ? 'blue' : 'pink'}>{sex === 1 ? '男' : '女'}</Tag>
        </>
      )
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      dataIndex: 'key',
      width: 120,
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button danger type="primary" onClick={() => onUserDelete(record)}>
            刪除
            <DeleteOutlined />
          </Button>
        </Space>
      )
    }
  ];
  const onUserDelete = (data: any) => {
    setopenConfirm(true);
    setdeleteForm({ id: data.id, username: data.username });
  };
  const [messageApi, contextHolder] = message.useMessage();
  const [listdata, setlistdata] = useState<SortType[]>([]);
  const [pagination, setpagination] = useState({ pageNum: 1, pageSize: 5 });
  const [total, setTotal] = useState(20);
  const showTotal: PaginationProps['showTotal'] = (total) => `共 ${total} 页`;
  const getUsereCb = useCallback(() => allPage(pagination), [pagination]);
  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    setpagination({ pageSize: 5, pageNum: pageNumber });
  };
  useEffect(() => {
    getUsereCb()
      .then((res) => {
        setlistdata(res.data.records);
        setTotal(res.data.total);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getUsereCb]);
  const onAddOk = async () => {
    try {
      console.log(fileList[0]);
      const formdata = new FormData();
      formdata.append('file', fileList[0].originFileObj);
      const res = await usersAddByfile(formdata);
      console.log(res);
      if (res.status == 200) {
        setpagination({ ...pagination });
        messageApi.open({
          type: 'success',
          content: '添加成功！'
        });
        setOpenADD(false);
      } else {
        message.error('添加失败！');
      }
    } catch (errorInfo: any) {
      message.warning(errorInfo.errorFields[0].errors);
    }
  };
  //打开添加框
  const [openADD, setOpenADD] = useState(false);
  const deleteIDFn = async () => {
    try {
      const ids = deleteForm.id == 0 ? selectedRowKeys : deleteForm.id;
      console.log(ids);
      const res = await intervieweeDelete(ids);
      setSelectedRowKeys([]);
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
  const [deleteForm, setdeleteForm] = useState({ id: 1, username: '啊' });
  const [fileList, setFileList] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  const props: UploadProps = {
    name: 'intervieeFile',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        setFileList(info.fileList);
        message.success(`${info.file.name} 本地上传成功，请点击确定上传.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 上传失败！.`);
      }
    },
    onDrop() {
      setFileList([]);
    }
  };
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
          你确认删除 <span style={{ color: '#1677FF' }}>{deleteForm.username}</span> 的信息吗？
        </p>
      </Modal>
      <Modal
        title="添加面试官类型"
        centered
        open={openADD}
        onOk={onAddOk}
        onCancel={() => setOpenADD(false)}
        width={400}
        cancelText="取消"
        okText="点击确定上传"
      >
        <Upload.Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击上传xlsx文件</p>
          <p className="ant-upload-hint">支持拖拽上传</p>
        </Upload.Dragger>
      </Modal>
      <Button
        onClick={() => setOpenADD(true)}
        style={{ backgroundColor: '#0DD068', marginBottom: '10px' }}
        type="primary"
        icon={<PlusSquareOutlined />}
      >
        批量添加
      </Button>
      <Button
        onClick={() => {
          setopenConfirm(true);
          setdeleteForm({ id: 0, username: '所选用户' });
        }}
        disabled={selectedRowKeys.length == 0}
        danger
        style={{ margin: '0 0 10px 20px' }}
        type="primary"
        icon={<MinusSquareOutlined />}
      >
        批量删除
      </Button>
      <Table
        columns={columns}
        bordered
        dataSource={listdata}
        pagination={false}
        rowKey={(listdata) => listdata.id}
        rowSelection={rowSelection}
        loading={listdata.length == 0}
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

export default memo(Interviewee);
