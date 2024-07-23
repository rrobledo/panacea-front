import { Children, useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select, Spin } from "antd";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

function DataEdit(props: any) {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const form = Form.useForm()[0];
  const dataSource = props.ds;
  const resourceParent = useLocation().state.resourceParent;

  const onsubmit = (values: any) => {
    setIsLoading(true);
    dataSource
      .patch(`${resourceParent}${props.resource}`, params.id, values)
      .then((res: any) => {
        setIsLoading(false);
        navigate(-1);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const getItem = () => {
    dataSource
      .get(`${resourceParent}${props.resource}`, params.id)
      .then((res: any) => {
        setIsLoading(false);
        form.setFieldsValue(res.data);
      });
  };

  useEffect(() => {
    getItem();
  }, []);

  if (isLoading) {
    return (
      <>
        <Spin tip="Loading" size="large"></Spin>
      </>
    );
  }

  return (
    <div
      style={{
        textAlign: "left",
      }}
    >
      <div>
        <a onClick={() => navigate(-1)}> &lt;&lt; Atras </a>
      </div>
      <div>
        <Form
          {...formItemLayout}
          variant="filled"
          style={{
            maxWidth: 600,
          }}
          onFinish={onsubmit}
          form={form}
          labelAlign="left"
        >
          {props.children}
          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 16,
            }}
          >
            <Button onClick={() => navigate(-1)}>Cancelar</Button>
            <Button type="primary" htmlType="submit">
              Actualizar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default DataEdit;
