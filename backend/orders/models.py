from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from backend.database import Base

class Order(Base):
    __tablename__ = 'orders'

    id = Column(Integer, primary_key=True, index=True)
    status = Column(Enum('complete', 'in process', 'not complete'))
    time_create = Column(DateTime)
    customer_id = Column(Integer, ForeignKey('users.id'))
    title = Column(String)
    description = Column(String)
    difficulty = Column(Enum('easy', 'medium', 'hard'))
    location = Column(String)

    customer = relationship("User", backref="orders")

class OrderComplete(Base):
    __tablename__ = 'order_complete'

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey('orders.id'))
    executor_id = Column(Integer, ForeignKey('users.id'))
    executor_team_id = Column(Integer, ForeignKey('teams.id'))
    time_accept = Column(DateTime)
    time_complete = Column(DateTime)
    stars = Column(Integer)

    executor = relationship("User")
    executor_team = relationship("Team")
