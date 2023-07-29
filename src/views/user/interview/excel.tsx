import { FileExcelOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import {
  passAll,
  passFirstExcelOne,
  passFirstExcelTwo,
  passSecondExcel,
  passSecondExcelTwo,
  passWrittenExcelOne,
  passWrittenExcelTwo,
  waiteWrittenExcel
} from '@/service/modules/user';

interface IProps {
  children?: ReactNode;
}

const apiArr = [
  passAll,
  passFirstExcelOne,
  passFirstExcelTwo,
  passSecondExcel,
  passSecondExcelTwo,
  passWrittenExcelOne,
  passWrittenExcelTwo,
  waiteWrittenExcel
];

const apiName = [
  '已录取',
  '待二面(附面试官)',
  '待二面',
  '待三面',
  '待三面(附面试官)',
  '待一面',
  '待一面(附面试官)',
  '待笔试'
];
const Excel: FC<IProps> = () => {
  const [form] = Form.useForm();
  function download(blobUrl: any, name: string) {
    const a = document.createElement('a');
    a.style.display = 'none';
    a.download = name;
    a.href = blobUrl;
    a.click();
  }
  const onFinish = async (values: any) => {
    values.data = values.data.format('YYYY年MM月DD日HH时mm分');
    const { type, data, place } = values;
    // console.log(values);
    if (type == 0) {
      const res = await passAll();
      const url = window.URL.createObjectURL(res);
      download(url, apiName[type]);
      return;
    } else {
      const res = await apiArr[type]({ data, place });
      const url = window.URL.createObjectURL(res);
      download(url, apiName[type]);
    }
  };
  const validateMessages = {
    required: '请填写您要导出的${label}信息!'
  };
  return (
    <div>
      <Form
        layout="horizontal"
        validateMessages={validateMessages}
        form={form}
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 8 }}
        style={{ margin: '0 0 10px 10px' }}
        onFinish={onFinish}
      >
        <Form.Item label="导出选择" name="type" rules={[{ required: true }]}>
          <Select>
            {apiName.map((item, index) => {
              return (
                <Select.Option key={index} value={index}>
                  {item}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="面试地点" name="place" rules={[{ required: true }]}>
          <Input placeholder="请填写面试地点" />
        </Form.Item>
        <Form.Item label="面试时间" name="data" rules={[{ required: true }]}>
          <DatePicker showTime placeholder="请选择面试时间" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            style={{ marginRight: '10px' }}
            icon={<FileExcelOutlined />}
            htmlType="submit"
          >
            导出EXCEL
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default memo(Excel);
