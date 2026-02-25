from flask import jsonify


def success_response(data: dict, status_code: int = 200):
    """Standard success response wrapper."""
    return jsonify({
        "success": True,
        "data": data
    }), status_code


def error_response(message: str, status_code: int = 400):
    """Standard error response wrapper."""
    return jsonify({
        "success": False,
        "error": message
    }), status_code
