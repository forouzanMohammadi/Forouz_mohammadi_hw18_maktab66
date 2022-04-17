import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { Container, Row, Col, Form } from 'react-bootstrap'
import axios from 'axios'

const Regester = () => {
  const [provinces, setProvinces] = useState({})
  const [cities, setCities] = useState([])
  const [education, setEducation] = useState(false)
  const [info, setInfo] = useState([])

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      pass: '',
      education: '',
      positionEdu: '',
      province: '',
      city: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values))
      axios
        .post('http://localhost:4000/users', values)
        .then(() => infoUsers())
        .catch((error) => {})
    },
  })
  useEffect(() => {
    axios.get('iranstates.json').then((res) => {
      const data = res.data
      setProvinces(data)
    })
  }, [])

  const infoUsers = () => {
    axios
      .get('http://localhost:4000/users')
      .then((response) => setInfo(response.data))
      .catch((error) => {})
  }

  useEffect(() => {
    infoUsers()
  }, [])

  const inuptChangeHandler = (event) => {
    if (event.target.name === 'province') {
      Object.entries(provinces).forEach(([key, val]) => {
        if (key === event.target.value) {
          setCities(val)
        }
      })
    }
  }

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center">
          <p className="par">رایگان ثبت نام کنید</p>
        </Col>
        <Form onSubmit={formik.handleSubmit} key="index">
          <input
            required
            className={'nameInput col-5'}
            placeholder="نام"
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          <input
            required
            className={'nameInput col-5'}
            placeholder="نام خانوادگی"
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
          <input
            required
            className="mt-3"
            placeholder={'پست الکترونیک'}
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <input
            className="mt-3"
            placeholder={'کلمه عبور'}
            id="number"
            name="pass"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.pass}
          />
          <select
            required
            onChange={(e) => {
              formik.handleChange(e)
              setEducation(true)
            }}
            className="mt-3"
            name="education"
            id="education"
          >
            <option value={formik.values.education} className="plcholder">
              تحصیلات
            </option>
            <option value={'زیر دیپلم'}>زیر دیپلم</option>
            <option value={'دیپلم'}>دیپلم</option>
            <option value={'کاردانی'}>کاردانی</option>
            <option value={'کارشناسی'}>کارشناسی</option>
            <option value={'کارشناسی ارشد'}>کارشناسی ارشد</option>
            <option value={'دکتری'}>دکتری</option>
          </select>
          {education && (
            <input
              required
              value={formik.values.positionEdu}
              name="positionEdu"
              onChange={formik.handleChange}
              type={'text'}
              placeholder={'محل تحصیل'}
              className={'mt-3'}
            />
          )}
          <Row>
            <div className="col-6">
              <select
              value={formik.values.province}
                required
                className="mt-3 selected"
                name="province"
                id="province"
                onChange={(e) => {
                  formik.handleChange(e)
                  inuptChangeHandler(e)
                }}
              >
                <option value="استان">استان</option>
                {Object.keys(provinces).map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <select required
              value={formik.values.city}
              name="city"
              id='city'
              onChange={(e) => {
                formik.handleChange(e);
                inuptChangeHandler(e);
              }}
               className="mt-3 selected">
                <option value={'شهرستان محل تولد'} className="plcholder">شهرستان محل تولد</option>
                {cities.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </Row>
          <button type="submit" className="mt-4 subLog">
            ثبت نام
          </button>
        </Form>
      </Row>
    </Container>
  )
}

export default Regester;
