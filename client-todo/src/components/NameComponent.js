import React, { Component } from 'react';
import { Container, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import BucketDataService from '../services/BucketDataService';

class NameComponent extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            bucketName: this.props.match.params.buckName,
            buckets: [],
            openedModal: null
        })
    }

    openModal = id => {
        this.setState({ openedModal: id });
    };
    closeModal = () => {
        this.setState({ openedModal: null });
    };

    componentWillMount() {
        BucketDataService.searchBucketByName(this.state.bucketName).then(response =>
            this.setState({
                buckets: response.data
            })
        )
    }

    render() {
        return (
            <div className="container">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Bucket Id</th>
                            <th>Bucket Name</th>
                            <th>Todos</th>
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
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {bucket.todos.map(todo =>
                                                                <tr key={todo.todoId}>
                                                                    <td>{todo.todoId}</td>
                                                                    {!todo.completed ? <td>{todo.todoName}</td> : <td style={{ textDecorationLine: 'line-through' }}>{todo.todoName}</td>}
                                                                    <td><input id={todo.todoId} type="checkbox" checked={todo.completed} /></td>

                                                                </tr>)}
                                                        </tbody></table>

                                                </Container>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={this.closeModal}>Close</Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default NameComponent;