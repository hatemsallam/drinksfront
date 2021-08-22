import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Card, Button, Modal, Form } from 'react-bootstrap'
import { withAuth0 } from '@auth0/auth0-react';
import FloatingLabel from 'react-bootstrap/FloatingLabel'

class FavoriteDrinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favDrinks: [],
            index: -1,
            drinkName: '',
            showModal: false,
            drinkObj: {}

        }
    }

    componentDidMount() {
        const { user } = this.props.auth0;

        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/userDrinks`, { params: { userEmail: user.email } })
            .then(result => {
                console.log('in then', result.data)
                this.setState({
                    favDrinks: result.data
                });
            })
            .catch(err => { console.log(err) })

    }

    deleteDrink = (idx) => {
        const { user } = this.props.auth0;

        axios
            .delete(`${process.env.REACT_APP_SERVER_URL}/removeDrink/${idx}`, { params: { userEmail: user.email } })
            .then(result => {
                this.setState({
                    favDrinks: result.data
                });
            })
            .catch(err => { console.log(err) })


    }
    upDateDrink = (drink, idx) => {
  
        this.setState({
            index: idx, // from map
            drinkName: drink.drinkName, //from map
            showModal: true,
            drinkObj: drink // from map
        })
        console.log('state', this.state.showModal)
    }

    closeModal = () => {
        this.setState({
            showModal: false
        })

    }


    submitHandler = (event) => {
        event.preventDefault();
       this.closeModal()
        const newName = event.target.drinkName.value;
        const newDrinkObj = {
            drinkName: newName,
            drinkImg: this.state.drinkObj.drinkImg,
        }
        const { user } = this.props.auth0;
        const params = {
            userEmail : user.email,
            drinkObj : newDrinkObj
        }
        axios
        .put(`${process.env.REACT_APP_SERVER_URL}/updateDrink/${this.state.index}`, params)
        .then(result =>{

            this.setState({
                favDrinks : result.data
            });

        })
        .catch(err => { console.log(err) });
    }


    render() {
        // console.log(this.state.favDrinks)
        console.log('state', this.state.showModal)
        return (<>
            {console.log('in console', this.state.favDrinks)}
            {this.state.favDrinks.length && this.state.favDrinks.map((drink, idx) => {
                return (<>
                    <Card style={{ width: '18rem', display: 'inline-block' }}>
                        <Card.Img variant="top" src={drink.drinkImg} />
                        <Card.Body>
                            <Card.Title>{drink.drinkName}</Card.Title>
                            <Button onClick={() => { this.deleteDrink(idx) }} variant="danger">Delete</Button>
                            <Button onClick={() => { this.upDateDrink(drink, idx) }} variant="warning">Update</Button>
                        </Card.Body>
                    </Card>
                </>)
            })}


            {this.state.showModal && <Modal show={this.state.showModal} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={this.submitHandler}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control type="text" name="drinkName" defaultValue={this.state.drinkName} />
                    </FloatingLabel>
                    <Button variant="secondary" type='submit'>
                        Update
                    </Button>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeModal}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>}

        </>)
    }

}
export default withAuth0(FavoriteDrinks);
  

