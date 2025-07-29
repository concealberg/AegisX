# AegisX Innovations API Contracts & Integration Plan

## Backend Implementation Overview

### 1. Database Models (MongoDB)

#### RecruitmentApplication Model
```python
{
    "_id": ObjectId,
    "name": str,
    "email": str,
    "nda_agreement": bool,
    "submitted_at": datetime,
    "status": str,  # "pending", "approved", "rejected"
    "clearance_level": str,  # "Level-3"
    "application_id": str,
    "ip_address": str,
    "user_agent": str
}
```

#### MissionStats Model
```python
{
    "_id": ObjectId,
    "sentinel_rods_deployed": int,
    "border_kilometers_secured": int,
    "autonomous_swaps_per_day": int,
    "threat_predictions_per_hour": int,
    "last_updated": datetime
}
```

#### BlackFile Model
```python
{
    "_id": ObjectId,
    "codename": str,
    "title": str,
    "classification": str,
    "description": str,
    "details": str,
    "status": str,
    "color": str,
    "icon": str,
    "created_at": datetime,
    "updated_at": datetime
}
```

### 2. API Endpoints

#### POST /api/recruitment/submit
- **Purpose**: Submit recruitment application
- **Request Body**:
```json
{
    "name": "string",
    "email": "string",
    "nda_agreement": boolean
}
```
- **Response**:
```json
{
    "success": boolean,
    "message": "string",
    "application_id": "string",
    "status": "pending_review"
}
```

#### GET /api/mission/stats
- **Purpose**: Get current mission statistics
- **Response**:
```json
{
    "sentinel_rods_deployed": 2847,
    "border_kilometers_secured": 15106,
    "autonomous_swaps_per_day": 3240,
    "threat_predictions_per_hour": 847,
    "last_updated": "2025-01-13T12:00:00Z"
}
```

#### GET /api/blackfiles
- **Purpose**: Get all black files/projects
- **Response**:
```json
[
    {
        "codename": "HADES",
        "title": "Autonomous AI Swarm Drone System",
        "classification": "TOP SECRET",
        "description": "...",
        "details": "...",
        "status": "OPERATIONAL",
        "color": "from-red-600 to-red-800"
    }
]
```

#### GET /api/founder/info
- **Purpose**: Get founder information
- **Response**:
```json
{
    "name": "Akhilesh Sahu",
    "title": "Founder & CEO",
    "clearance_level": "LEVEL-5 ALPHA",
    "operation_status": "ACTIVE COMMAND",
    "location": "Belfast, Northern Ireland",
    "message": "..."
}
```

#### GET /api/company/info
- **Purpose**: Get company information
- **Response**:
```json
{
    "name": "AegisX Innovations",
    "tagline": "Engineering the Future of Warfare & Intelligence",
    "mission": "Defense. Autonomy. Supremacy.",
    "headquarters": "Belfast, Northern Ireland, UK",
    "email": "contact@aegisx.in",
    "operational_status": "ACTIVE",
    "security_level": "MAXIMUM"
}
```

### 3. Mock Data Replacement Plan

#### Frontend Changes Required:
1. **RecruitmentSection.jsx**: Replace `mockAPI.submitRecruitment()` with actual API call
2. **MissionSection.jsx**: Fetch mission stats from API instead of mock data
3. **BlackFilesSection.jsx**: Load black files from API
4. **FounderSection.jsx**: Load founder info from API
5. **AboutSection.jsx**: Load company info from API

#### API Service Layer
Create `/app/frontend/src/services/api.js` to centralize API calls:
```javascript
const API_BASE = process.env.REACT_APP_BACKEND_URL + '/api';

export const api = {
    recruitment: {
        submit: (data) => axios.post(`${API_BASE}/recruitment/submit`, data)
    },
    mission: {
        getStats: () => axios.get(`${API_BASE}/mission/stats`)
    },
    blackfiles: {
        getAll: () => axios.get(`${API_BASE}/blackfiles`)
    },
    founder: {
        getInfo: () => axios.get(`${API_BASE}/founder/info`)
    },
    company: {
        getInfo: () => axios.get(`${API_BASE}/company/info`)
    }
};
```

### 4. Backend Security Features
- Input validation and sanitization
- Rate limiting for recruitment submissions
- IP logging for security monitoring
- Request headers validation
- CORS configuration for frontend domain

### 5. Database Initialization
- Pre-populate mission stats with current data
- Pre-populate black files with project information
- Pre-populate founder and company information
- Create indexes for better query performance

### 6. Integration Steps
1. **Backend Development**: Create models, routes, and database initialization
2. **API Service**: Create centralized API service layer in frontend
3. **Component Updates**: Replace mock data calls with API calls
4. **Error Handling**: Add proper error handling and loading states
5. **Testing**: Test all endpoints and frontend integration

### 7. Environment Variables
Backend `.env` additions:
```
COMPANY_EMAIL=contact@aegisx.in
RECRUITMENT_NOTIFICATION_EMAIL=recruitment@aegisx.in
SECURITY_LOG_LEVEL=HIGH
```

### 8. Database Collections
- `recruitment_applications` - Store recruitment form submissions
- `mission_stats` - Store current mission statistics
- `black_files` - Store classified project information
- `company_info` - Store company and founder information
- `security_logs` - Store security and access logs

This contract ensures seamless integration between frontend mock data and actual backend functionality while maintaining the military/defense theme and security protocols.