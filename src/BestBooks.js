import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BestBooks.css';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap'
import { withAuth0 } from '@auth0/auth0-react';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allDrinks: [],
    }
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/Drinks`)
      .then(result => {
        this.setState({
          allDrinks: result.data
        });
      })
      .catch(err => {
        console.log(err);
      })

  }

  addDrink = (drinkObj) => {
    const { user } = this.props.auth0;

    const newDrink = {
      drinkName: drinkObj.strDrink,    // same name in schema in backend
      drinkImg:  drinkObj.strDrinkThumb,
    }
    const params = {
      userEmail: user.email, // same name as the post in backend
      drinkObj: newDrink 
    }
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/addDrink`, params)
      .catch(err => { console.log(err) })



  }

  render() {
    return (
      <>
        {this.state.allDrinks.length && this.state.allDrinks.map((drink, idx) => {
          return (<>
            <Card style={{ width: '18rem', display: 'inline-block' }}>
              <Card.Img variant="top" src={drink.strDrinkThumb} />
              <Card.Body>
                <Card.Title>{drink.strDrink}</Card.Title>
                <Button onClick={() => { this.addDrink(drink) }} variant="primary">Add To Fav</Button>
              </Card.Body>
            </Card>
          </>)
        })}
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
