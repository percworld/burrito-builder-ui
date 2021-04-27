import React, { Component } from 'react';
import './App.css';
import { getOrders } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    getOrders()
      .then(response => this.setState({ orders: response.orders }))
      .catch(err => console.error('Error fetching:', err));
  }

  submitOrder(order) {


  }

  render() {
    //console.log(this.state.orders)
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm submitOrder={this.submitOrder} />
        </header>
        {this.state.orders && <Orders orders={this.state.orders} />}
      </main>
    );
  }
}


export default App;
