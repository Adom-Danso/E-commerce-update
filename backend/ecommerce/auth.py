from flask import Blueprint, request, jsonify, session
from .models import User
from . import db

auth = Blueprint('auth', __name__)

@auth.route('/get_current_user', methods=['GET'])
def get_current_user():
	try:
		user_id = session['user_id']
		if not user_id:
			return jsonify({"message": "Unauthorized"}), 401
		user = db.session.get(User, user_id)
		if user:
			return jsonify(user.to_json()), 200

	except KeyError:
		return jsonify({"message": "User not found"}), 404


@auth.route('/get_users', methods=['GET'])
def get_users():
	users = User.query.all()
	json_users = [user.to_json() for user in users]
	user_email = [user['email'] for user in json_users] 
	return jsonify({"users": user_email})

@auth.route('/register', methods=['POST'])
def register():
	first_name = request.json.get("firstName")
	last_name = request.json.get("lastName")
	email = request.json.get("email")

	new_user = User(email=email.strip(), first_name=first_name.strip(), last_name=last_name.strip())
	new_user.set_password(request.json.get("password1"))

	db.session.add(new_user)
	db.session.commit()

	user = db.session.execute(db.select(User).filter_by(email=email)).scalar()

	session['user_id'] = user.id


	return jsonify({"message": "Account successfuly created"})
	


@auth.route('/login', methods=['POST'])
def login():
	email = request.json.get("email")
	user = db.session.execute(db.select(User).filter_by(email=email)).scalar()
	if not user or not user.verify_password(request.json.get("password")):
		return jsonify({"message": "Invalid email or password."}), 401


	session['user_id'] = user.id
	print(f"User session Id: {session.get('user_id')}", flush=True)
	return jsonify({"message": "Successfully logged in"}), 200


# @auth.route('/logout')
# @login_required
# def logout():
# 	logout_user()
# 	return redirect(request.referrer)
