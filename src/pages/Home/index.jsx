import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, theme, Card, Avatar, Spin } from "antd";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users?_page=1&_limit=8`)
      .then((response) => response.json())
      .then((json) => {
        setPhotos(json);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              label: <Link to="/">Users</Link>,
            },
            {
              key: "2",
              label: <Link to="/login">Login</Link>,
            },
            {
              key: "3",
              label: <Link to="/list">List</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          className="grid grid-cols-2"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {loading && (
            <div className="text-center">
              <Spin />
            </div>
          )}
          {photos.map((item, id) => {
            return (
              <Card className="text-center border-2 border-black">
                <Avatar
                  src={item.thumbnailUrl}
                  shape="square"
                  size={64}
                />
                <br />
                <b>{item.title}</b>
              </Card>
            );
          })}
        </Content>
      </Layout>
    </Layout>
  );
}
