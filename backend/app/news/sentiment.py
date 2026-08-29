POSITIVE_WORDS = {"growth", "beats", "strong", "launches", "improves", "raises"}
NEGATIVE_WORDS = {"misses", "weak", "pressure", "falls", "lawsuit", "cuts"}


def classify_sentiment(text: str) -> tuple[str, int]:
    tokens = {token.strip(".,:;!?").lower() for token in text.split()}
    positive = len(tokens & POSITIVE_WORDS)
    negative = len(tokens & NEGATIVE_WORDS)
    score = (positive - negative) * 6
    if score > 0:
        return "POSITIVE", score
    if score < 0:
        return "NEGATIVE", score
    return "NEUTRAL", 0

