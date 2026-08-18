from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import math

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TelemetryEvent(BaseModel):
    x: float
    y: float
    time: float

class TelemetryPayload(BaseModel):
    events: List[TelemetryEvent]

def evaluate_telemetry(events):
    total_events = len(events)
    if total_events < 10:
        return 0
    
    linear_movements = 0
    jitter_variance = []
    
    for i in range(1, total_events):
        dx = events[i].x - events[i-1].x
        dy = events[i].y - events[i-1].y
        dt = events[i].time - events[i-1].time
        
        # Calculate velocity
        velocity = math.sqrt(dx**2 + dy**2) / (dt if dt > 0 else 0.001)
        if velocity > 0:
            jitter_variance.append(velocity)
        
        # Exact mathematical straight line check (bot behavior)
        if dx == dy and dx != 0:
            linear_movements += 1

    if not jitter_variance:
        return 0

    mean_v = sum(jitter_variance) / len(jitter_variance)
    variance = sum((x - mean_v) ** 2 for x in jitter_variance) / len(jitter_variance)
    
    # Base Human Score
    score = 95
    
    # Only penalize if speed is unnaturally constant (bot)
    if variance < 0.01:
        score -= 50
        
    # Only penalize if over 90% of points are perfectly diagonal linear vectors
    if (linear_movements / total_events) > 0.9:
        score -= 40
        
    return max(0, min(100, int(score)))

@app.post("/api/verify")
async def verify_telemetry(payload: TelemetryPayload):
    score = evaluate_telemetry(payload.events)
    verified = score >= 85
    return {"score": score, "verified": verified}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
