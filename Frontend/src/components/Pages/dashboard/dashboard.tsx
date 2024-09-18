import { Col, Row, Card, Statistic, Table, message, Form, Select } from "antd";
import {
  AuditOutlined,
  UserOutlined,
  PieChartOutlined,
  StockOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { GetMemberCountForCurrentMonth, GetMemberCountForMonth } from "../../../services/https";
import { useEffect, useState } from "react";

interface DataType {
  MemberCountForMonth: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "จำนวนการสมัครสมาชิก",
    dataIndex: "MemberCountForMonth",
    key: "MemberCountForMonth",
  },
];

export default function Dashboard() {
  const [data, setData] = useState<DataType[]>([]);

  const [memberCountForCurrentMonth, setMemberCountForCurrentMonth] = useState<number>(0);
  const [memberCountForMonth, setMemberCountForMonth] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const currentMonth = new Intl.DateTimeFormat('th-TH', { month: 'long' }).format(new Date());
  const currentYear = new Date().getFullYear();

  const yearOptions = [];
  for (let i = 0; i <= 2; i++) {
    yearOptions.push({ value: currentYear - i, label: (currentYear - i).toString() });
  }

  const handleMonthChange = (value: any, option: any) => {
    setSelectedMonth(value);
  };

  const handleYearChange = (value: any, option: any) => {
    setSelectedYear(option.label);
  };

  const getMemberCountForCurrentMonth = async () => {
    try {
        const res = await GetMemberCountForCurrentMonth();
        if (res.status === 200) {
            setMemberCountForCurrentMonth(res.data.memberCount || 0);
        } else {
            message.error(res.data.error || "ไม่สามารถดึงข้อมูลได้");
        }
    } catch (error) {
        message.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
  };


  const getMemberCountForMonth = async (month: number, year: number) => {
    try {
      // Ensure month is in "MM" format
      const formattedMonth = month.toString().padStart(2, '0');
      
      const res = await GetMemberCountForMonth(formattedMonth, year.toString());
      
      if (res.status === 200) {
        setMemberCountForMonth(res.data.memberCount || 0);
        setData([{ MemberCountForMonth: res.data.memberCount || 0 }]);
      } else {
        message.error(res.data.error || "ไม่สามารถดึงข้อมูลได้");
      }
    } catch (error) {
      message.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
  };

  useEffect(() => {
    getMemberCountForCurrentMonth(); 
  }, []);

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      getMemberCountForMonth(selectedMonth, selectedYear);
    }
  }, [selectedMonth, selectedYear]);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <h2>แดชบอร์ด</h2>
          <h3>สถิติ ณ เดือน {currentMonth}</h3>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card style={{ backgroundColor: "#F5F5F5" }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                <Card
                  bordered={false}
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <Statistic
                    title="จำนวน"
                    value={1800}
                    prefix={<StockOutlined />}
                  />
                </Card>
              </Col>

              <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                <Card
                  bordered={false}
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <Statistic
                    title="จำนวน"
                    value={200}
                    valueStyle={{ color: "black" }}
                    prefix={<AuditOutlined />}
                  />
                </Card>
              </Col>

              <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                <Card
                  bordered={false}
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <Statistic
                    title="จำนวน"
                    value={3000}
                    valueStyle={{ color: "black" }}
                    prefix={<PieChartOutlined />}
                  />
                </Card>
              </Col>

              <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                <Card
                  bordered={false}
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <Statistic
                    title="จำนวนการสมัครสมาชิก"
                    value={memberCountForCurrentMonth}
                    valueStyle={{ color: "black" }}
                    prefix={<UserOutlined />}
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <h3>สถิติในเดือน {selectedMonth ? `${selectedMonth}` : '...'} ปี {selectedYear ? `${selectedYear}` : '...'}</h3>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <Form.Item
            name="MonthID"
            rules={[{ required: true, message: "กรุณาเลือกเดือน!" }]}
          >
            <Select
              placeholder="กรุณาเลือกเดือน"
              style={{ width: "100%" }}
              options={[
                { value: 1, label: "มกราคม" },
                { value: 2, label: "กุมภาพันธ์" },
                { value: 3, label: "มีนาคม" },
                { value: 4, label: "เมษายน" },
                { value: 5, label: "พฤษภาคม" },
                { value: 6, label: "มิถุนายน" },
                { value: 7, label: "กรกฎาคม" },
                { value: 8, label: "สิงหาคม" },
                { value: 9, label: "กันยายน" },
                { value: 10, label: "ตุลาคม" },
                { value: 11, label: "พฤศจิกายน" },
                { value: 12, label: "ธันวาคม" },
              ]}
              onChange={handleMonthChange}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <Form.Item
            name="YearID"
            rules={[{ required: true, message: "กรุณาเลือกปี!" }]}
          >
            <Select
              placeholder="กรุณาเลือกปี"
              style={{ width: "100%" }}
              options={yearOptions}
              onChange={handleYearChange}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Table  
            columns={columns} 
            dataSource={data} 
          />
        </Col>
      </Row>
    </>
  );
}
