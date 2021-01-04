import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { Component } from 'react';

class SearchByNameComponent extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            bucketName: '',

        })
        this.validateBucketForm = this.validateBucketForm.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }


    validateBucketForm(bucket) {
        let error = {}
        if (!bucket.bucketName) {
            error.bucketName = "Enter a Bucket Name";
        }
        else if (bucket.bucketName.length < 3) {
            error.bucketName = "Enter atleast 3 characters in Bucket Name"
        }
        return error;

    }

    onSubmit(bucket) {
        this.props.history.push(`/bucketSearch/${bucket.bucketName}`)
    }

    render() {
        let { bucketName } = this.state
        return (
            <div className='container'>
                <h1>Search Bucket By Name</h1>
                <br></br>
                <Formik initialValues={{ bucketName }} enableReinitialize={true} onSubmit={this.onSubmit} validateOnChange={false} validateOnBlur={false} validate={this.validateBucketForm}>
                    <Form>
                        <ErrorMessage name='bucketName' component='div' className='alert alert-danger'></ErrorMessage>


                        <fieldset className='form-group'>
                            <label>Bucket Name</label>
                            <Field className='form-control' type='text' name='bucketName'>
                            </Field>
                        </fieldset>


                        <br></br>
                        <button type="submit" className='btn btn-primary'>Search</button>
                    </Form>
                </Formik>

            </div >
        );
    }
}

export default SearchByNameComponent;