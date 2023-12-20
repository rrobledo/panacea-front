import { useShow, IResourceComponentsProps } from "@refinedev/core";
import {
  Show,
  TextFieldComponent as TextField,
  NumberField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const InsumosShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Id
        </Typography>
        <TextField value={record?.id} />
        <Typography variant="body1" fontWeight="bold">
          Code
        </Typography>
        <TextField value={record?.code} />
        <Typography variant="body1" fontWeight="bold">
          Name
        </Typography>
        <TextField value={record?.name} />
        <Typography variant="body1" fontWeight="bold">
          Measure
        </Typography>
        <NumberField value={record?.measure ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Price
        </Typography>
        <NumberField value={record?.price ?? ""} />
      </Stack>
    </Show>
  );
};
