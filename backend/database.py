from __future__ import annotations

from motor.motor_asyncio import AsyncIOMotorClient
import copy
import os
from datetime import datetime
import logging
from typing import Any, Dict, Iterable, List, Optional

logger = logging.getLogger(__name__)


class InMemoryCursor:
    def __init__(self, documents: Iterable[Dict[str, Any]]):
        self._documents = list(documents)

    def sort(self, field: str, direction: int = -1):
        self._documents = sorted(
            self._documents,
            key=lambda doc: doc.get(field, datetime.min),
            reverse=direction == -1,
        )
        return self

    def limit(self, count: int):
        self._documents = self._documents[:count]
        return self

    async def to_list(self, limit: Optional[int] = None):
        documents = self._documents
        if limit is not None:
            documents = documents[:limit]
        return copy.deepcopy(documents)


class InMemoryCollection:
    def __init__(self, name: str):
        self.name = name
        self._documents: List[Dict[str, Any]] = []

    def _matches(self, query: Optional[Dict[str, Any]], document: Dict[str, Any]) -> bool:
        if not query:
            return True
        for key, expected in query.items():
            if document.get(key) != expected:
                return False
        return True

    async def insert_one(self, document: Dict[str, Any]):
        self._documents.append(copy.deepcopy(document))
        return {"_id": len(self._documents) - 1}

    async def insert_many(self, documents: List[Dict[str, Any]]):
        inserted = []
        for document in documents:
            inserted.append(copy.deepcopy(document))
            self._documents.append(copy.deepcopy(document))
        return inserted

    async def find_one(self, query: Optional[Dict[str, Any]] = None):
        for document in self._documents:
            if self._matches(query, document):
                return copy.deepcopy(document)
        return None

    async def count_documents(self, query: Optional[Dict[str, Any]] = None):
        return sum(1 for document in self._documents if self._matches(query, document))

    def find(self, query: Optional[Dict[str, Any]] = None):
        return InMemoryCursor(
            document for document in self._documents if self._matches(query, document)
        )

    async def replace_one(self, query: Optional[Dict[str, Any]], replacement: Dict[str, Any]):
        for index, document in enumerate(self._documents):
            if self._matches(query, document):
                self._documents[index] = copy.deepcopy(replacement)
                return {"matched_count": 1, "modified_count": 1}
        self._documents.append(copy.deepcopy(replacement))
        return {"matched_count": 0, "modified_count": 1}


class InMemoryDatabase:
    def __init__(self, db_name: str):
        self.name = db_name
        self._collections: Dict[str, InMemoryCollection] = {}

    def __getattr__(self, name: str):
        return self.__getitem__(name)

    def __getitem__(self, name: str):
        if name not in self._collections:
            self._collections[name] = InMemoryCollection(name)
        return self._collections[name]


