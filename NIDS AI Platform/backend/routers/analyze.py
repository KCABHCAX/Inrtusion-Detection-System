from fastapi import APIRouter, UploadFile, File
import datetime
from schemas.api_schemas import FlowAnalysisResponse
from services import inference_service, risk_service, shap_service, anomaly_service

router = APIRouter()

@router.post("/analyze", response_model=FlowAnalysisResponse)
async def analyze_traffic(file: UploadFile = File(...)):
    # 1. Read file
    # content = await file.read()
    
    # Mocking features for now
    features = None 
    
    # 2. Run Inference
    inference_result = inference_service.run_ensemble_inference(features)
    
    # 3. Anomaly Detection
    anomaly_status = anomaly_service.detect_anomaly(features)
    
    # 4. Risk Assessment
    risk_assessment = risk_service.assess_risk(inference_result, anomaly_status)
    
    # 5. SHAP Explanation
    explanation = shap_service.get_shap_explanation(features)
    
    return FlowAnalysisResponse(
        traffic_type=inference_result["traffic_type"],
        risk_level=risk_assessment["risk_level"],
        confidence=inference_result["calibrated_confidence"],
        confidence_level="High",  # Compute based on confidence limit
        priority=risk_assessment["priority"],
        anomaly_status=anomaly_status,
        description=explanation,
        dos=risk_assessment["dos"],
        donts=risk_assessment["donts"],
        class_probabilities=inference_result["probabilities"],
        raw_confidence=inference_result["raw_confidence"],
        calibrated_confidence=inference_result["calibrated_confidence"],
        timestamp=datetime.datetime.utcnow().isoformat()
    )
