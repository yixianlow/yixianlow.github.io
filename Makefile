# Makefile for Lucky Paws Project
# Local development server aliases

.PHONY: help serve serve-python serve-node serve-php clean

# Default target
help:
	@echo "Available commands:"
	@echo "  make serve      - Start a local server (auto-detects available server)"
	@echo "  make serve-python - Start Python HTTP server on port 8000"
	@echo "  make serve-node   - Start Node.js server on port 3000 (requires http-server)"
	@echo "  make serve-php    - Start PHP server on port 8000"
	@echo "  make clean       - Remove temporary files"
	@echo ""
	@echo "Usage: make serve"

# Auto-detect and start the best available server
serve:
	@echo "Starting local server on http://localhost:8000"
	@echo "Press Ctrl+C to stop"
	@python3 -m http.server 8000

# Python HTTP server (works with Python 2 and 3)
serve-python:
	@echo "Starting Python HTTP server on http://localhost:8000"
	@echo "Press Ctrl+C to stop the server"
	@if command -v python3 >/dev/null 2>&1; then \
		python3 -m http.server 8000; \
	else \
		python -m SimpleHTTPServer 8000; \
	fi

# Node.js server (requires http-server package)
serve-node:
	@echo "Starting Node.js server on http://localhost:3000"
	@echo "Press Ctrl+C to stop the server"
	@npx http-server -p 3000 -o

# PHP server
serve-php:
	@echo "Starting PHP server on http://localhost:8000"
	@echo "Press Ctrl+C to stop the server"
	@php -S localhost:8000

# Clean temporary files
clean:
	@echo "Cleaning temporary files..."
	@find . -name "*.tmp" -delete
	@find . -name "*.log" -delete
	@echo "Clean complete!"

# Install http-server globally (optional)
install-node-server:
	@echo "Installing http-server globally..."
	@npm install -g http-server
	@echo "http-server installed successfully!"

# Show server status
status:
	@echo "Checking available servers..."
	@echo "Python 3: $(shell command -v python3 >/dev/null 2>&1 && echo "Available" || echo "Not found")"
	@echo "Python: $(shell command -v python >/dev/null 2>&1 && echo "Available" || echo "Not found")"
	@echo "Node.js: $(shell command -v node >/dev/null 2>&1 && echo "Available" || echo "Not found")"
	@echo "PHP: $(shell command -v php >/dev/null 2>&1 && echo "Available" || echo "Not found")" 