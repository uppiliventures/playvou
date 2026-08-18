import math

def evaluate_telemetry(input_events):
    total_events = len(input_events)
    if total_events < 5:
        return 0
    
    linear_movements = 0
    jitter_variance = []
    
    for i in range(1, total_events):
        dx = input_events[i]['x'] - input_events[i-1]['x']
        dy = input_events[i]['y'] - input_events[i-1]['y']
        dt = input_events[i]['time'] - input_events[i-1]['time']
        
        velocity = math.sqrt(dx**2 + dy**2) / (dt if dt > 0 else 0.001)
        jitter_variance.append(velocity)
        
        if dx == dy:
            linear_movements += 1

    mean_v = sum(jitter_variance) / len(jitter_variance)
    variance = sum((x - mean_v) ** 2 for x in jitter_variance) / len(jitter_variance)
    
    score = 90
    if variance < 5.0:
        score -= 40
    if linear_movements / total_events > 0.8:
        score -= 40
        
    return max(0, min(100, score))

mock_human_data = [
    {'x': 10, 'y': 12, 'time': 100},
    {'x': 15, 'y': 22, 'time': 145},
    {'x': 22, 'y': 29, 'time': 190},
    {'x': 31, 'y': 45, 'time': 230},
    {'x': 40, 'y': 58, 'time': 285},
]

confidence_score = evaluate_telemetry(mock_human_data)
print(f"Verified Telemetry Score: {confidence_score}/100")

if confidence_score >= 85:
    print("Action: Triggering Solana Escrow Payout Signal...")
else:
    print("Action: Bot Pattern Detected. Escrow Locked.")
