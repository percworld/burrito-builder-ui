export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
    .then(response => response.json())
}

export const postOrder = (order) => {
  return fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    body: JSON.stringify(order),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
}

export const deleteOrder = (orderID) => {
  return fetch(`http://localhost:3001/api/v1/orders${orderID}`, {
    method: 'DELETE',
    body: JSON.stringify(orderID),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
}

