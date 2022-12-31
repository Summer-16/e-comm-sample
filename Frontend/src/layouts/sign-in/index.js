
import { useState } from "react";
import Box from "../../components/Box";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Typography from "../../components/Typography";
import Layout from "./layout";
import { apis, request } from "../../httpUtil";
import { setCookie } from "../../httpUtil/cookieHelper";
import { useNavigate } from 'react-router-dom';

const bgImage = `http://m.gettywallpapers.com/wp-content/uploads/2021/12/Gradient-Wallpaper.jpeg`;

function Illustration() {

  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [formError, setFormError] = useState({});

  const handleChange = (event) => {
    if (event) event.persist();
    setForm((form) => ({ ...form, [event.target.name]: event.target.value }));
    setFormError((formError) => ({ ...formError, [event.target.name]: "" }));
  };

  const validate = (value) => {
    const error = {};
    if (!value.username) {
      error.username = "Username Missing";
    }
    if (!value.password) {
      error.password = "Password Missing";
    }
    return error;
  }

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    const validateResult = validate(form);
    if (Object.keys(validateResult).length) {
      setFormError(validateResult);
      return;
    }

    request('POST', apis.login, form)
      .then((result) => {
        if (result.success) {
          setCookie(result.data);
          navigate('Dashboard');
        }
      })
      .catch((err) => {
        console.error("error in login=>", err)
      })

  };

  return (
    <Layout
      title="Sign In"
      description="Enter your email and password to sign in"
      illustration={{
        image: bgImage,
        title: '"Sample created by Shivam Parashar"',
        description: "https://github.com/Summer-16",
      }} >
      <Box component="form" role="form">
        <Box mb={2}>
          <Input type="email" name="username" placeholder="Username" size="large" value={form.username} onChange={handleChange} />
          {formError.username && <Typography variant="caption" color="error" fontWeight="small">{formError.username}</Typography>}
        </Box>
        <Box mb={2}>
          <Input type="password" name="password" placeholder="Password" size="large" value={form.password} onChange={handleChange} />
          {formError.password && <Typography variant="caption" color="error" fontWeight="small">{formError.password}</Typography>}
        </Box>
        <Box mt={4} mb={1}>
          <Button color="info" size="large" fullWidth onClick={handleSubmit}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}

export default Illustration;
