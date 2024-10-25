# Variables
VENV_NAME := venv
WEB_DIR := web
PYTHON := python3
PIP := pipx

# Phony targets
.PHONY: all setup venv install run clean

# Default target
all: setup install run

# Setup the project structure
setup:
	mkdir -p $(WEB_DIR)
	touch $(WEB_DIR)/__init__.py
	echo "from flask import Flask\n\napp = Flask(__name__)\n\n@app.route('/')\ndef hello():\n    return 'Hello, Flask!'\n\nif __name__ == '__main__':\n    app.run(debug=True)" > $(WEB_DIR)/app.py

# Create and activate virtual environment
venv:
	$(PYTHON) -m venv $(VENV_NAME)

# Install dependencies
install: venv
	. $(VENV_NAME)/bin/activate && $(PIP) install flask

# Run the Flask application
run: install
	cd $(WEB_DIR) && . ../$(VENV_NAME)/bin/activate && $(PYTHON) app.py

# Clean up generated files and directories
clean:
	rm -rf $(VENV_NAME) $(WEB_DIR)