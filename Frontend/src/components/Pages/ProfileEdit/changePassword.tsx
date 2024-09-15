import { useEffect, useState } from "react";
import {
  Space,
  Button,
  Col,
  Row,
  Divider,
  Form,
  Input,
  Card,
  message,
  Select,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { EmployeeInterface } from "../../../interfaces/Employee";
import { GenderInterface } from "../../../interfaces/Gender";
import { GetEmployeeByID, UpdateEmployee } from "../../../services/https";
import { useNavigate, Link } from "react-router-dom";

function ChangePassword() {
  const navigate = useNavigate();
  const id = localStorage.getItem("id")
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();


  const getUserById = async (id: string) => {
    let res = await GetEmployeeByID(id);
    if (res.status === 200) {
      form.setFieldsValue({
        FirstName: res.data.FirstName,
        LastName: res.data.LastName,
        Email: res.data.Email,
        GenderID: res.data.GenderID,
        PositionID: res.data.PositionID,
      });
    } else {
      messageApi.open({
        type: "error",
        content: "ไม่พบข้อมูลผู้ใช้",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  const onFinish = async (values: EmployeeInterface) => {
    const res = await UpdateEmployee(id || "", values);
    if (res.status === 200) {
      messageApi.open({
        type: "success",
        content: res.data.message,
      });
      setTimeout(() => {
        navigate("/employee");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };

  useEffect(() => {
    if (id) {
      getUserById(id);
    }

  }, [id]);

  return (
    <div>
      {contextHolder}
      <Card>
        <h2>เปลี่ยนรหัสผ่าน</h2>
        <Divider />
        <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 0]}>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
                    label="รหัสผ่านใหม่"
                    name="NewPassword"
                    rules={[
                    {
                        required: true,
                        message: "กรุณากรอกรหัสผ่านใหม่ !",
                    },
                    ]}
                >
                <Input.Password />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
                    label="ยืนยันรหัสผ่านใหม่"
                    name="ConfirmPassword"
                    rules={[
                    {
                        required: true,
                        message: "กรุณายืนยันรหัสผ่านใหม่ !",
                    },
                    ]}
                >
                <Input.Password />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="รหัสผ่านเดิม"
                name="OldPassword"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกรหัสผ่านเดิม !",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center">
            <Col style={{ marginTop: "40px" }}>
              <Form.Item>
                <Space>
                  <Link to="/profileEdit">
                    <Button htmlType="button" style={{ marginRight: "10px" }}>
                      ยกเลิก
                    </Button>
                  </Link>

                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{backgroundColor:"#FF7D29"}}
                  >
                    บันทึก
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}

export default ChangePassword;