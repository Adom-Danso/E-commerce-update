from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_login import LoginManager
from redis import Redis
from flask_session import Session


db = SQLAlchemy()
login_manager = LoginManager()
sess = Session()

def create_app():
	app = Flask(__name__)
	CORS(app, supports_credentials=True, resources={r"/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}})

	app.config['SECRET_KEY'] = 'MYSECRET'
	app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db"
	app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Fixed Typo
	app.config['SESSION_TYPE'] = 'redis'
	app.config['SESSION_REDIS'] = Redis.from_url('redis://127.0.0.1:6379')


	db.init_app(app)
	login_manager.init_app(app)
	sess.init_app(app)

	from .views import views
	from .auth import auth

	app.register_blueprint(views, url_prefix='/')
	app.register_blueprint(auth, url_prefix='/auth')

	from .models import Product, User, Cart, WishList, Orders

	with app.app_context():
	    db.create_all()
	    
	return app 