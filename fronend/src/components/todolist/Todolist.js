import React, { Component } from 'react';
import { Button, Card, CardBody, CardText, CardTitle, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import './todolist.css';

const url = "http://localhost:8080/topshiriqlar";

class Todolist extends Component {
    state = {
        posts: [],
        title: '',
        body: '',
        isNew: true
    }

    componentDidMount() {
        this.getPostsFromServer();
    }

    getPostsFromServer = () => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const mappedData = data.map(elem => {
                    return {
                        id: elem._id,
                        title: elem.title,
                        body: elem.body
                    }
                })
                this.setState({ posts: mappedData });
                console.log(mappedData);
            })
            .catch(err => console.error(err));
    }

    inputHandler = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    createPost = () => {
        const { title, body, isNew, id, posts } = this.state;

        if (isNew) {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    body: body
                })
            })
                .then(res => res.json())
                .then(data => this.setState(prevstate => ({ posts: [...prevstate.posts, { id: data._id, title: data.title, body: data.body }], title: '', body: '' })))
                .catch(err => console.error(err));
        } else {
            fetch(url + '/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    body: body
                })
            })
                .then(res => res.json())
                .then(res => {
                    this.setState({ isNew: true })
                    const post = posts.findIndex(elem => elem.id === res[0]._id);
                    posts[post] = {
                        id: res[0]._id,
                        title: res[0].title,
                        body: res[0].body
                    };
                    this.setState({ posts: posts, title: '', body: '' });
                    // console.log(res);
                });
        }
    }



    deletePost = (id) => {
        const newUrl = url + '/' + id;
        fetch(newUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                const { posts } = this.state;
                const post = posts.find(elem => elem.id === id)
                const index = posts.indexOf(post);
                posts.splice(index, 1);
                this.setState({ posts: posts });
            })
            .catch(err => console.error(err))
    }

    stateHandler = (item) => {
        this.setState(({ isNew: false, id: item.id, title: item.title, body: item.body }));
    }

    render() {
        const { posts, title, body, isNew } = this.state;

        return (
            <div>
                <Container>
                    <Card className="form-kard p-4 mt-3">
                    <h2 className="text-center mt-3 mb-3">Yangi maqola yaratish</h2>
                    <Form className="col-10 m-auto">
                        <Input
                            placeholder='Sarlavhasi'
                            name='title'
                            value={title}
                            onChange={this.inputHandler}
                        /> <br />
                        <FormGroup>
                            <Label for="exampleText">Matni</Label>
                            <Input type="textarea" value={body} name="body" onChange={this.inputHandler} />
                        </FormGroup>
                    </Form>
                    <center>
                        <Button className="rounded" style={buttonStyle} onClick={this.createPost} color="primary">{isNew ? "Qo'shish" : "Yangilash"}</Button>
                    </center>
                    </Card>
                </Container>

                <Container className="mt-5">
                    {
                        posts ? (
                            posts.map(item => {
                                return (
                                    <Card className="kard mt-3">
                                        <CardBody key={item.id}>
                                            <CardTitle><h2>{item.title}</h2></CardTitle>
                                            <CardText>{item.body}</CardText>
                                            <div className="float-right">
                                            <Button color="danger" onClick={() => this.deletePost(item.id)}>Delete</Button> &nbsp;
                                            <Button
                                                color="info"
                                                onClick={() => this.stateHandler(item)}>Edit</Button>
                                            </div>
                                        </CardBody>
                                    </Card>

                                )
                            })) : (
                                <p className="text-center">Maqola mavjud emas!</p>
                            )
                    }
                </Container>

            </div>
        );
    }
}

const buttonStyle = { width: '110px', height: '40px' };

export default Todolist;