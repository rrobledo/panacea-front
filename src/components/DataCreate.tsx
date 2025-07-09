import { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select, Spin } from "antd";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";

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
  const attributesToConvertToDate: [] =
    props.attributesToConvertToDate != undefined
      ? props.attributesToConvertToDate
      : [];

  if (props.form != undefined) {
    form = props.form;
  }

  const onsubmit = (values: any) => {
    attributesToConvertToDate.forEach((key) => {
      if (values[key] !== null) {
        values[key] = dayjs(values[key]).format("YYYY-MM-DD");
      }
    });
    setIsLoading(true);
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
        width: "100%",
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
            maxWidth: "100%",
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
