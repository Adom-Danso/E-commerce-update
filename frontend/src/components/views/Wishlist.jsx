import React, { useState, useEffect } from 'react';

const WishList = ({ fetchWishList, products }) => {
  const [loading, setLoading] = useState(true);

  const removeFromWishList = async (productId) => {
    const response = await fetch(`http://localhost:5000/add-or-remove-from-wishlist/${productId}`, {
      method: 'POST',
      credentials: 'include',
    })
    await fetchWishList()
  }  

  const initializePage = async () => {
    setLoading(true);
    await fetchWishList();
    setLoading(false);
  };

  useEffect(() => {
    initializePage();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',  // Full viewport height
          textAlign: 'center',
          backgroundColor: '#f8f9fa',  // Optional: for a light background
        }}
      >
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="container-fluid text-center mb-3">
        <span className="fs-1" style={{ color: 'white' }}>Wishlist</span>
      </div>

      { products ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
			{products.map((product) => {
				return (
				    <div className="col product-item" key={product.id}>
				      <div className="card h-100">
				        <div className="position-relative">
				          <img
				            src={product.image || 'https://via.placeholder.com/150'}
				            className="card-img-top"
				            alt={product.name}
				          />
			            <button className="position-absolute top-0 end-0 m-3 btn btn-light rounded-circle" onClick={() => removeFromWishList(product.id)}>
			              <i className="bi bi-heart-fill text-danger"></i>
			            </button>
				        </div>
				        <div className="card-body">
				          <h5 className="card-title">{product.name}</h5>
				          <p className="card-text">Price: GH₵{product.price}</p>
				          <p className="card-text">{product.seller}</p>
				          <form action="#" method="POST">
				            <button type="submit" className="btn btn-warning">
				              <i className="bi bi-cart-plus"></i> Add to Cart
				            </button>
				          </form>
				        </div>
				      </div>
				    </div>
				)
			})}
        </div>
      ) : (
        <div className="row">
          <div className="col">
            <div className="text-center py-5">
              <span className="fs-4" style={{ color: 'white' }}>
                You have nothing in your wishlist.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishList;