class Database:
    client: AsyncIOMotorClient | None = None
    db: InMemoryDatabase | object = None

    async def connect_to_mongo(self):
        """Create database connection, falling back to in-memory storage when MongoDB is unavailable."""
        mongo_url = os.environ.get('MONGO_URL')
        db_name = os.environ.get('DB_NAME', 'aegisx_db')

        if mongo_url:
            try:
                self.client = AsyncIOMotorClient(mongo_url)
                self.db = self.client[db_name]
                await self.client.admin.command('ping')
                logger.info("Successfully connected to MongoDB")
                await self.initialize_data()
                return
            except Exception as exc:
                logger.warning("MongoDB unavailable, using in-memory fallback store: %s", exc)

        self.client = None
        self.db = InMemoryDatabase(db_name)
        logger.info("Using in-memory fallback database for local development")
        await self.initialize_data()

    async def close_mongo_connection(self):
        """Close database connection"""
        if self.client:
            self.client.close()
            logger.info("MongoDB connection closed")

    async def initialize_data(self):
        """Initialize database with default data"""
        try:
            mission_stats_exists = await self.db.mission_stats.find_one()
            if not mission_stats_exists:
                mission_stats = {
                    "sentinel_rods_deployed": 2847,
                    "border_kilometers_secured": 15106,
                    "autonomous_swaps_per_day": 3240,
                    "threat_predictions_per_hour": 847,
                    "last_updated": datetime.utcnow()
                }
                await self.db.mission_stats.insert_one(mission_stats)
                logger.info("Initialized mission stats")

            black_files_count = await self.db.black_files.count_documents({})
            if black_files_count == 0:
                black_files = [
                    {
                        "codename": "HADES",
                        "title": "Autonomous AI Swarm Drone System",
                        "classification": "TOP SECRET",
                        "description": "Coordinated swarm intelligence for autonomous battlefield operations",
                        "details": "Multi-agent AI system controlling synchronized drone formations with real-time tactical adaptation and target acquisition.",
                        "status": "OPERATIONAL",
                        "color": "from-red-600 to-red-800",
                        "icon": "Zap",
                        "created_at": datetime.utcnow(),
                        "updated_at": datetime.utcnow()
                    },
                    {
                        "codename": "PROPHET",
                        "title": "Predictive Threat Intelligence OS",
                        "classification": "CLASSIFIED",
                        "description": "Neural network-based threat prediction and analysis platform",
                        "details": "Advanced machine learning algorithms analyzing global intelligence data to predict and counter emerging threats before they manifest.",
                        "status": "ACTIVE DEVELOPMENT",
                        "color": "from-blue-600 to-blue-800",
                        "icon": "Brain",
                        "created_at": datetime.utcnow(),
                        "updated_at": datetime.utcnow()
                    },
                    {
                        "codename": "VIGIL-X",
                        "title": "Real-time Battlefield Awareness Engine",
                        "classification": "SECRET",
                        "description": "Comprehensive battlefield monitoring and coordination system",
                        "details": "Integrated sensor network providing 360-degree situational awareness with predictive movement analysis and threat assessment.",
                        "status": "FIELD TESTING",
                        "color": "from-green-600 to-green-800",
                        "icon": "Radar",
                        "created_at": datetime.utcnow(),
                        "updated_at": datetime.utcnow()
                    },
                    {
                        "codename": "OBERON",
                        "title": "Stealth VTOL Platform with AI Navigation",
                        "classification": "TOP SECRET",
                        "description": "Next-generation autonomous stealth aircraft system",
                        "details": "Advanced vertical takeoff/landing platform with adaptive camouflage, autonomous navigation, and deep learning flight control.",
                        "status": "PROTOTYPE",
                        "color": "from-purple-600 to-purple-800",
                        "icon": "Plane",
                        "created_at": datetime.utcnow(),
                        "updated_at": datetime.utcnow()
                    }
                ]
                await self.db.black_files.insert_many(black_files)
                logger.info("Initialized black files")

            founder_exists = await self.db.founder_info.find_one()
            if not founder_exists:
                founder_info = {
                    "name": "Akhilesh Sahu",
                    "title": "Founder & CEO",
                    "clearance_level": "LEVEL-5 ALPHA",
                    "operation_status": "ACTIVE COMMAND",
                    "location": "Belfast, Northern Ireland",
                    "message": "I founded AegisX not just to innovate — but to prepare. When conventional warfare fails, when traditional defense crumbles, intelligence takes over. We're not building weapons; we're architecting the cognitive superiority that wins wars before they begin.",
                    "credentials": {
                        "security_clearance": "LEVEL-5 ALPHA",
                        "operation_status": "ACTIVE COMMAND",
                        "location": "Belfast, Northern Ireland"
                    },
                    "updated_at": datetime.utcnow()
                }
                await self.db.founder_info.insert_one(founder_info)
                logger.info("Initialized founder info")

            company_exists = await self.db.company_info.find_one()
            if not company_exists:
                company_info = {
                    "name": "AegisX Innovations",
                    "tagline": "Engineering the Future of Warfare & Intelligence",
                    "mission": "Defense. Autonomy. Supremacy.",
                    "description": "AegisX Innovations operates at the intersection of military intelligence, autonomous systems, and synthetic cognition. We develop classified defense technologies that prepare nations for tomorrow's warfare.",
                    "headquarters": "Belfast, Northern Ireland, UK",
                    "email": "contact@aegisx.in",
                    "operational_status": "ACTIVE",
                    "security_level": "MAXIMUM",
                    "clearance_required": "LEVEL-3",
                    "updated_at": datetime.utcnow()
                }
                await self.db.company_info.insert_one(company_info)
                logger.info("Initialized company info")

        except Exception as e:
            logger.error(f"Error initializing data: {e}")
            raise


database = Database()