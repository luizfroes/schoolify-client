import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import LoadingButton from "@mui/lab/LoadingButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import ErrorIcon from "@mui/icons-material/Error";

import { PageTitle } from "../PageTitle";
import { useAuth } from "../../context/AppProvider";
import { LOGIN_USER } from "../../graphql/mutations";
import { forms, item, GREEN } from "../../styles";

export const LoginForm = () => {
  const [executeLogin, { loading, error }] = useMutation(LOGIN_USER);

  const navigate = useNavigate();

  const { setIsLoggedIn, setUser } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const role = watch("role", "parent");

  const onSubmit = async (formData) => {
    const { data } = await executeLogin({
      variables: {
        input: formData,
      },
    });
    if (data?.login) {
      const { token, parent, teacher } = data.login;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(parent || teacher));

      setUser(teacher || parent);
      setIsLoggedIn(true);

      navigate("/dashboard", { replace: true });
    }
  };

  const roleOptions = [
    { value: "parent", title: "Parent" },
    { value: "teacher", title: "Teacher" },
  ];

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
      <PageTitle>
        {role === "parent" ? "Parent" : "Teacher"} Login Page
      </PageTitle>
      <Box sx={{ ...forms.container, backgroundColor: GREEN }}>
        <FormControl sx={{ mt: 2 }} fullWidth>
          <InputLabel id="role" color="warning">
            Role
          </InputLabel>
          <Select
            color="warning"
            defaultValue={"parent"}
            labelId="role"
            id="role"
            label="role"
            {...register("role")}
            autoFocus
            disabled={loading}
          >
            {roleOptions.map((role, index) => (
              <MenuItem key={index} value={role.value}>
                {role.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          color="warning"
          margin="normal"
          id="email"
          label="Email"
          variant="outlined"
          name="email"
          autoFocus
          fullWidth
          disabled={loading}
          {...register("email", { required: true })}
          error={!!errors.email}
        />
        <TextField
          margin="normal"
          color="warning"
          id="password"
          label="Password"
          variant="outlined"
          name="password"
          type="password"
          fullWidth
          disabled={loading}
          {...register("password", { required: true })}
          error={!!errors.password}
        />
        <LoadingButton
          loading={loading}
          disabled={loading}
          type="submit"
          variant="contained"
          sx={item.actionButtons}
          startIcon={error && <ErrorIcon />}
          color={error ? "error" : "warning"}
        >
          Login
        </LoadingButton>
        <Link
          component={RouterLink}
          variant="body2"
          to={`/sign-up/${role}`}
          underline="none"
          color="warning.dark"
        >
          Don't have an account? Sign up as a {role}
        </Link>
        {!!error && (
          <Typography
            variant="subtitle2"
            gutterBottom
            component="div"
            sx={forms.errorContainer}
          >
            Failed to login, please enter a valid email address or password.
          </Typography>
        )}
      </Box>
    </Stack>
  );
};
