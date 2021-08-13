import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  useAuthDispatch,
  useAuthState,
} from '../../context/AuthContext/AuthContext'
import { Alert, Button, Fieldset, Form } from '@trussworks/react-uswds'

import { LoginInfo } from '../../context/UserContext/UserContext'
import { Formik } from 'formik'
import TextFormGroup from 'components/FormInputs/TextFormGroup/TextFormGroup'
import PasswordFormGroup from 'components/FormInputs/PasswordFormGroup/PasswordFormGroup'

const LoginForm: React.FC<any> = ({
  handleSubmit,
  authError,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}) => (
  <Form onSubmit={handleSubmit} large>
    <Fieldset legend="Login" legendStyle="large">
      <span>
        or <a href="/account/create">create an account</a>
      </span>
      {authError && (
        <Alert
          type="error"
          heading="Error status"
          data-testid="login-error"
          slim
          noIcon
        >
          {authError}
        </Alert>
      )}
      <TextFormGroup
        fieldName="username"
        label="Username"
        values={values}
        errors={errors}
        touched={touched}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
      <PasswordFormGroup
        fieldName="password"
        label="Password"
        values={values}
        errors={errors}
        touched={touched}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />

      <Button type="submit">Login</Button>
      <p>
        <a href="/account/username" title="Forgot username">
          Forgot username?
        </a>
      </p>
      <p>
        <a href="/account/password" title="Forgot password">
          Forgot password?
        </a>
      </p>
    </Fieldset>
  </Form>
)

const Login: React.FC<{}> = () => {
  const { error: authError, status } = useAuthState()
  const authActions = useAuthDispatch()
  const history = useHistory()

  useEffect(() => {
    // Redirect to home on successful login
    if (status === 'authenticated') {
      history.push('/')
    }
  }, [status, history])

  const handleLogin = (values: LoginInfo) => {
    authActions({
      type: 'login',
      payload: { ...values },
    })
  }

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={(values, { setSubmitting }) => {
        handleLogin(values)
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))

          setSubmitting(false)
        }, 400)
      }}
    >
      {(formikParms) => <LoginForm {...formikParms} authError={authError} />}
    </Formik>
  )
}

export default Login
