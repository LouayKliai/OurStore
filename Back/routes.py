from flask import Blueprint, request, jsonify
from models import db, Product, Order

bp = Blueprint("routes", __name__)

@bp.route("/products", methods=["GET"])
def get_products():
    products = Product.query.all()
    return jsonify([
        {
            "id": p.id,
            "name": p.name,
            "price": str(p.price),
            "stock": p.stock,
            "color_options": p.color_options
        } for p in products
    ])

@bp.route("/orders", methods=["POST"])
def create_order():
    data = request.json
    new_order = Order(
        product_id=data["product_id"],
        quantity=data["quantity"],
        color=data.get("color")
    )
    db.session.add(new_order)
    db.session.commit()
    return jsonify({"message": "Order created successfully"}), 201

@bp.route("/orders", methods=["GET"])
def get_orders():
    orders = Order.query.all()
    return jsonify([
        {
            "id": o.id,
            "product": o.product.name,
            "quantity": o.quantity,
            "color": o.color,
            "created_at": o.created_at.strftime("%Y-%m-%d %H:%M:%S")
        } for o in orders
    ])
