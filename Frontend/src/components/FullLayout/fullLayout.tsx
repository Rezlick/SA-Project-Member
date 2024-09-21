import React from "react";
import { Routes, Route } from "react-router-dom";
import "../../App.css";
import { Breadcrumb, Layout, theme, message } from "antd";
import Dashboard from "../Pages/dashboard/dashboard";
import Member from "../Pages/member/member";
import MemberCreate from "../Pages/member/create/createMember";
import MemberEdit from "../Pages/member/edit/editMember";
import Employee from "../Pages/Employee/employee";
import EmployeeCreate from "../Pages/Employee/create/createEmployee";
import EmployeeEdit from "../Pages/Employee/edit/editEmployee";
import ITSider from "../Sider/ITSider";
import ManagerSider from "../Sider/ManagerSider";
import CommonSider from "../Sider/sider";
import ProfileEdit from "../Pages/ProfileEdit/profileEdit";
import Payment from "../Pages/Payment/payment";
import ChangePassword from "../Pages/ProfileEdit/changePassword";

const {Content} = Layout;

const FullLayout: React.FC = () => {

  const [messageApi, contextHolder] = message.useMessage();

  const positionID = localStorage.getItem("positionID"); 
  let role = "";
  if (positionID === '1') {
    role = "IT"
  } else if (positionID === '2'){
    role = "Manager"
  } else {
    role = "Common"
  }

  const renderSider = () => {
    if (role === "IT") {
      return <ITSider />;
    } else if (role === "Manager") {
      return <ManagerSider />;
    } else {
      return <CommonSider />;
    }
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
    {contextHolder}
    <Layout style={{ minHeight: "100vh", maxHeight:"100vh"}}>
      {renderSider()}

      <Layout style={{backgroundColor:"#FEFFD2", minHeight: "100vh", maxHeight:"100vh"}}> 
        <Content style={{ margin: "0 30px" }}>
          <Breadcrumb style={{ margin: "16px 0" }} />
          <div
            style={{
              padding: 24,
              minHeight: "90%",
              maxHeight: "95%",
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/member" element={<Member />} />
              <Route path="/member/create" element={<MemberCreate />} />
              <Route path="/member/edit/:id" element={<MemberEdit />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/employee/create" element={<EmployeeCreate />} />
              <Route path="/employee/edit/:id" element={<EmployeeEdit />} />
              <Route path="/profileEdit" element={<ProfileEdit />} />
              <Route path="/changePassword" element={<ChangePassword />} />
              <Route path="/payment" element={<Payment />} />
            </Routes>
          </div>
        </Content>
      </Layout>

    </Layout>
  </>
  );
};

export default FullLayout;