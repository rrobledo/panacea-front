import { useShow, IResourceComponentsProps } from "@refinedev/core";
import {
  Show,
  TextFieldComponent as TextField,
  UrlField,
  NumberField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const CostShow: React.FC<IResourceComponentsProps> = () => {
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
          Revenue
        </Typography>
        <NumberField value={record?.revenue ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Current Price
        </Typography>
        <NumberField value={record?.current_price ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Units
        </Typography>
        <NumberField value={record?.units ?? ""} />
      </Stack>
    </Show>
  );
};
