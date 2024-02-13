import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { signIn } from '../../../helpers/loginHelper';
import useAuthContext from '../../../context/AuthContext';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [errors, setErrors] = useState({});

  const { login, setOrganisations } = useAuthContext();

  const validateMobile = () => {};

  const handleClick = (e) => {
    e.preventDefault();
    setErrors({});
    if (!mobile || !password) {
      setErrors({ ...errors, mobile: 'Please enter a valid Mobile Number', pin: 'Please enter a valid Pin' });
      return;
    }
    signIn(mobile, password)
      .then((res) => {
        if (!res.error) {
          login(res.data);
          setOrganisations(res.data.organisations);
          navigate('/dashboard/app', { replace: true });
        }
      })
      .catch((res) => {
        console.log(res);
      });

    // navigate('/dashboard/app', { replace: true });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="mobile"
          label="Mobile No."
          placeholder="+91"
          type="text"
          value={mobile}
          onChange={(e) => {
            if (/^\d*$/.test(e.target.value)) setMobile(e.target.value.substring(0, 10));
          }}
          autoFocus
          {...(errors.mobile && {
            error: true,
            helperText: errors.mobile,
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {mobile ? (
                  <Iconify icon="ic:baseline-cancel" style={{ cursor: 'pointer' }} onClick={() => setMobile('')} />
                ) : null}
              </InputAdornment>
            ),
          }}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          {...(errors.pin && {
            error: true,
            helperText: errors.pin,
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Stack>

      {/*
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Checkbox name="remember" label="Remember me" />
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>
        */}

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick} sx={{ my: 3 }}>
        Login
      </LoadingButton>
      
    </>
  );
}
