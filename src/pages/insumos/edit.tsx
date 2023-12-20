import { Edit } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps } from "@refinedev/core";

export const InsumosEdit: React.FC<IResourceComponentsProps> = () => {
  const {
    saveButtonProps,
    refineCore: { queryResult },
    register,
    control,
    formState: { errors },
  } = useForm();

  const suppliesData = queryResult?.data?.data;

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
          label="Codigo"
          name="code"
          disabled
        />
        <TextField
          {...register("name", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.name}
          helperText={(errors as any)?.name?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Nombre"
          name="name"
        />
        <TextField
          {...register("measure", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.measure}
          helperText={(errors as any)?.measure?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Capacidad"
          name="measure"
        />
        <TextField
          {...register("price", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.price}
          helperText={(errors as any)?.price?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Precio"
          name="price"
        />
      </Box>
    </Edit>
  );
};
