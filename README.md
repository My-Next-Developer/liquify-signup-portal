# Liquify Signup Portal

A full-stack web application for user registration and document management with a React frontend and Django REST API backend.

## Project Overview

This is a document upload and user management portal that allows users to:
- Register and authenticate
- Upload various types of documents
- View their application status with push-back messages
- Manage uploaded documents

## Technology Stack

### Frontend
- **React** with TypeScript
- **Vite** for build tooling and development server
- **React Router DOM** for client-side routing
- **Tailwind CSS** for styling
- **ShadCN** for UI components
- **Axios** for HTTP requests
- **JWT Decode** for token handling

### Backend
- **Django** with Python
- **Django REST Framework** for API endpoints
- **SQLite** database
- **JWT Authentication** with Simple JWT
- **CORS** support for cross-origin requests
- **File upload handling** with media storage

## Project Structure

```
liquify-signup-portal/
├── backend/                          # Django backend application
│   ├── liquify_backend/              # Django project settings
│   │   ├── __init__.py
│   │   ├── asgi.py                   # ASGI configuration
│   │   ├── settings.py               # Django settings
│   │   ├── urls.py                   # Main URL configuration
│   │   └── wsgi.py                   # WSGI configuration
│   ├── users/                        # Custom user app
│   │   ├── migrations/               # Database migrations
│   │   ├── admin.py                  # Django admin configuration
│   │   ├── api_views.py              # REST API views
│   │   ├── apps.py                   # App configuration
│   │   ├── models.py                 # Database models
│   │   ├── serializers.py            # DRF serializers
│   │   ├── tests.py                  # Test files
│   │   ├── urls.py                   # App URL patterns
│   │   └── views.py                  # Traditional Django views
│   ├── db.sqlite3                    # SQLite database
│   ├── documents/                    # Static document files
│   ├── media/                        # User uploaded files
│   └── manage.py                     # Django management script
├── frontend/                         # React frontend application
│   ├── public/                       # Static assets
│   ├── src/                          # Source code
│   │   ├── components/               # Reusable UI components
│   │   │   ├── ui/                   # Base UI components (buttons, inputs, etc.)
│   │   │   ├── FormUpload.tsx        # Document upload component
│   │   │   ├── NavBar.tsx            # Navigation component
│   │   │   ├── PageLayout.tsx        # Page layout wrapper
│   │   │   └── StatusChip.tsx        # Status display component
│   │   ├── contexts/                 # React contexts
│   │   │   └── AuthContext.tsx       # Authentication context
│   │   ├── lib/                      # Utility libraries
│   │   │   ├── api.ts                # API client configuration
│   │   │   ├── config.ts             # Configuration constants
│   │   │   ├── error-handler.ts      # Error handling utilities
│   │   │   └── utils.ts              # General utilities
│   │   ├── pages/                    # Page components
│   │   │   ├── Dashboard.tsx         # Main dashboard page
│   │   │   ├── Login.tsx             # Login page
│   │   │   └── Signup.tsx            # Registration page
│   │   ├── utils/                    # Utility components
│   │   │   └── PrivateRoute.tsx      # Protected route wrapper
│   │   ├── App.tsx                   # Main application component
│   │   ├── main.tsx                  # Application entry point
│   │   └── index.css                 # Global styles
│   ├── package.json                  # Frontend dependencies
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   ├── tsconfig.json                 # TypeScript configuration
│   └── vite.config.ts                # Vite configuration
├── venv/                             # Python virtual environment
└── README.md                         # This file
```

## Database Models

### CustomUser
- Extends Django's AbstractUser
- `application_status`: PENDING, APPROVED, REJECTED, PUSHBACK
- `pushback_reason`: Text field for rejection reasons
- `is_deleted`: Soft delete flag
- `created_at` and `updated_at`: Timestamps

### Document
- `user`: Foreign key to CustomUser
- `doc_type`: PASSPORT, PROOF_OF_ADDRESS, ID_CARD, LICENSE
- `file`: FileField for document uploads
- `uploaded_at`: Upload timestamp
- `is_deleted`: Soft delete flag

## API Endpoints

### Authentication
- `POST /auth/login/` - User login
- `POST /auth/signup/` - User registration
- `GET /auth/me/` - Get current user info

### Documents
- `GET /documents/` - List user documents
- `POST /documents/` - Upload new document
- `PATCH /documents/{id}/delete/` - Soft delete document

