import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, theme, Avatar, List, Spin } from "antd";
import { Link } from "react-router-dom";
import data from "./data";

const { Header, Sider, Content } = Layout;

export default function Lists() {
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/photos?_page=1&_limit=8`)
      .then((response) => response.json())
      .then((json) => {
        setPhotos(json);
        setLoading(false);
      });
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
          {photos.map((el, id) => {
            return (
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                        />
                      }
                      title={<a href="https://ant.design">{item.title}</a>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                  </List.Item>
                )}
              />
            );
          })}
        </Content>
      </Layout>
    </Layout>
  );
}
