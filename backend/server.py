from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging
import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Import our modules
from database import database
from routes import router

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Application lifespan manager
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    try:
        await database.connect_to_mongo()
        logger.info("AegisX Backend System initialized successfully")
        logger.info("Security Level: MAXIMUM | Clearance: OPERATIONAL")
    except Exception as e:
        logger.error(f"Failed to initialize AegisX Backend: {e}")
        raise
    
    yield
    
    # Shutdown
    try:
        await database.close_mongo_connection()
        logger.info("AegisX Backend System shutdown complete")
    except Exception as e:
        logger.error(f"Error during shutdown: {e}")

# Create FastAPI application
app = FastAPI(
    title="AegisX Innovations API",
    description="Classified Defense Technologies & Autonomous Systems API",
    version="1.0.0",
    lifespan=lifespan
)

# Include the router
app.include_router(router)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],  # In production, specify exact origins
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@app.get("/")
async def root():
    return {
        "system": "AegisX Innovations API",
        "status": "OPERATIONAL",
        "clearance": "Level-3 Required",
        "message": "Authorized personnel only. All access is monitored and logged."
    }

# Additional security headers middleware
@app.middleware("http")
async def add_security_headers(request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["X-Security-Classification"] = "CLASSIFIED"
    return response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)