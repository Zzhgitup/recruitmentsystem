import type { FC, ReactNode, CSSProperties } from 'react';
import React, { memo, Suspense, useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import {
  MailOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FileDoneOutlined,
  QuestionCircleOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  DownOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button, Dropdown, Modal } from 'antd';
import type { MenuProps } from 'antd';
import { usedispatch } from '@/store';
import { outlogin } from '../login/store';
import jwtDecode from 'jwt-decode';
interface IProps {
  children?: ReactNode;
}
interface userRoot {
  iat: number;
  id: number;
  power: string;
  username: string;
}

const RouterToCH = new Map([
  ['interview', '面试管理'],
  ['interviewee', '面试官管理'],
  ['resume', '简历列表'],
  ['questionBank', '题库列表'],
  ['category', '类型分类'],
  ['excel', '面试导出'],
  ['interviewing', '面试']
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
  getItem('面试管理', 'interviewBox', <MailOutlined />, [
    getItem('人员列表', 'interview'),
    getItem('结果导出', 'excel')
    // getItem('人员面试', 'interviewing')
  ]),
  getItem('题库管理', 'questionBankBox', <QuestionCircleOutlined />, [
    getItem('题库列表', 'questionBank'),
    getItem('题库分类', 'category')
  ]),
  getItem('简历管理', 'resume', <FileDoneOutlined />),
  getItem('面试官管理', 'interviewee', <TeamOutlined />)
];

const User: FC<IProps> = () => {
  const [currentRouter, setCurrent] = useState('interview'); // 设置初始值为home
  const location = useLocation();
  const dispatch = usedispatch();
  useEffect(() => {
    const path = location.pathname;
    setCurrent(path.split('/')[2]);
    setBread([path.split('/')[2]]);
    setuserinfo(jwtDecode(localStorage.getItem('ZXtoken') as string));
  }, [location]);
  const [collapsed, setCollapsed] = useState(false);
  const [userinfo, setuserinfo] = useState<userRoot>({
    iat: 23,
    id: 2,
    power: 'string',
    username: 'string'
  });
  const [items2, setItems2]: [any, any] = useState([
    {
      title: '管理界面'
    },
    {
      title: '用户'
    }
  ]);
  const allImg = [
    require('../../assets/img/bigLogo.jpg'),
    require('../../assets/img/logoIcon.jpg')
  ];
  const [logoImg, setlogoImg] = useState(0);
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  const [openConfirm, setopenConfirm] = useState(false);
  function setBread(keypath: Array<any>) {
    setItems2([{ title: '管理界面' }, { title: RouterToCH.get(keypath[0]) }]);
  }
  const navigate = useNavigate();
  const onClickRouter: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    setBread(e.keyPath);
    const toRouter = `${e.key}`;
    navigate(toRouter, { replace: false });
  };
  const maxLayStyle: CSSProperties = {
    minHeight: '100vh'
  };

  return (
    <Layout style={maxLayStyle}>
      <Modal
        title="退出登录"
        open={openConfirm}
        onOk={() => {
          dispatch(outlogin());
          navigate('/user/interview');
        }}
        onCancel={() => setopenConfirm(false)}
        okText="确认"
        cancelText="取消"
      >
        <p>你确认要退出登录吗？</p>
      </Modal>
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
          selectedKeys={[currentRouter]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, overflow: 'hidden' }}>
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
              height: 64,
              float: 'left'
            }}
          />
          <Breadcrumb style={{ margin: '20px 16px', float: 'left' }} items={items2}></Breadcrumb>
          <div style={{ padding: '0px 16px', float: 'right' }}>
            <Dropdown
              dropdownRender={() => (
                <Button
                  style={{ position: 'relative', top: '-12px', left: '12px' }}
                  onClick={() => setopenConfirm(true)}
                  type="primary"
                >
                  <LogoutOutlined />
                  退出登录
                </Button>
              )}
            >
              <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                <UserOutlined />
                &ensp;
                {userinfo.username}
                &ensp;
                <DownOutlined />
              </a>
            </Dropdown>
          </div>
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
