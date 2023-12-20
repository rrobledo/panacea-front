import { Edit } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps } from "@refinedev/core";

export const CostEdit: React.FC<IResourceComponentsProps> = () => {
  const {
    saveButtonProps,
    refineCore: { queryResult },
    register,
    control,
    formState: { errors },
  } = useForm();

  const costsData = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("id", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.id}
          helperText={(errors as any)?.id?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Id"
          name="id"
          disabled
        />
        <TextField
          {...register("code", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.code}
          helperText={(errors as any)?.code?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Code"
          name="code"
        />
        <TextField
          {...register("revenue", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.revenue}
          helperText={(errors as any)?.revenue?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Revenue"
          name="revenue"
        />
        <TextField
          {...register("current_price", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.current_price}
          helperText={(errors as any)?.current_price?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Current Price"
          name="current_price"
        />
        <TextField
          {...register("units", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.units}
          helperText={(errors as any)?.units?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Units"
          name="units"
        />
      </Box>
    </Edit>
  );
};
