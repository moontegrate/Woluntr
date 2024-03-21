"""initial

Revision ID: 1b7ba6afbed9
Revises: 704f1aa313ee
Create Date: 2024-03-19 11:19:01.139286

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1b7ba6afbed9'
down_revision: Union[str, None] = '704f1aa313ee'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
