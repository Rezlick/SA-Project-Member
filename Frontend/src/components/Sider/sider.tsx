import { useState, useEffect } from "react";
import { Layout, Menu, message, Button } from "antd";
import logo from "../../assets/logo.png";
import {
  UserOutlined,
  DashboardOutlined,
  LogoutOutlined,
  DollarOutlined,
  AppstoreOutlined,
  SolutionOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { GetPositions } from "../../services/https";
import { PositionInterface } from "../../interfaces/Position";

function Sider() {
  const page = localStorage.getItem("page");
  const { Sider } = Layout;
  const [messageApi, contextHolder] = message.useMessage();
  const [collapsed, setCollapsed] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [positionName, setPositionName] = useState("");
  const positionID = localStorage.getItem("positionID");

  // Function to fetch positions and set the appropriate position name
  const getPositions = async () => {
    try {
      const res = await GetPositions(); // Fetch data from the API

      if (res.status === 200) {
        const positions: PositionInterface[] = res.data;
        const position = positions.find(pos => pos.ID === parseInt(positionID || ""));
        setPositionName( position.Name );
      } else {
        setPositionName("Unknown Position");
        messageApi.error(res.data.error || "ไม่สามารถดึงข้อมูลได้");
      }
    } catch (error) {
      setPositionName("Unknown Position");
      messageApi.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
  };

  useEffect(() => {
    setFirstName(localStorage.getItem("firstName") || "");
    setLastName(localStorage.getItem("lastName") || "");
    getPositions();
  }, []);

  const setCurrentPage = (val: string) => {
    localStorage.setItem("page", val);
  };

  const Logout = () => {
    localStorage.clear();
    messageApi.success("Logout successful");
    setTimeout(() => {
      location.href = "/login";
    }, 2000);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      {contextHolder}
      <Sider collapsed={collapsed}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div style={{ position: "relative" }}>
            <Button
              onClick={toggleCollapsed}
              style={{
                position: "absolute",
                top: 0,
                right: -46,
                zIndex: 1,
              }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 50,
                marginBottom: 20,
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{
                  objectFit: "cover",
                  width: collapsed ? "50px" : "100px",
                  height: collapsed ? "50px" : "100px",
                  borderRadius: "50%",
                  transition: "width 0.3s ease, height 0.3s ease",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginTop: 20,
                marginBottom: 20,
                overflowWrap: "break-word",
                textAlign: "center",
              }}
            >
              <span style={{ color: "white" }}>{firstName} {lastName}</span>
              <span style={{ fontSize: "smaller", color: "white" }}>({positionName})</span>
            </div>

            <Menu
              style={{ backgroundColor: "#FF7D29" }}
              defaultSelectedKeys={[page ? page : "dashboard"]}
              mode="inline"
              inlineCollapsed={collapsed}
            >
              <Menu.Item
                key="dashboard"
                onClick={() => setCurrentPage("dashboard")}
              >
                <Link to="/">
                  <DashboardOutlined />
                  <span>แดชบอร์ด</span>
                </Link>
              </Menu.Item>

              <Menu.Item key="member" onClick={() => setCurrentPage("member")}>
                <Link to="/member">
                  <UserOutlined />
                  <span>สมาชิก</span>
                </Link>
              </Menu.Item>

              <Menu.Item key="table" onClick={() => setCurrentPage("table")}>
                <Link to="/">
                  <SolutionOutlined />
                  <span>จองโต๊ะ</span>
                </Link>
              </Menu.Item>

              <Menu.Item key="payment" onClick={() => setCurrentPage("payment")}>
                <Link to="/">
                  <DollarOutlined />
                  <span>ชำระเงิน</span>
                </Link>
              </Menu.Item>

              <Menu.Item key="stock" onClick={() => setCurrentPage("stock")}>
                <Link to="/">
                  <AppstoreOutlined />
                  <span>จัดการข้อมูลสินค้า</span>
                </Link>
              </Menu.Item>

              <Menu.Item
                key="employee"
                onClick={() => setCurrentPage("employee")}
              >
                <Link to="/employee">
                  <TeamOutlined />
                  <span>พนักงาน</span>
                </Link>
              </Menu.Item>
            </Menu>
          </div>

          <Menu style={{ backgroundColor: "#FF7D29" }} mode="inline">
            <Menu.Item key="logout" onClick={Logout}>
              <LogoutOutlined />
              <span>ออกจากระบบ</span>
            </Menu.Item>
          </Menu>
        </div>
      </Sider>
    </>
  );
}

export default Sider;
