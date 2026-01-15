import { useEffect, useState } from "react";
import { Button, Form, Spin, Result, Alert, Space } from "antd";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ReloadOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { toast } from "../utils/notification";

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
  const [isSaving, setIsSaving] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const form = Form.useForm()[0];
  const dataSource = props.ds;
  const editable = props.editable !== undefined ? props.editable : true;
  const attributesToConvertToDate: [] =
    props.attributesToConvertToDate !== undefined
      ? props.attributesToConvertToDate
      : [];
  const imageAttributes: [] =
    props.imageAttributes !== undefined ? props.imageAttributes : [];
  const resourceParent = useLocation().state.resourceParent;

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
    setSaveError(null);

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

    setIsSaving(true);
    dataSource
      .patch(`${resourceParent}${props.resource}`, params.id, values)
      .then(() => {
        toast.success("Registro actualizado correctamente");
        setIsFormDirty(false);
        navigate(-1);
      })
      .catch((err: any) => {
        setSaveError(err.message || "Error al guardar los cambios");
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const getItem = () => {
    setIsLoading(true);
    setError(null);

    dataSource
      .get(`${resourceParent}${props.resource}`, params.id)
      .then((res: any) => {
        form.setFieldsValue(res.data);
        setError(null);
        setIsFormDirty(false);
      })
      .catch((err: any) => {
        setError(err.message || "Error al cargar el registro");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleValuesChange = () => {
    setIsFormDirty(true);
  };

  const handleCancel = () => {
    if (isFormDirty) {
      if (window.confirm("Hay cambios sin guardar. ¿Desea salir de todas formas?")) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin tip="Cargando..." size="large" />
      </div>
    );
  }

  // Error state - failed to load
  if (error) {
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
        <Result
          status="error"
          title="Error al cargar el registro"
          subTitle={error}
          extra={[
            <Button key="back" onClick={() => navigate(-1)}>
              Volver
            </Button>,
            <Button
              key="retry"
              type="primary"
              icon={<ReloadOutlined />}
              onClick={getItem}
            >
              Reintentar
            </Button>,
          ]}
        />
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
        <a onClick={handleCancel}> &lt;&lt; Atras </a>
        {editable && (
          <Space>
            <Button
              icon={<CloseOutlined />}
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancelar
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={() => form.submit()}
              loading={isSaving}
              disabled={!isFormDirty}
            >
              {isFormDirty ? "Actualizar" : "Sin cambios"}
            </Button>
          </Space>
        )}
      </div>

      {/* Show save error alert */}
      {saveError && (
        <Alert
          message="Error al guardar"
          description={saveError}
          type="error"
          showIcon
          closable
          onClose={() => setSaveError(null)}
          style={{ marginBottom: 16 }}
        />
      )}

      {/* Show dirty indicator */}
      {isFormDirty && (
        <Alert
          message="Hay cambios sin guardar"
          type="warning"
          showIcon
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
          onValuesChange={handleValuesChange}
          form={form}
          labelAlign="left"
        >
          {props.children}
        </Form>
      </div>
    </div>
  );
}

export default DataEdit;
