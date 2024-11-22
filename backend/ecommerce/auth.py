from flask import Blueprint, request, jsonify
from .models import User
# from .forms import SignUP, Login
from . import db
# from flask_login import login_user, logout_user, login_required, current_user

auth = Blueprint('auth', __name__)

@auth.route('/get_users', methods=['GET'])
def get_users():
	users = User.query.all()
	json_users = [user.to_json() for user in users]
	return jsonify({"users": json_users})

@auth.route('/register', methods=['POST'])
def register():
	first_name = request.json.get("firstName")
	last_name = request.json.get("lastName")
	email = request.json.get("email")

	new_user = User(email=email.strip(), first_name=first_name.strip(), last_name=last_name.strip())
	new_user.set_password(request.json.get("password1"))

	db.session.add(new_user)
	db.session.commit()

	return jsonify({"message": "Account successfuly created"})
	


@auth.route('/login', methods=['POST'])
def login():
	email = request.json.get("email")
	user = db.session.execute(db.select(User).filter_by(email=email)).scalar()
	if user.verify_password(request.json.get("password")):
		return jsonify({"message": "Successfuly logged in"})
	else:
		return jsonify({"message": "Incorrect email or password. Try again"})


# @auth.route('/logout')
# @login_required
# def logout():
# 	logout_user()
# 	return redirect(request.referrer)
