from flask import Blueprint, request, jsonify, session
from . import db
from .models import Product, Cart, WishList
from sqlalchemy import and_



views = Blueprint('views', __name__)


@views.route('/get_products', methods=['GET'])
def get_products():
	products = Product.query.all()
	products = [product.to_json() for product in products]

	return jsonify({"products": products})

@views.route('/cart/', methods=['GET'])
def cart():
	user_id = session['user_id']
	items = db.session.execute(db.select(Cart).filter_by(user_id=user_id)).scalars()
	product_ids = [item.product_id for item in items]
	cart_products = db.session.execute(db.select(Product).filter(Product.id.in_(product_ids)).order_by(Product.timestamp.desc())).scalars()
	cart_products_list = [cart_product.to_json() for cart_product in cart_products] # list(cart_products)
	no_of_items_in_cart = len(cart_products_list)
	total_price = 0
	if cart_products_list:
		for product in cart_products_list:
			total_price += int(product['price'])

	return jsonify({
		'products': cart_products_list, 
		'totalPrice': total_price,	
		'cartNumber': no_of_items_in_cart
	})

@views.route('/add-to-cart/<int:id>', methods=['POST'])
def add_to_cart(id):
	user_id = session['user_id']
	product = db.session.execute(db.select(Cart).filter(and_(Cart.user_id == user_id, Cart.product_id == id))).scalars().first()
	if product is None:
		new_item = Cart(product_id=id, user_id=user_id)
		db.session.add(new_item)
		db.session.commit()

	return jsonify({'message': 'succesfully added to cart'})


@views.route('/delete-cart-item/<int:id>', methods=['DELETE'])
def remove_from_cart(id):
	user_id = session['user_id']
	cart_item = db.session.execute(db.select(Cart).filter(and_(Cart.user_id == user_id, Cart.product_id == id))).scalars().first()
	if cart_item is not None:
		db.session.delete(cart_item)
		db.session.commit()

	return jsonify({'message': 'succesfully removed from cart'})


@views.route('/wish-list', methods=['GET'])
def wishlist():
	user_id = session['user_id']
	products = db.session.execute(db.select(WishList).filter_by(user_id=user_id)).scalars()
	product_ids = [product.product_id for product in products]
	wishlist_items = list(db.session.execute(db.select(Product).filter(Product.id.in_(product_ids))).scalars())
	wishlist_products = [product.to_json() for product in wishlist_items]

	return jsonify(wishlist_products)

@views.route('/add-or-remove-from-wishlist/<int:product_id>', methods=['POST'])
def add_or_remove_from_wishlist(product_id):
	user_id = session['user_id']
	item =  db.session.execute(db.select(WishList).filter(and_(WishList.user_id == user_id, WishList.product_id == product_id))).scalars().first()
	if item is not None:
		db.session.delete(item)
		db.session.commit()
		message = "Removed from wishlist"
	elif item is None:
		new_item = WishList(product_id=product_id, user_id=user_id)
		db.session.add(new_item)
		db.session.commit()
		message = 'Added to wishlist'
		
	return jsonify({'message': message})
