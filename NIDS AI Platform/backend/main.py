from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import analyze, metrics, health

app = FastAPI(
    title="NIDS AI Platform API",
    description="Backend API for the AI-Driven Network Intrusion Detection System.",
    version="1.0.0"
)

# Configure CORS
# Allow all origins for simplicity in development, restrict in production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router)
app.include_router(analyze.router)
app.include_router(metrics.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
