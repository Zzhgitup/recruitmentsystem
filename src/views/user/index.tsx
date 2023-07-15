import type { FC, ReactNode, CSSProperties } from 'react';
import React, { memo, Suspense, useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import {
  MailOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FileDoneOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';
interface IProps {
  children?: ReactNode;
}
const RouterToCH = new Map([
  ['interview', '面试管理'],
  ['interviewee', '面试官管理'],
  ['resume', '简历列表'],
  ['questionBank', '题库列表'],
  ['category', '类型分类']
]);
const { Header, Content, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('面试管理', 'interview', <MailOutlined />),
  getItem('题库管理', 'questionBankBox', <QuestionCircleOutlined />, [
    getItem('题库列表', 'questionBank'),
    getItem('题库分类', 'category')
  ]),
  getItem('简历管理', 'resume', <FileDoneOutlined />),
  getItem('面试官管理', 'interviewee', <MailOutlined />)
];
const User: FC<IProps> = () => {
  const location = useLocation();
  useEffect(() => {
    setBread([location.pathname.split('/')[2]]);
  }, []);
  const [collapsed, setCollapsed] = useState(false);
  const [items2, setItems2]: [any, any] = useState([
    {
      title: '管理界面'
    },
    {
      title: '用户'
    }
  ]);
  const allImg = [
    require('../../assets/img/YiPostLogo.jpg'),
    require('../../assets/img/YiPostIcon.jpg')
  ];
  const [logoImg, setlogoImg] = useState(0);
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  function setBread(keypath: Array<any>) {
    setItems2([{ title: '管理界面' }, { title: RouterToCH.get(keypath[0]) }]);
  }
  const navigate = useNavigate();
  const onClickRouter: MenuProps['onClick'] = (e) => {
    setBread(e.keyPath);
    const toRouter = `${e.key}`;
    navigate(toRouter, { replace: false });
  };
  const maxLayStyle: CSSProperties = {
    minHeight: '100vh'
  };
  return (
    <Layout style={maxLayStyle}>
      <Sider
        trigger={null}
        style={{ background: colorBgContainer }}
        collapsible
        collapsed={collapsed}
      >
        <div className="logoDiv" style={{ width: '100%' }}>
          <img style={{ width: '100%' }} src={allImg[logoImg]} alt="" />
        </div>
        <Menu
          onClick={onClickRouter}
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          theme="dark"
          style={{ height: '100%', borderRight: 0, padding: '10px 0' }}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => {
              setCollapsed(!collapsed);
              setlogoImg(logoImg ? 0 : 1);
            }}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64
            }}
          />
          <Breadcrumb style={{ margin: '20px 16px' }} items={items2}></Breadcrumb>
        </Header>
        <Content
          style={{
            padding: 15,
            margin: 10,
            minHeight: 280,
            background: colorBgContainer
          }}
        >
          <Suspense fallback="Loading...">
            <Outlet></Outlet>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default memo(User);
