from flask import Flask, jsonify
from flask_cors import CORS
# CORS (Cross-Origin Resource Sharing) is a mechanism that allows web pages to access resources 
# from a different domain than the one serving the page, by relaxing the "same-origin policy" 
# for controlled and secure cross-domain requests

app = Flask(__name__)
cors=CORS(app, origins='*')

@app.route("/api/users", methods=['GET'])
def users():
    return jsonify(
        {
            "users": [
                'a', 
                'b',
                'c'
            ]
        }
    )

if __name__ == "__main__":
    app.run(debug=True, port=8008)