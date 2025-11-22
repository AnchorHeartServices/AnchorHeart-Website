import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Check } from 'lucide-react';

interface SignatureCaptureProps {
  onSave: (signatureData: string, signerName: string) => void;
  onCancel: () => void;
}

export default function SignatureCapture({ onSave, onCancel }: SignatureCaptureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signerName, setSignerName] = useState('');
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasSignature(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas || !signerName.trim() || !hasSignature) return;

    const signatureData = canvas.toDataURL('image/png');
    onSave(signatureData, signerName);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="signer-name" className="block text-sm font-medium text-slate-700 mb-2">
          Full Legal Name
        </label>
        <input
          id="signer-name"
          type="text"
          value={signerName}
          onChange={(e) => setSignerName(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
          placeholder="Type your full name"
          data-testid="input-signer-name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Draw Your Signature
        </label>
        <div className="border-2 border-slate-300 rounded-lg bg-white">
          <canvas
            ref={canvasRef}
            width={600}
            height={200}
            className="w-full cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            data-testid="canvas-signature"
          />
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Draw your signature in the box above using your mouse or touch screen
        </p>
      </div>

      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={clearSignature}
          disabled={!hasSignature}
          data-testid="button-clear-signature"
        >
          Clear
        </Button>
        <Button 
          variant="outline" 
          onClick={onCancel}
          data-testid="button-cancel-signature"
        >
          <X className="h-4 w-4 mr-2" /> Cancel
        </Button>
        <Button 
          onClick={handleSave}
          disabled={!signerName.trim() || !hasSignature}
          className="flex-1"
          data-testid="button-save-signature"
        >
          <Check className="h-4 w-4 mr-2" /> Save Signature
        </Button>
      </div>
    </div>
  );
}
