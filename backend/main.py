from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from backend.database import create_tables

app = FastAPI()

@app.on_event("startup")
async def on_startup():
    await create_tables()



origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "PUT", "POST", "PATCH", "DELETE"],
    allow_headers=["*"],
)
