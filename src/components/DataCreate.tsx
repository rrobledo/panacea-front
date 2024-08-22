import { useEffect, useState } from "react";
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

function DataCreate(props: any) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  let form = Form.useForm()[0];
  const dataSource = props.ds;
  let resourceParentParam = useLocation().state.resourceParent;
  const resourceParent =
    resourceParentParam != undefined ? `${resourceParentParam}/` : "";
  const defaultValues = props.defaultValues;

  if (props.form != undefined) {
    form = props.form;
  }

  const onsubmit = (values: any) => {
    setIsLoading(true);
    console.log(values);
    dataSource
      .post(`${resourceParentParam}${props.resource}`, values)
      .then((res: any) => {
        setIsLoading(false);
        navigate(-1);
      })
      .catch((error: any) => {
        console.log(error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (defaultValues != undefined) {
      form.setFieldsValue(defaultValues);
    }
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
              Crear
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default DataCreate;
