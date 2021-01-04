import React, { Component } from 'react';
import BucketDataService from '../services/BucketDataService';
import TodoDataService from '../services/TodoDataService';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Container } from 'react-bootstrap';

class ListBucket extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            buckets: [],
            message: '',
            openedModal: null
        })
        this.refreshBucket = this.refreshBucket.bind(this)
        this.deleteButtonClicked = this.deleteButtonClicked.bind(this)
        this.updateButtonClicked = this.updateButtonClicked.bind(this)
        this.addButtonClicked = this.addButtonClicked.bind(this)
        this.searchButtonClicked = this.searchButtonClicked.bind(this)

        this.addTodoButtonClicked = this.addTodoButtonClicked.bind(this)

        this.updateDoneStatusCheckbox = this.updateDoneStatusCheckbox.bind(this)


    }
    openModal = id => {
        this.setState({ openedModal: id });
    };
    closeModal = () => {
        this.setState({ openedModal: null });
    };

    componentWillMount() {
        this.refreshBucket()
    }

    refreshBucket() {
        BucketDataService.getAllBuckets().then(
            response => {
                this.setState({
                    buckets: response.data,
                })
                console.log(response.data.length)
            }
        )
    }

    deleteButtonClicked(bucketId) {
        BucketDataService.deleteBucket(bucketId).then(
            response => {
                this.setState({
                    message: 'Bucket Id ' + bucketId + ' deleted successfully.'
                })
                this.refreshBucket()

            }
        )
    }

    addButtonClicked() {
        this.props.history.push(`/bucketAdd/`)
    }

    updateButtonClicked(bucketId) {
        this.props.history.push(`/bucketUpdate/${bucketId}`)
    }

    searchButtonClicked() {
        this.props.history.push(`/bucketSearchByName/`)
    }







    deleteTodoButtonClicked(bucketId, todoId) {
        TodoDataService.deleteTodo(bucketId, todoId).then(response => {
            this.setState({
                message: 'Todo for Bucket Id ' + bucketId + ' with Todo Id ' + todoId + ' deleted successfully.'
            })
            this.refreshBucket()

        })

    }

    addTodoButtonClicked(bucketId) {
        this.props.history.push(`/todoAdd/${bucketId}`)

    }

    updateTodoButtonClicked(bucketId, todoId, todoName) {
        this.props.history.push(`/todoUpdate/${bucketId}/${todoId}`)

    }

    updateDoneStatusCheckbox(bucketId, todo) {
        todo.completed = !todo.completed
        console.log(bucketId, todo)
        TodoDataService.updateTodo(bucketId, todo).then(() => this.props.history.push('/'))
    }

    render() {
        return (
            <div>
                <div className='container'>
                    {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Bucket Id</th>
                                <th>Bucket Name</th>
                                <th>Todos</th>
                                <th>Delete/Update Bucket</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.buckets.map(bucket =>
                                <tr key={bucket.bucketId}>
                                    <td>{bucket.bucketId}</td>
                                    <td>{bucket.bucketName}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => this.openModal(bucket.bucketId)}>
                                            Todos
                                        </Button>
                                        <Modal
                                            size="lg"
                                            show={this.state.openedModal === bucket.bucketId}
                                            onHide={this.closeModal}
                                            aria-labelledby="example-modal-sizes-title-lg"
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title id="example-modal-sizes-title-lg">
                                                    {bucket.bucketName}
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body className="show-grid">
                                                <Container>
                                                    <table className='table table-striped table-hover'>
                                                        <thead>
                                                            <tr>
                                                                <th>Todo Id</th>
                                                                <th>Todos</th>
                                                                <th>Done</th>
                                                                <th>Delete/Update Todo</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {bucket.todos.map(todo =>
                                                                <tr key={todo.todoId}>
                                                                    <td>{todo.todoId}</td>
                                                                    {!todo.completed ? <td>{todo.todoName}</td> : <td style={{ textDecorationLine: 'line-through' }}>{todo.todoName}</td>}
                                                                    <td><input id={todo.todoId} type="checkbox" checked={todo.completed} onChange={() => this.updateDoneStatusCheckbox(bucket.bucketId, todo)}/></td>
                                                                    <td><button type="button" className="btn btn-danger" onClick={() => this.deleteTodoButtonClicked(bucket.bucketId, todo.todoId)}>Delete Todo</button>
                                                                        <span>&nbsp;</span>
                                                                        <button type="button" className="btn btn-warning" onClick={() => this.updateTodoButtonClicked(bucket.bucketId, todo.todoId, todo.todoName)}>Update Todo</button></td>

                                                                </tr>)}
                                                        </tbody></table>

                                                </Container>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button className="mr-auto" variant="success" onClick={() => this.addTodoButtonClicked(bucket.bucketId)}>Add</Button>
                                                <Button variant="secondary" onClick={this.closeModal}>Close</Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-danger" onClick={() => this.deleteButtonClicked(bucket.bucketId)}>Delete Bucket</button>
                                        <span>&nbsp;</span>
                                        <button type="button" className="btn btn-warning" onClick={() => this.updateButtonClicked(bucket.bucketId)}>Update Bucket</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <button type="button" className='btn btn-success' onClick={() => this.addButtonClicked()}>Add Bucket</button>&nbsp;
                    <button type="button" className='btn btn-primary' onClick={() => this.searchButtonClicked()}>Search Bucket By Name</button>
                </div>
            </div>
        );
    }
}

export default ListBucket;