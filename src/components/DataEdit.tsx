import { Children, useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select, Spin } from "antd";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 15,
    },
    sm: {
      span: 15,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 15,
    },
  },
};

function DataEdit(props: any) {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const form = Form.useForm()[0];
  const dataSource = props.ds;
  const editable = props.editable != undefined ? props.editable : true;
  const attributesToConvertToDate: [] =
    props.attributesToConvertToDate != undefined
      ? props.attributesToConvertToDate
      : [];
  const imageAttributes: [] =
    props.imageAttributes != undefined ? props.imageAttributes : [];
  const resourceParent = useLocation().state.resourceParent;
  let submitButton = <></>;
  const [data, setData] = useState({});

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = (reader.result as string).split(",")[1]; // remove "data:image/png;base64,"
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });

  const onsubmit = async (values: any) => {
    attributesToConvertToDate.forEach((key) => {
      if (values[key] !== null) {
        values[key] = dayjs(values[key]).format("YYYY-MM-DD");
      }
    });

    for (const key of imageAttributes) {
      console.log(values[key]);
      if (values[key] !== null) {
        console.log(values[key]);
        values[key] = await toBase64(values[key]);
      }
    }

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
        setData(res.data);
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

  if (editable == true) {
    submitButton = (
      <Button type="primary" htmlType="submit">
        Actualizar
      </Button>
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
            {submitButton}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default DataEdit;
