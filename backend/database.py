import os

import tracemalloc
tracemalloc.start()

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

DATABASE_URL = os.getenv('DATABASE_URL')

engine = create_async_engine(DATABASE_URL)

sessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False, autoflush=False, auto_commi=False)


    

class Base(DeclarativeBase):
    pass

    