### API Documentation
For detailed API documentation with examples and testing capabilities, visit:
**[Postman API Documentation](https://documenter.getpostman.com/view/11277968/2sB34cq3kV)**

## Getting Started

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install
   ```

4. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

5. **Create superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start Django development server:**
   ```bash
   python manage.py runserver
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

3. **Start development server:**
   ```bash
   yarn dev
   ```

The frontend will be available at `http://localhost:5173`

## 🔧 Configuration

### Backend Configuration
- Database: SQLite (configured in `backend/liquify_backend/settings.py`)
- CORS: Configured to allow requests from `http://localhost:5173`
- Media files: Stored in `backend/media/`
- JWT Authentication: Enabled with Simple JWT

### Frontend Configuration
- API Base URL: Configured in `frontend/src/lib/config.ts`
- Routing: React Router with protected routes
- Styling: Tailwind CSS with custom components

## Features

### User Management
- User registration and authentication
- JWT-based session management
- Application status tracking
- Pushback reason display

### Document Management
- Multiple document type support
- File upload with validation
- Document listing and deletion

### UI/UX
- Form validation and error handling
- Loading states and user feedback

## Security Features
- JWT token authentication
- CORS configuration
- Soft delete for data integrity
- File upload validation
- Protected routes on frontend

## Admin Features

### Django Admin Interface
The application includes a comprehensive Django admin interface for managing users and documents.

**Access URL**: `http://localhost:8000/admin/`

### Admin Capabilities

#### User Management
- **View all users** with detailed information including:
  - User ID, username, email
  - Application status (PENDING, APPROVED, REJECTED, PUSHBACK)
  - Staff and superuser status
  - Creation and update timestamps
- **Search users** by username or email
- **Filter users** by application status, staff status, and superuser status
- **Inline document viewing** - see all documents uploaded by each user
- **Update user information** including application status and pushback reasons

#### Document Management
- **View all documents** with details:
  - Document ID and associated user
  - Document type (PASSPORT, PROOF_OF_ADDRESS, ID_CARD, LICENSE)
  - Upload timestamp
  - Deletion status
- **Search documents** by username
- **Filter documents** by document type and deletion status
- **View document files** directly in the admin interface
- **Soft delete management** - track deleted documents

### Setting Up Admin Access

1. **Create a superuser account:**
   ```bash
   cd backend
   python manage.py createsuperuser
   ```

2. **Follow the prompts to set up:**
   - Username
   - Email address
   - Password

3. **Access the admin interface:**
   - Navigate to `http://localhost:8000/admin/`
   - Login with your superuser credentials

## Development Assumptions

### Design Decisions & Deviations

During the development of this portal, several assumptions were made that slightly deviate from the original technical document:

#### User Registration Simplification
- **Simplified Signup Process**: The user registration has been kept intentionally simple with just three essential fields:
  - Username
  - Email address
  - Password
- **Rationale**: This approach reduces friction during the initial signup process and allows users to get started quickly. Additional information can be collected later if needed.

#### Document Upload Workflow
- **Post-Registration Upload**: Users are required to sign up first before they can upload any documents
- **Sequential Process**: The workflow follows a logical sequence: Register → Login → Upload Documents
- **Rationale**: This ensures proper user authentication and data association before document uploads

#### Multiple Document Support
- **Flexible Upload System**: The portal allows users to upload multiple documents of different types
- **Rationale**: Real-world applications often require multiple supporting documents, and this flexibility accommodates various compliance requirements

#### Enhanced User Experience
- **Immediate Access**: Users can start uploading documents immediately after registration
- **Document Management**: Users can view, manage, and delete their uploaded documents
- **Status Tracking**: Clear application status visibility with pushback reason support

### Technical Implications

These assumptions have influenced the following technical decisions:

- **Database Design**: CustomUser model with application status tracking
- **API Structure**: Separate endpoints for user management and document operations
- **Frontend Flow**: Clear separation between authentication and document management
- **Admin Interface**: Comprehensive admin panel for managing both users and documents

## Document Quality Enhancement

### Problem Statement
One of the key challenges in document management systems is dealing with poor quality uploads such as:
- Badly cropped images
- Blurry or out-of-focus documents
- Poor lighting conditions
- Incomplete document captures

### Solution Approach

#### Frontend UX Improvements

**Upload Guide Integration**
- **Brief Quality Guidelines**: Display helpful tips when users start uploading documents
- **Best Practices**: Guide users on proper document capture techniques
- **Visual Examples**: Show examples of good vs. poor quality uploads

**Pre-Submission Quality Check**
- **Quick Display Functionality**: Show users a preview of their uploaded documents
- **Quality Confirmation Alert**: Prompt users to confirm document quality before submission
- **Re-upload Option**: Allow users to replace documents if quality is unsatisfactory
- **"Check Quality" Button**: Provide real-time quality feedback when users upload documents

#### Backend Quality Validation

**Image Sharpness Detection**
- **OpenCV Integration**: Implement sharpness checking using OpenCV
- **Blur Detection**: Analyze image clarity and focus quality
- **Quality Scoring**: Assign quality scores to uploaded documents

**OCR Functionality**
- **Text Extraction**: Extract and validate text content from documents
- **Content Verification**: Ensure documents contain expected information
- **Format Validation**: Check document structure and completeness

### Technical Implementation Strategy

**Phase 1: Basic Quality Checks**
```python
# Example implementation structure
- Image sharpness analysis using OpenCV
- Basic OCR using Tesseract
- Quality scoring algorithm
- Document format validation
```

**Phase 2: Advanced Features**
- Machine learning-based quality assessment
- AI-powered document classification
- Automated quality improvement suggestions

### Cost-Effective Approach

**Why This Solution?**
- **Cost-Effective**: Uses open-source tools (OpenCV, Tesseract) instead of expensive APIs
- **Time-Efficient**: Immediate implementation without ML model training
- **Scalable**: Can be enhanced with AI/ML solutions in future phases
- **Reliable**: Proven technologies with extensive community support

**Future Enhancements**
- Integration with OpenAI APIs for advanced document analysis
- Custom ML models for specific document types
- Real-time quality feedback during upload
- Automated document enhancement suggestions
- "Check Quality" Button Implementation - Real-time quality assessment after backend validation is stable
