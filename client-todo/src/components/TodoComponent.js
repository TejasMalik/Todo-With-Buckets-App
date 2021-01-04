import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { Component } from 'react';
import TodoDataService from '../services/TodoDataService';

class TodoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            bucketId: this.props.match.params.buckId,
            todoId: this.props.match.params.toId,
            todoName: '',
            completed: '',
            readOnly: false,
            buttonMsg: 'Add',
            message: ''
        })
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillMount() {
        if (this.state.todoId === undefined) {
            this.setState({
                todoId: ''
            })
        }
        if (this.state.todoId !== undefined) {
            TodoDataService.getTodo(this.state.bucketId, this.state.todoId).then(
                response => {
                    this.setState({
                        todo: response.data,
                        todoName: response.data.todoName,
                        completed: response.data.completed
                    })
                    this.onChangeReadOnly(this.state.todoId)
                }
            )
        }
    }

    onChangeReadOnly(todoId) {
        if (todoId !== 0) {
            this.setState({
                readOnly: true,
                buttonMsg: 'Update',
            })
        }
    }

    onSubmit(todo) {
        if (!this.state.readOnly) {
            TodoDataService.addTodo(todo, this.state.bucketId).then(() =>
                this.props.history.push('/')
            ).catch(err => {
                this.setState({
                    message: 'Todo Id ' + todo.todoId + ' already exists.'
                })
            })
        }
        else {
            TodoDataService.updateTodo(this.state.bucketId, todo).then(() => this.props.history.push('/'))
        }
    }

    validateTodoForm(todo) {
        let error = {}
        if (!todo.todoId) {
            error.todoId = "Enter a Todo Id"
        }
        else if (!todo.todoName) {
            error.todoName = "Enter a Todo";
        }
        else if (todo.todoId < 0) {
            error.todoId = "Todo Id cannot be negative"
        }
        else if (isNaN(todo.todoId)) {
            error.todoId = "Enter a valid Todo Id"
        }
        return error;

    }

    render() {
        let { bucketId, todoId, todoName, completed } = this.state
        return (
            <div className='container'>
                <h1>Add/Update</h1>
                <br></br>
                {this.state.message && <div className='alert alert-danger'>{this.state.message}</div>}
                <Formik initialValues={{ bucketId, todoId, todoName, completed }} enableReinitialize={true} onSubmit={this.onSubmit} validateOnChange={false} validateOnBlur={false} validate={this.validateTodoForm}>
                    <Form>
                        <ErrorMessage name='todoId' component='div' className='alert alert-danger'></ErrorMessage>
                        <ErrorMessage name='todoName' component='div' className='alert alert-danger'></ErrorMessage>
                        <fieldset className='form-group'>
                            <label>Todo Id</label>
                            <Field className='form-control' type='text' name='todoId' readOnly={this.state.readOnly}>
                            </Field>
                        </fieldset>
                        <fieldset className='form-group'>
                            <label>Todo</label>
                            <Field className='form-control' type='text' name='todoName'>
                            </Field>
                        </fieldset>
                        <fieldset className='form-group'>
                            <label>Done</label>
                            <Field className='form-control' type='checkbox' name='completed'>
                            </Field>
                        </fieldset>
                        <br></br>
                        <button type="submit" className='btn btn-success'>{this.state.buttonMsg}</button>
                    </Form>
                </Formik>
            </div>
        );
    }
}

export default TodoComponent;