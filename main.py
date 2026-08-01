import logging

from app.core.logging import configure_logging

configure_logging()

logger = logging.getLogger(__name__)

logger.info("SentinelAI backend started")
logger.warning("This is a warning")
logger.error("This is an error")