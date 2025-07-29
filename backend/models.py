from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid

# Recruitment Application Models
class RecruitmentApplicationCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    nda_agreement: bool

class RecruitmentApplication(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    nda_agreement: bool
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="pending")
    clearance_level: str = Field(default="Level-3")
    application_id: str = Field(default_factory=lambda: f"AX-{str(uuid.uuid4())[:8].upper()}")
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

# Mission Statistics Model
class MissionStats(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    sentinel_rods_deployed: int
    border_kilometers_secured: int
    autonomous_swaps_per_day: int
    threat_predictions_per_hour: int
    last_updated: datetime = Field(default_factory=datetime.utcnow)

# Black Files Model
class BlackFile(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    codename: str
    title: str
    classification: str
    description: str
    details: str
    status: str
    color: str
    icon: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Founder Information Model
class FounderInfo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    title: str
    clearance_level: str
    operation_status: str
    location: str
    message: str
    credentials: dict
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Company Information Model
class CompanyInfo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    tagline: str
    mission: str
    description: str
    headquarters: str
    email: str
    operational_status: str
    security_level: str
    clearance_required: str
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Response Models
class RecruitmentResponse(BaseModel):
    success: bool
    message: str
    application_id: str
    status: str

class StatusResponse(BaseModel):
    success: bool
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)