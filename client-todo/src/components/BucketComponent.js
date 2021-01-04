import { ErrorMessage, Field, Form, Formik, isString } from 'formik';
import React, { Component } from 'react';
import BucketDataService from '../services/BucketDataService';

class BucketComponent extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            bucketId: this.props.match.params.buckId,
            bucketName: '',
            readOnly: false,
            buttonMsg: 'Add',
            className: 'btn btn-outline-success mb-2',
            message: ''
        })
        this.onSubmit = this.onSubmit.bind(this)
        this.validateBucketForm = this.validateBucketForm.bind(this)
    }

    componentWillMount() {
        if (this.state.bucketId === undefined) {
            this.setState({
                bucketId: ''
            })
        }
        if (this.state.bucketId !== undefined) {
            BucketDataService.getBucket(this.state.bucketId).then(
                response => {
                    this.setState({
                        bucketName: response.data.bucketName,
                    })
                    this.onChangeReadOnly(this.state.bucketId)
                }
            )
        }
    }

    onChangeReadOnly(bucketId) {
        if (bucketId !== 0) {
            this.setState({
                readOnly: true,
                buttonMsg: 'Update',
                className: 'btn btn-outline-warning mb-2'
            })
        }
    }


    onSubmit(bucket) {
        if (!this.state.readOnly) {
            BucketDataService.addBucket(bucket).then(() =>
                this.props.history.push('/')
            ).catch(err => {
                this.setState ({
                    message: 'Bucket Id ' + bucket.bucketId + ' already exists.'
                })
            })

        } else {
            BucketDataService.updateBucket(bucket).then(() => this.props.history.push('/'))
        }
    }

    validateBucketForm(bucket) {
        let error = {}
        if (!bucket.bucketId) {
            error.bucketId = "Enter a Bucket Id"
        }
        else if (!bucket.bucketName) {
            error.bucketName = "Enter a Bucket Name";
        }
        else if (!isString(bucket.bucketName)) {
            error.bucketName = "Enter a valid Bucket Name"
        }
        else if (bucket.bucketName.length < 3) {
            error.bucketName = "Enter atleast 3 characters in Bucket Name"
        }
        else if (bucket.bucketId < 0) {
            error.bucketId = "Bucket Id cannot be negative"
        }
        else if (isNaN(bucket.bucketId)) {
            error.bucketId = "Enter a valid Bucket Id"
        }
        return error;

    }

    render() {
        let { bucketId, bucketName } = this.state
        return (
            <div className='container'>
                <h1>Add/Update</h1>
                <br></br>
                {this.state.message && <div className='alert alert-danger'>{this.state.message}</div>}
                <Formik initialValues={{ bucketId, bucketName }} enableReinitialize={true} onSubmit={this.onSubmit} validateOnChange={false} validateOnBlur={false} validate={this.validateBucketForm}>
                    <Form>
                        <ErrorMessage name='bucketId' component='div' className='alert alert-danger'></ErrorMessage>
                        <ErrorMessage name='bucketName' component='div' className='alert alert-danger'></ErrorMessage>

                        <fieldset className='form-group'>
                            <label>Bucket Id</label>
                            <Field className='form-control' type='text' name='bucketId' readOnly={this.state.readOnly}>
                            </Field>
                        </fieldset>
                        <fieldset className='form-group'>
                            <label>Bucket Name</label>
                            <Field className='form-control' type='text' name='bucketName'>
                            </Field>
                        </fieldset>
                        <br></br>
                        <button type="submit" className={this.state.className}>{this.state.buttonMsg}</button>
                    </Form>
                </Formik>
            </div>
        );
    }
}

export default BucketComponent;