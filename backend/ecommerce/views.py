from flask import Blueprint, request, jsonify
from . import db
from .models import Product


views = Blueprint('views', __name__)

@views.route('/get_products')
def get_products():
	products = Product.query.all()
	products = [product.to_json() for product in products]

	return jsonify({"products": products})