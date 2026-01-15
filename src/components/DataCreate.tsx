import { useEffect, useState } from "react";
import { Button, Form, Spin, Alert, Space } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { toast } from "../utils/notification";

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
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  let form = Form.useForm()[0];
  const dataSource = props.ds;
  const resourceParentParam = useLocation().state.resourceParent;
  const defaultValues = props.defaultValues;
  const attributesToConvertToDate: [] =
    props.attributesToConvertToDate !== undefined
      ? props.attributesToConvertToDate
      : [];
  const imageAttributes: [] =
    props.imageAttributes !== undefined ? props.imageAttributes : [];

  if (props.form !== undefined) {
    form = props.form;
  }

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = (reader.result as string).split(",")[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });

  const onsubmit = async (values: any) => {
    setError(null);

    attributesToConvertToDate.forEach((key) => {
      if (values[key] !== null && values[key] !== undefined) {
        values[key] = dayjs(values[key]).format("YYYY-MM-DD");
      }
    });

    for (const key of imageAttributes) {
      if (values[key] !== null && values[key] !== undefined) {
        values[key] = await toBase64(values[key]);
      }
    }

    setIsLoading(true);
    dataSource
      .post(`${resourceParentParam}${props.resource}`, values)
      .then(() => {
        toast.success("Registro creado correctamente");
        navigate(-1);
      })
      .catch((err: any) => {
        setError(err.message || "Error al crear el registro");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (defaultValues !== undefined) {
      form.setFieldsValue(defaultValues);
    }
  }, []);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin tip="Guardando..." size="large" />
      </div>
    );
  }

  return (
    <div
      style={{
        textAlign: "left",
        width: "100%",
      }}
    >
      {/* Header with back link and action buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <a onClick={() => navigate(-1)}> &lt;&lt; Atras </a>
        <Space>
          <Button
            icon={<CloseOutlined />}
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => form.submit()}
            loading={isLoading}
          >
            Crear
          </Button>
        </Space>
      </div>

      {/* Show error alert */}
      {error && (
        <Alert
          message="Error al crear"
          description={error}
          type="error"
          showIcon
          closable
          onClose={() => setError(null)}
          style={{ marginBottom: 16 }}
        />
      )}

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
        </Form>
      </div>
    </div>
  );
}

export default DataCreate;
