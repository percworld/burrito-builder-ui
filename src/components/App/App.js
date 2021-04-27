import React, { Component } from 'react';
import './App.css';
import { getOrders, postOrder } from '../../apiCalls';
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
      .then(r => console.log(r))
      .then(response => this.setState({ orders: response.orders }))
      .catch(err => console.error('Error fetching:', err));
  }

  submitOrder = (order) => {
    postOrder(order)
      .then(response => this.setState({ orders: [...this.state.orders, response] }))
      .catch(err => console.error('Error fetching:', err));

  }

  render() {
    console.log(this.state.orders)
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
