
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mic, MicOff, Volume2, Loader2, MessageSquare } from "lucide-react";
import ApiService from "@/services/api";

interface VoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VoiceAssistant({ isOpen, onClose }: VoiceAssistantProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await processVoiceInput(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setError("");
    } catch (err) {
      setError("Microphone access denied. Please allow microphone access to use voice features.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsProcessing(true);
    }
  };

  const processVoiceInput = async (audioBlob: Blob) => {
    try {
      // TODO: Uncomment when backend voice processing is ready
      // const response = await ApiService.processVoiceQuery(audioBlob);
      // setTranscription(response.transcription);
      // setRecommendations(response.recommendations);
      
      // Mock voice processing for now
      setTimeout(() => {
        const mockTranscription = "Show me eco-friendly products under $20";
        const mockRecommendations = [
          { id: 1, name: "Bamboo Toothbrush", price: 8.99, carbonScore: 0.1 },
          { id: 2, name: "Reusable Shopping Bag", price: 12.99, carbonScore: 0.3 },
          { id: 3, name: "Organic Cotton T-Shirt", price: 18.99, carbonScore: 0.4 }
        ];
        
        setTranscription(mockTranscription);
        setRecommendations(mockRecommendations);
        setIsProcessing(false);
      }, 2000);
    } catch (err) {
      setError("Failed to process voice input. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleTextQuery = async (query: string) => {
    setIsProcessing(true);
    try {
      // TODO: Uncomment when backend GenAI is ready
      // const response = await ApiService.getRecommendations(query);
      // setRecommendations(response.recommendations);
      
      // Mock AI recommendations for now
      setTimeout(() => {
        const mockRecommendations = [
          { id: 4, name: "Solar Phone Charger", price: 29.99, carbonScore: 0.5, relevance: 0.9 },
          { id: 5, name: "Organic Cotton Tote", price: 15.99, carbonScore: 0.2, relevance: 0.8 },
          { id: 6, name: "Biodegradable Phone Case", price: 24.99, carbonScore: 0.3, relevance: 0.7 }
        ];
        
        setTranscription(query);
        setRecommendations(mockRecommendations);
        setIsProcessing(false);
      }, 1500);
    } catch (err) {
      setError("Failed to get recommendations. Please try again.");
      setIsProcessing(false);
    }
  };

  const clearSession = () => {
    setTranscription("");
    setRecommendations([]);
    setError("");
    setIsProcessing(false);
    setIsRecording(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            EcoSmart Voice Assistant
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Voice Recording Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Voice Input</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center">
                <Button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isProcessing}
                  className={`w-20 h-20 rounded-full ${
                    isRecording 
                      ? "bg-red-500 hover:bg-red-600 animate-pulse" 
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {isRecording ? (
                    <MicOff className="h-8 w-8" />
                  ) : (
                    <Mic className="h-8 w-8" />
                  )}
                </Button>
              </div>
              
              <div className="text-center">
                {isRecording && (
                  <p className="text-red-600 font-medium">Recording... Click to stop</p>
                )}
                {isProcessing && (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Processing your request...</span>
                  </div>
                )}
                {!isRecording && !isProcessing && (
                  <p className="text-gray-600">Click the microphone to start voice search</p>
                )}
              </div>

              {/* Quick Text Queries */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Quick Queries:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Show eco-friendly products",
                    "Find low carbon items",
                    "Products under $15",
                    "Organic food options"
                  ].map((query) => (
                    <Button
                      key={query}
                      variant="outline"
                      size="sm"
                      onClick={() => handleTextQuery(query)}
                      disabled={isProcessing || isRecording}
                    >
                      {query}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error Display */}
          {error && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <p className="text-red-700">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Transcription Display */}
          {transcription && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Volume2 className="h-4 w-4 mr-2" />
                  What you said:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 italic">"{transcription}"</p>
              </CardContent>
            </Card>
          )}

          {/* Recommendations Display */}
          {recommendations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {recommendations.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div>
                        <h4 className="font-medium">{product.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-green-600 font-semibold">
                            ${product.price}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {product.carbonScore} kg CO₂
                          </Badge>
                          {product.relevance && (
                            <Badge className="text-xs bg-blue-100 text-blue-800">
                              {Math.round(product.relevance * 100)}% match
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={clearSession}>
              Clear Session
            </Button>
            <Button onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
