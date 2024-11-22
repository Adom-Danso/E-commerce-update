import React, {useState, useEffect} from 'react';

const Cart = () => {
	const [cartItems, setCartItems] = useState([]);

	const fetchCartItems = async () => {
		const response = await fetch('http://localhost:5000/get_cart')
		const data = await response.json()
		setCartItems(data)
	}

	use(() => {
		fetchCartItems()
	},[])

	return (
		<div class="container">
		    <div class="container-fluid text-center">
		        <span class="fs-1" style="color: white;">Cart</span>
		    </div>
		    {% if products %}
		    <div class="row py-4 gap-4">
		        <div class="col-lg-7">
		            <div class="bg-white p-3 rounded-3">
		                <h4 class="mb-4 text-start">Cart Items</h4>
		                {% for product in products %}
		                <div class="cart-item border-bottom mb-3 pb-3 row">
		                    <div class="col-3 col-md-4">
		                        <img src="{{ url_for('static', filename='images/'+ product.image_name) }}" class="cart-img img-thumbnail">
		                    </div>
		                    <div class="col-8 col-md-8 position-relative text-start">
		                        <h2>{{ product.name }}</h2>
		                        <span class="fs-5">Price: GH₵{{ product.price }}</span>
		                        <div class="position-absolute end-0 bottom-0 p-3">
		                            <a href="{{ url_for('views.remove_from_cart', product_id=product.id) }}" class="btn btn-warning mt-3">Remove</a>
		                        </div>
		                        
		                    </div>
		                </div>
		                {% endfor %}
		            </div>
		        </div>
		        <div class="col-lg-4">
		            <div class="bg-white p-3 rounded-3">
		                <h3 class="mb-4">Cart Summary</h3>
		                <div class="m-2">
		                    <div class="d-flex justify-content-between mb-2">
		                        <span class="fw-bold">Product</span>
		                        <span class="text-secondary">Price (GH₵)</span>
		                    </div>
		                    {% for product in products %}
		                    <div class="d-flex justify-content-between mb-2">
		                        <span class="fw-medium">{{ product.name }}:</span>
		                        <span class="text-secondary">{{ product.price }}</span>
		                    </div>
		                    {% endfor %}
		                </div>
		                <hr>
		                <div class="d-flex justify-content-between mt-3">
		                    <span class="fs-5 fw-bold">Total Cost:</span>
		                    <span class="text-secondary">GH₵{{ total_price }}</span>
		                </div>
		                <div class="mt-4">
		                    <a href="{{ url_for('views.checkout') }}" class="btn btn-primary btn-lg btn-block">Proceed to checkout</a>
		                </div>
		            </div>
		        </div>
		    </div>
		    {% else %}
		    <div class="row">
		        <div class="col">
		            <div class="text-center py-5">
		                <span class="fs-4" style="color: white;">You have nothing in your cart.</span>
		            </div>
		        </div>
		    </div>
		    {% endif %}
		</div>
	)
}

export default Cart