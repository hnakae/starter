import sys
from flask import Flask, render_template, abort, send_from_directory, request, jsonify

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html"), 200

@app.route("/post", methods=['POST'])
def handleMessage():
    data = request.json
    message = data.get('message')
    
    # Process the message here
    # For example, you might want to return an echo of the message
    response = {"message": f"from api: {message}"}
    
    return jsonify(response), 200

@app.route("/<path:filename>")
def serve_file(filename):
    path = request.path
    if ".." in path or "//" in path or "~" in path:
        abort(403)
    if not filename.endswith('.html'):
        abort(405) 
    try:
         return send_from_directory(directory='./templates', path=filename)
        # instead of returning html, 
        # return processed data.
    except FileNotFoundError:
        abort(404) 
        
@app.errorhandler(405)
def method_not_allowed_error(error):
    return render_template('405.html'), 405
        
@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404

@app.errorhandler(403)
def forbidden_error(error):
    return render_template('403.html'), 403

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=3001)







