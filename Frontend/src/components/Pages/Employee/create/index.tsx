import React, { useState, useEffect } from "react";
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
} from "antd";

import { EmployeeInterface } from "../../../../interfaces/Employee";
import { CreateEmployee, GetPositions, GetGenders } from "../../../../services/https";
import { useNavigate, Link } from "react-router-dom";
import { GenderInterface } from "../../../../interfaces/Gender";
import { PositionInterface } from "../../../../interfaces/Position";

function EmployeeCreate() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [positions, setPositions] = useState<PositionInterface[]>([]);
  const [genders, setGenders] = useState<GenderInterface[]>([]);

  const onFinish = async (values: EmployeeInterface) => {
    const res = await CreateEmployee(values);

    if (res.status === 201) {
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

  const getGenders = async () => {
    try {
      const res = await GetGenders(); // Fetch data from the API

      if (res.status === 200) {
        setGenders(res.data); // Set the data from the API response
      } else {
        setGenders([]);
        messageApi.error(res.data.error || "ไม่สามารถดึงข้อมูลได้");
      }
    } catch (error) {
      setGenders([]);
      messageApi.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
  };

  const getPositions = async () => {
    try {
      const res = await GetPositions(); // Fetch data from the API

      if (res.status === 200) {
        setPositions(res.data); // Set the data from the API response
      } else {
        setPositions([]);
        messageApi.error(res.data.error || "ไม่สามารถดึงข้อมูลได้");
      }
    } catch (error) {
      setPositions([]);
      messageApi.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
  };

  useEffect(() => {
    getGenders();
    getPositions();
  }, []);

  return (
    <div>
      {contextHolder}
      <Card>
        <h2>ลงทะเบียนพนักงาน</h2>
        <Divider />
        <Form name="basic" layout="vertical" onFinish={onFinish} autoComplete="off">
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ชื่อจริง"
                name="FirstName"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อ!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="นามสกุล"
                name="LastName"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกนามสกุล!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="อีเมล"
                name="Email"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกอีเมล!",
                  },
                ]}
              >
                <Input/>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="รหัสผ่าน"
                name="Password"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกกรอกรหัสผ่าน!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="เพศ"
                name="GenderID"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกเพศ!",
                  },
                ]}
              >
                <Select
                  placeholder="กรุณาเลือกเพศ"
                  style={{ width: "100%" }}
                  options={genders.map((gender) => ({
                    value: gender.ID,
                    label: gender.Name, 
                  }))}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ตำแหน่ง"
                name="PositionID"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกตำแหน่ง!",
                  },
                ]}
              >
                <Select
                  placeholder="เลือกตำแหน่ง"
                  style={{ width: "100%" }}
                  options={positions.map((position) => ({
                    value: position.ID,
                    label: position.Name, 
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center">
            <Col style={{ marginTop: "40px" }}>
              <Form.Item>
                <Space>
                  <Link to="/employee">
                    <Button htmlType="button" style={{ marginRight: "10px" }}>
                      ยกเลิก
                    </Button>
                  </Link>

                  <Button type="primary" htmlType="submit" style={{backgroundColor:"#FF7D29"}}>
                    ยืนยัน
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

export default EmployeeCreate;
