import React from 'react';

const Cart = ({ cartItems, fetchCartItems }) => {
  // Access the products array from the cartItems object
  const products = cartItems?.products || [];

  // Handle removing an item from the cart
  const handleRemove = async (id) => {
    const response = await fetch(`http://localhost:5000/delete-cart-item/${id}`, {
    	method: "DELETE",
		credentials: "include",
    })
    await fetchCartItems()
  };

  const cartProducts = products.map((product) => (
    <div key={product.id} className="cart-item border-bottom mb-3 pb-3 row">
      <div className="col-3 col-md-4">
        <img
          src={product.image || 'https://via.placeholder.com/150'} // Default image if none is provided
          alt={product.name}
          className="cart-img img-thumbnail"
        />
      </div>
      <div className="col-8 col-md-8 position-relative text-start">
        <h2>{product.name}</h2>
        <span className="fs-5">Price: GH₵{product.price}</span>
        <div className="position-absolute end-0 bottom-0 p-3">
          <button
            onClick={() => handleRemove(product.id)}
            className="btn btn-warning mt-3"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container">
      <div className="container-fluid text-center">
        <span className="fs-1" style={{ color: 'white' }}>Cart</span>
      </div>

      {products.length > 0 ? (
        <div className="row py-4 gap-4">
          <div className="col-lg-7">
            <div className="bg-white p-3 rounded-3">
              <h4 className="mb-4 text-start">Cart Items</h4>
              {cartProducts}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="bg-white p-3 rounded-3">
              <h3 className="mb-4">Cart Summary</h3>
              <div className="m-2">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="d-flex justify-content-between mb-2"
                  >
                    <span className="fw-medium">{product.name}:</span>
                    <span className="text-secondary">GH₵{product.price}</span>
                  </div>
                ))}
              </div>
              <hr />
              <div className="d-flex justify-content-between mt-3">
                <span className="fs-5 fw-bold">Total Cost:</span>
                <span className="text-secondary">
                  GH₵{cartItems.totalPrice}
                </span>
              </div>
              <div className="mt-4">
                <button className="btn btn-primary btn-lg btn-block">
                  Proceed to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col">
            <div className="text-center py-5">
              <span 
	              className="fs-4" 
	              style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',  // Full viewport height
					textAlign: 'center',
					backgroundColor: '#f8f9fa',  // Optional: for a light background
				}}>
                You have nothing in your cart.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart