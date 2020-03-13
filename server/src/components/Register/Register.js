import React from "react";
import { withFormik, Form, Field } from "formik";
import { BackgroundImage, CaptureLogo, FormContainer, TextContainer, BioContainer, Button, P } from './RegisterStyles'
import * as Yup from "yup";
import axios from 'axios';

function RegisterForm({ status, values, errors, touched }) {
    console.log('Values:', values)
    return (
        <BackgroundImage id='BackgroundImage'>
            <CaptureLogo></CaptureLogo>

            <FormContainer>
                <Form>
                    <TextContainer>
                        <Field type='name' name='name' placeholder='Name' />
                        {touched.name && errors.name && <P>{errors.name}</P>}
                    </TextContainer>
                    <TextContainer>
                        <Field type='email' name='email' placeholder='Email' />
                        {touched.email && errors.email && <P>{errors.email}</P>}
                    </TextContainer>
                    <TextContainer>
                        <Field type='password' name='password' placeholder='Password' />
                        {touched.password && errors.password && <P>{errors.password}</P>}
                    </TextContainer>
                    <TextContainer>
                        <Field type='text' name='username' placeholder='Username' />
                        {touched.username && errors.username && <P>{errors.username}</P>}
                    </TextContainer>
                    <BioContainer>
                        <Field type='text' name='bio' placeholder='Bio' />
                        {touched.bio && errors.bio && <P>{errors.bio}</P>}
                    </BioContainer>
                    <Button type='submit'>Register!</Button>
                </Form>
            </FormContainer>

        </BackgroundImage>
    );
}

const FormikRegisterForm = withFormik({
    mapPropsToValues({ name, email, username, password, bio }) {
        return {
            name: name || '',
            email: email || '',
            username: username || '',
            password: password || '',
            bio: bio || ''
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('Please enter name'),
        email: Yup.string().required('Email is required'),
        username: Yup.string().required('Please enter username'),
        password: Yup.string().min(6, 'Password must be 6 characters').required('Please enter password'),
        bio: Yup.string().required('Please enter a bio')
    }),

    handleSubmit(values, { props }) {
        console.log('values object:', values);
        axios
            .post('https://expatjournalbackend.herokuapp.com/api/auth/register', values)
            .then(res => {
                props.history.push('/login')
            })
            .catch(err => {
                console.log('values object:', values)
                console.log(err.response)
            }
            );
    }
})(RegisterForm);

export default FormikRegisterForm;