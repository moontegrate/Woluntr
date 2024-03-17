from fastapi import FastAPI, APIRouter

app = FastAPI()

router = APIRouter(tags=["users"])

@app.get("/")
async def root():
    return {"message": "Hello World"}

@router.get('get/')
async def get_user(id : int | None = None):
    return {"id":id, 
            "msg":"hello"
            }

app.include_router(router)