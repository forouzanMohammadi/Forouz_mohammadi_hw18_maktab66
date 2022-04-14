import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import { Container, Row, Col } from 'react-bootstrap'
import WithLogin from '../WithLogin'
import axios from 'axios'

const Login = (setUser, setIslogin) => {
  const [passwordShown, setPasswordShown] = useState(false)
  const [infoUsers, setInfoUsers] = useState('')

  // const logSub = (e) => {
  //   e.preventDefault()
  // }

  useEffect(() => {
    axios
      .get('http://localhost:4000/users')
      .then((response) => setInfoUsers(response.data))
      .catch((error) => {})
  }, [])

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true)
  }

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center">
          <p className="par">خوش آمدید</p>
        </Col>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              infoUsers.map((item) => {
                if (
                  values.email === item.email &&
                  values.password === item.password
                ) {
                  setUser(item)
                  setIslogin(true)
                }
              })
              setSubmitting(false)
            }, 1000)
          }}
        >
          {({ isSubmitting }) => (
            <form>
              {passwordShown ? (
                <i onClick={togglePasswordVisiblity} className="bi bi-eye "></i>
              ) : (
                <i
                  onClick={togglePasswordVisiblity}
                  className="bi bi-eye-slash"
                ></i>
              )}
              <input
                required
                name="email"
                type="email"
                placeholder="پست الکترونیک"
                className="mt-4"
              />
              <input
                required
                name="password"
                type={passwordShown ? 'text' : 'password'}
                placeholder="کلمه عبور"
                className="mt-4"
              />
              <button
                type="submit"
                className="mt-5 subLog"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'لطفا صیر کنید...' : 'ورود'}
              </button>
            </form>
          )}
        </Formik>
      </Row>
    </Container>
  )
}
export default WithLogin(Login)
