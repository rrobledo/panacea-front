import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Form, Button, Row, Col} from 'antd';
import dayjs from 'dayjs';

export interface GenericFilterRef {
  getFilterValues: () => any;
  resetFilter: () => void;
  setFilterValues: (values: any) => void;
}

interface GenericFilterProps {
  children?: React.ReactNode;
  attributesToConvertToDate?: string[];
  onRefreshList?: () => void;
}

const GenericFilter = forwardRef<GenericFilterRef, GenericFilterProps>(
  ({ children, attributesToConvertToDate = [], onRefreshList }, ref) => {
    const [form] = Form.useForm();
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useImperativeHandle(ref, () => ({
      getFilterValues: () => {
        let values = form.getFieldsValue();
        attributesToConvertToDate?.forEach((key) => {
          if (values[key] !== null && values[key] !== undefined) {
            values[key] = dayjs(values[key]).format("YYYY-MM-DD");
          }
        });
        return values;
      },
      resetFilter: () => {
        form.resetFields();
        form.setFieldsValue({
          fecha_desde: dayjs()
        });
      },
      setFilterValues: (values: any) => {
        form.setFieldsValue(values);
      }
    }));

    const handleFormChange = () => {
      setRefreshTrigger(prev => prev + 1);
    };

    return (
      <Form
        form={form}
        variant="filled"
        style={{
          maxWidth: "100%",
        }}
        labelAlign="left"
        onValuesChange={handleFormChange}
      >
        <Row>
          {children}
          <Col span={1}></Col>
          <Col span={4}>
            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
              style={{textAlign: 'left' }}
            >
              <Button 
                type="primary" 
                onClick={onRefreshList}
                style={{ marginRight: 8 }}
              >
                Aplicar Filtros
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form> 
    );
  }
);

GenericFilter.displayName = 'GenericFilter';

export default GenericFilter;
