from fastapi.routing import APIRouter
from typing import List

router = APIRouter("")

@router.get('order/')
async def get_order(id : int) -> List:

