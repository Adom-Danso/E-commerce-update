import React, {useState, useEffect} from 'react';

const HomePage = () => {
	const [products, setProducts] = useState([]);

	const fetchCartItems = async () => {
		const response = await fetch('http://localhost:5000/get_products')
		const data = await response.json()
		setProducts(data.products)
		console.log(data.products)
	}

	useEffect(() => {
		fetchCartItems()
	},[])


	return (
		<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3">
			{
	        	products.map((product) => {
	        		return (
	        			<div className="col product-item" key={product.id}>
		                    <div className="card h-100">
		                        <div className="position-relative">
		                            <img src="" className="card-img-top" alt="..." />
		                            <form className="position-absolute top-0 end-0 m-3" >
		                                <button className="btn btn-light rounded-circle" type="submit">
		                                    {/*{% if product.id in liked_products %}
		                                        <i className="bi bi-heart-fill text-danger"></i>
		                                    {% else %}
		                                        <i className="bi bi-heart text-dark"></i>
		                                    {% endif %}*/}
		                                </button>
		                            </form>
		                        </div>
		                        <div className="card-body d-flex flex-column">
		                            <h5 className="card-title">{ product.name }</h5>
		                            <span className="card-text fw-light mb-2">Price: GH₵{ product.price }</span>
		                            <div className="mt-auto">
		                                <form >
		                                    <button type="submit" className="btn btn-warning btn-block"><i className="bi bi-cart-plus"></i> Add to Cart</button>
		                                </form>
		                            </div>
		                        </div>
		                    </div>
		                </div>
					)
	        	})
	        }
	        
		</div>
	)
}

export default HomePage;