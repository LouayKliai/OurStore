from flask import Blueprint, request, jsonify
from app.core.database import db
from app.models.contact import ContactMessage
import os
from datetime import datetime

contact_bp = Blueprint('contact', __name__, url_prefix='/api/contact')

@contact_bp.route('/submit', methods=['POST'])
def submit_contact_form():
    """Submit contact form data"""
    try:
        data = request.get_json()

        # Validate required fields
        required_fields = ['name', 'email', 'subject', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'error': f'{field.capitalize()} is required'
                }), 400

        # Validate email format
        email = data.get('email', '').strip()
        if '@' not in email or '.' not in email:
            return jsonify({
                'success': False,
                'error': 'Please enter a valid email address'
            }), 400

        # Create contact message
        contact_message = ContactMessage(
            name=data.get('name', '').strip(),
            email=email,
            subject=data.get('subject', ''),
            message=data.get('message', '').strip()
        )

        # Save to database
        db.session.add(contact_message)
        db.session.commit()

        return jsonify({
            'success': True,
            'message': 'Thank you for your message! We\'ll get back to you soon.',
            'message_id': contact_message.id
        })

    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': 'An error occurred while processing your request. Please try again.'
        }), 500

@contact_bp.route('/messages', methods=['GET'])
def get_contact_messages():
    """Get all contact messages (admin only)"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        status = request.args.get('status', 'all')  # 'all', 'read', 'unread'

        query = ContactMessage.query

        if status == 'read':
            query = query.filter_by(is_read=True)
        elif status == 'unread':
            query = query.filter_by(is_read=False)

        messages = query.order_by(ContactMessage.created_at.desc()).paginate(
            page=page, per_page=per_page, error_out=False
        )

        return jsonify({
            'messages': [message.to_dict() for message in messages.items],
            'total': messages.total,
            'pages': messages.pages,
            'current_page': page,
            'unread_count': ContactMessage.query.filter_by(is_read=False).count()
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@contact_bp.route('/messages/<int:message_id>', methods=['GET'])
def get_contact_message(message_id):
    """Get a specific contact message"""
    try:
        message = ContactMessage.query.get_or_404(message_id)
        return jsonify(message.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@contact_bp.route('/messages/<int:message_id>/read', methods=['PUT'])
def mark_message_as_read(message_id):
    """Mark a contact message as read"""
    try:
        message = ContactMessage.query.get_or_404(message_id)
        message.is_read = True
        db.session.commit()

        return jsonify({
            'success': True,
            'message': 'Message marked as read'
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@contact_bp.route('/messages/<int:message_id>', methods=['DELETE'])
def delete_contact_message(message_id):
    """Delete a contact message"""
    try:
        message = ContactMessage.query.get_or_404(message_id)
        db.session.delete(message)
        db.session.commit()

        return jsonify({
            'success': True,
            'message': 'Message deleted successfully'
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500