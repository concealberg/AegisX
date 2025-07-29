from fastapi import APIRouter, HTTPException, Request, Depends
from typing import List
import logging
from datetime import datetime
from models import (
    RecruitmentApplicationCreate, 
    RecruitmentApplication, 
    RecruitmentResponse,
    MissionStats,
    BlackFile,
    FounderInfo,
    CompanyInfo,
    StatusResponse
)
from database import database

logger = logging.getLogger(__name__)

# Create router with /api prefix
router = APIRouter(prefix="/api")

# Utility function to log security events
async def log_security_event(request: Request, event_type: str, details: dict = None):
    """Log security events for monitoring"""
    try:
        security_log = {
            "timestamp": datetime.utcnow(),
            "event_type": event_type,
            "ip_address": request.client.host,
            "user_agent": request.headers.get("user-agent", "Unknown"),
            "details": details or {}
        }
        await database.db.security_logs.insert_one(security_log)
    except Exception as e:
        logger.error(f"Failed to log security event: {e}")

# Recruitment Routes
@router.post("/recruitment/submit", response_model=RecruitmentResponse)
async def submit_recruitment_application(
    application: RecruitmentApplicationCreate,
    request: Request
):
    """Submit a recruitment application"""
    try:
        # Validate NDA agreement
        if not application.nda_agreement:
            await log_security_event(request, "RECRUITMENT_NDA_VIOLATION", {
                "email": application.email,
                "nda_agreed": application.nda_agreement
            })
            raise HTTPException(
                status_code=400, 
                detail="NDA agreement is mandatory for Level-3 clearance"
            )

        # Check if email already exists
        existing_application = await database.db.recruitment_applications.find_one({
            "email": application.email
        })
        
        if existing_application:
            await log_security_event(request, "RECRUITMENT_DUPLICATE_EMAIL", {
                "email": application.email
            })
            raise HTTPException(
                status_code=409,
                detail="Application already exists for this email address"
            )

        # Create application
        recruitment_app = RecruitmentApplication(
            name=application.name,
            email=application.email,
            nda_agreement=application.nda_agreement,
            ip_address=request.client.host,
            user_agent=request.headers.get("user-agent", "Unknown")
        )

        # Store in database
        await database.db.recruitment_applications.insert_one(recruitment_app.dict())

        # Log successful submission
        await log_security_event(request, "RECRUITMENT_SUBMITTED", {
            "application_id": recruitment_app.application_id,
            "email": recruitment_app.email
        })

        logger.info(f"Recruitment application submitted: {recruitment_app.application_id}")

        return RecruitmentResponse(
            success=True,
            message="Application submitted successfully. Clearance verification in progress.",
            application_id=recruitment_app.application_id,
            status="pending_review"
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error submitting recruitment application: {e}")
        await log_security_event(request, "RECRUITMENT_ERROR", {
            "error": str(e),
            "email": application.email
        })
        raise HTTPException(
            status_code=500,
            detail="Internal server error. Security protocols activated."
        )

@router.get("/recruitment/applications", response_model=List[RecruitmentApplication])
async def get_recruitment_applications(request: Request):
    """Get all recruitment applications (Admin only)"""
    try:
        await log_security_event(request, "ADMIN_ACCESS_APPLICATIONS")
        
        applications = await database.db.recruitment_applications.find().to_list(1000)
        return [RecruitmentApplication(**app) for app in applications]
    
    except Exception as e:
        logger.error(f"Error fetching recruitment applications: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Mission Statistics Routes
@router.get("/mission/stats", response_model=MissionStats)
async def get_mission_stats(request: Request):
    """Get current mission statistics"""
    try:
        await log_security_event(request, "MISSION_STATS_ACCESS")
        
        stats = await database.db.mission_stats.find_one()
        if not stats:
            raise HTTPException(status_code=404, detail="Mission statistics not found")
        
        return MissionStats(**stats)
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching mission stats: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.put("/mission/stats", response_model=StatusResponse)
async def update_mission_stats(stats: MissionStats, request: Request):
    """Update mission statistics (Admin only)"""
    try:
        await log_security_event(request, "MISSION_STATS_UPDATE", {
            "new_stats": stats.dict()
        })
        
        stats.last_updated = datetime.utcnow()
        await database.db.mission_stats.replace_one({}, stats.dict())
        
        return StatusResponse(success=True, message="Mission statistics updated")
    
    except Exception as e:
        logger.error(f"Error updating mission stats: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Black Files Routes
@router.get("/blackfiles", response_model=List[BlackFile])
async def get_black_files(request: Request):
    """Get all black files/classified projects"""
    try:
        await log_security_event(request, "BLACKFILES_ACCESS")
        
        files = await database.db.black_files.find().to_list(100)
        return [BlackFile(**file) for file in files]
    
    except Exception as e:
        logger.error(f"Error fetching black files: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/blackfiles/{codename}", response_model=BlackFile)
async def get_black_file(codename: str, request: Request):
    """Get specific black file by codename"""
    try:
        await log_security_event(request, "BLACKFILE_DETAIL_ACCESS", {
            "codename": codename
        })
        
        file = await database.db.black_files.find_one({"codename": codename})
        if not file:
            raise HTTPException(status_code=404, detail="Classified file not found")
        
        return BlackFile(**file)
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching black file {codename}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Founder Information Routes
@router.get("/founder/info", response_model=FounderInfo)
async def get_founder_info(request: Request):
    """Get founder information"""
    try:
        await log_security_event(request, "FOUNDER_INFO_ACCESS")
        
        founder = await database.db.founder_info.find_one()
        if not founder:
            raise HTTPException(status_code=404, detail="Founder information not found")
        
        return FounderInfo(**founder)
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching founder info: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Company Information Routes
@router.get("/company/info", response_model=CompanyInfo)
async def get_company_info(request: Request):
    """Get company information"""
    try:
        await log_security_event(request, "COMPANY_INFO_ACCESS")
        
        company = await database.db.company_info.find_one()
        if not company:
            raise HTTPException(status_code=404, detail="Company information not found")
        
        return CompanyInfo(**company)
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching company info: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Security Logs Route (Admin only)
@router.get("/security/logs")
async def get_security_logs(request: Request, limit: int = 100):
    """Get security logs (Admin only)"""
    try:
        await log_security_event(request, "SECURITY_LOGS_ACCESS")
        
        logs = await database.db.security_logs.find().sort("timestamp", -1).limit(limit).to_list(limit)
        return logs
    
    except Exception as e:
        logger.error(f"Error fetching security logs: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Health Check
@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "operational",
        "timestamp": datetime.utcnow(),
        "system": "AegisX Security Protocol",
        "clearance": "PUBLIC"
    }