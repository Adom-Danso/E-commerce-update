from flask import Blueprint, request
from . import db

views = Blueprint('views', __name__)