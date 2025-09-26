from flask import Flask
from config import Config
from models import db
from routes import bp as routes_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)    
    app.register_blueprint(routes_bp)

    return app

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        db.create_all()  
    app.run(debug=True)