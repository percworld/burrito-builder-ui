import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      error: ''
    };
  }

  handleNameChange = event => {
    this.setState({ name: event.target.value })
  }

  handleIngredientChange = event => {
    event.preventDefault();
    this.setState({ ingredients: [...this.state.ingredients, event.target.name] })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.name ? this.props.submitOrder({ name: this.state.name, ingredients: this.state.ingredients })
      : this.setState({ error: 'Please enter a name for the new order' })
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({ name: '', ingredients: [] });
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          data-cy="name"
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons}
        {this.state.error && <p>{this.state.error}</p>}
        <p>Order: {this.state.ingredients.join(', ') || 'Nothing selected'}</p>

        <button data-cy="submit" onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
