from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_login import LoginManager

db = SQLAlchemy()
login_manager = LoginManager()

def create_app():
	app = Flask(__name__)
	CORS(app)

	app.config['SECRET_KEY'] = "DJKPWIJEJPIPPIJF ISJSFDSDIFJSDFJWNWJOIOMO"
	app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
	app.config['SQLACHEMY_TRACT_MODIFICATIONS'] = False 

	db.init_app(app)
	login_manager.init_app(app)

	from .views import views
	from .auth import auth

	app.register_blueprint(views, url_prefix='/')
	app.register_blueprint(auth, url_prefix='/auth')

	from .models import Product, User, Cart, WishList, Orders

	with app.app_context():
	    db.create_all()

	@login_manager.user_loader
	def load_user(user_id):
	    return User.query.get(user_id)


	return app 