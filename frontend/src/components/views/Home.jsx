import React, { useState, useEffect } from 'react';

const HomePage = ({ fetchCartItems, isLoggedIn, fetchWishList, wishList }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState([]);

  // Fetch products from the server
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/get_products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error(error);
      alert('Unable to fetch products. Please try again later.');
    }
  };

  // Add product to cart
  const addToCart = async (productId) => {
    if (isLoggedIn) {
      try {
        const response = await fetch(`http://localhost:5000/add-to-cart/${productId}`, {
          method: 'POST',
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to add to cart');
        alert('Product added to cart!');
        await fetchCartItems();
      } catch (error) {
        console.error(error);
        alert('An error occurred. Please try again.');
      }
    } else {
      alert('Please log in to add items to your cart.');
    }
  };

  // Add or remove product from wishlist
  const addToWishList = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/add-or-remove-from-wishlist/${productId}`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to update wishlist');
      await fetchWishList();

      // Update wishlistIds based on the updated wishList
      const updatedWishlistIds = wishList.map((product) => product.id);
      setWishlistIds(updatedWishlistIds);
    } catch (error) {
      console.error(error);
      alert('Unable to update wishlist. Please try again.');
    }
  };

  // Initialize the page and wishlist
  useEffect(() => {
    const initializeWishlist = async () => {
      if (isLoggedIn) {
        await fetchWishList();
        setWishlistIds(wishList.map((product) => {return product.id}));
      }
    };

    const initializePage = async () => {
      setLoading(true);
      await initializeWishlist()
      await fetchProducts();
      setLoading(false);
    };

    initializePage();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Full viewport height
          textAlign: 'center',
          backgroundColor: '#f8f9fa', // Optional: for a light background
        }}
      >
        <div>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h1 className="mt-3">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3">
      {products.map((product) => (
        <div className="col product-item" key={product.id}>
          <div className="card h-100">
            <div className="position-relative">
              <img
                src={product.image || 'https://via.placeholder.com/150'} // Use a placeholder if no image
                className="card-img-top"
                alt={product.name}
              />
              <button
                className="position-absolute top-0 end-0 m-3 btn btn-light rounded-circle"
                onClick={() => addToWishList(product.id)}
              >
                {wishlistIds.includes(product.id) ? (
                  <i className="bi bi-heart-fill text-danger"></i>
                ) : (
                  <i className="bi bi-heart"></i>
                )}
              </button>
            </div>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{product.name}</h5>
              <span className="card-text fw-light mb-2">Price: GH₵{product.price}</span>
              <div className="mt-auto">
                <button
                  type="button"
                  className="btn btn-warning btn-block"
                  onClick={() => addToCart(product.id)}
                >
                  <i className="bi bi-cart-plus"></i> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
