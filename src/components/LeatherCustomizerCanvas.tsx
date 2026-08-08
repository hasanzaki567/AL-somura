import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { Sparkles, Upload, RotateCw, Trash2, Move, Check, Type, Image as ImageIcon, Plus, Pencil, FileText, ShoppingBag } from 'lucide-react';
import { MonogramConfig } from '../types';

interface LeatherCustomizerCanvasProps {
  baseImageUrl: string;
  productName: string;
  productCategory?: string;
  onApplyCustomization?: (dataUrl: string, monogram: MonogramConfig) => void;
  onClose?: () => void;
}

export const LeatherCustomizerCanvas: React.FC<LeatherCustomizerCanvasProps> = ({
  baseImageUrl,
  productName,
  productCategory = 'Outerwear',
  onApplyCustomization,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  // Customization Controls State
  const [text, setText] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [placementZone, setPlacementZone] = useState<string>('Left Chest');
  const [logoFileName, setLogoFileName] = useState<string>('');
  const [hasCustomObjects, setHasCustomObjects] = useState(false);
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  // Drawing mode / Pencil state
  const [isPencilMode, setIsPencilMode] = useState(false);
  const [pencilColor, setPencilColor] = useState('#fdc087'); // Default 24k Gold
  const [pencilWidth, setPencilWidth] = useState(3);

  const brushColors = [
    { name: '24k Gold', hex: '#fdc087' },
    { name: 'Sterling Silver', hex: '#e2e8f0' },
    { name: 'Pure White', hex: '#ffffff' },
    { name: 'Charcoal Black', hex: '#090100' },
    { name: 'Tuscan Brown', hex: '#825425' },
  ];

  // Placement zones presets depending on product type
  const placementZones = [
    { id: 'Left Chest', label: 'Left Chest', xRatio: 0.38, yRatio: 0.35 },
    { id: 'Right Sleeve', label: 'Right Sleeve', xRatio: 0.72, yRatio: 0.45 },
    { id: 'Back Center', label: 'Back Center', xRatio: 0.50, yRatio: 0.40 },
    { id: 'Bottom Right', label: 'Bottom Right', xRatio: 0.75, yRatio: 0.75 },
    { id: 'Inner Collar / Tag', label: 'Inner Collar', xRatio: 0.50, yRatio: 0.22 },
  ];

  // Initialize Fabric Canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.dispose();
    }

    const canvasWidth = 500;
    const canvasHeight = 500;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: '#f5f3ee',
      selection: true,
      preserveObjectStacking: true,
    });

    fabricCanvasRef.current = canvas;
    canvas.calcOffset();

    // Helper to load base image only
    const loadBaseImageToCanvas = (srcImage: HTMLImageElement) => {
      if (!fabricCanvasRef.current) return;

      const naturalW = srcImage.naturalWidth || 800;
      const naturalH = srcImage.naturalHeight || 800;

      // Fit within 460x460 area with padding
      const scale = Math.min(460 / naturalW, 460 / naturalH);

      const fabricImg = new fabric.FabricImage(srcImage, {
        originX: 'center',
        originY: 'center',
        left: canvasWidth / 2,
        top: canvasHeight / 2,
        scaleX: scale,
        scaleY: scale,
        selectable: false,
        evented: false,
      });

      (fabricImg as any).isBaseProduct = true;

      const existingBase = canvas.getObjects().find((o) => (o as any).isBaseProduct);
      if (existingBase) {
        canvas.remove(existingBase);
      }

      canvas.add(fabricImg);
      canvas.sendObjectToBack(fabricImg);
      canvas.renderAll();
      setIsCanvasReady(true);
    };

    // Load Base Product Image
    const imgObj = new Image();
    imgObj.crossOrigin = 'anonymous';
    imgObj.src = baseImageUrl;

    imgObj.onload = () => loadBaseImageToCanvas(imgObj);

    imgObj.onerror = () => {
      const fallbackImg = new Image();
      fallbackImg.src = baseImageUrl;
      fallbackImg.onload = () => loadBaseImageToCanvas(fallbackImg);
      fallbackImg.onerror = () => {
        canvas.renderAll();
        setIsCanvasReady(true);
      };
    };

    const updateState = () => {
      if (!canvas) return;
      const objs = canvas.getObjects().filter((o) => o.selectable || o.type === 'path');
      setHasCustomObjects(objs.length > 0);
    };

    canvas.on('object:added', updateState);
    canvas.on('object:removed', updateState);
    canvas.on('object:modified', updateState);
    canvas.on('path:created', updateState);

    return () => {
      canvas.dispose();
      fabricCanvasRef.current = null;
    };
  }, [baseImageUrl]);

  // Insert a new Text Box onto canvas
  const handleAddTextBox = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    if (isPencilMode) {
      setIsPencilMode(false);
      canvas.isDrawingMode = false;
    }

    const zone = placementZones.find((z) => z.id === placementZone) || placementZones[0];
    const posX = canvas.width! * zone.xRatio;
    const posY = canvas.height! * zone.yRatio;

    const newText = new fabric.Textbox(text.trim() || 'Custom Text', {
      left: posX,
      top: posY,
      fontSize: 22,
      fontWeight: 'bold',
      fill: pencilColor,
      stroke: '#825425',
      strokeWidth: 0.5,
      originX: 'center',
      originY: 'center',
      cornerColor: '#825425',
      cornerSize: 8,
      transparentCorners: false,
      width: 160,
    });

    canvas.add(newText);
    canvas.setActiveObject(newText);
    canvas.renderAll();
  };

  // Toggle Freehand Pencil Mode
  const togglePencilMode = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const nextMode = !isPencilMode;
    setIsPencilMode(nextMode);
    canvas.isDrawingMode = nextMode;

    if (nextMode) {
      const brush = new fabric.PencilBrush(canvas);
      brush.color = pencilColor;
      brush.width = pencilWidth;
      canvas.freeDrawingBrush = brush;
    }
  };

  // Change Pencil Color
  const handleColorChange = (colorHex: string) => {
    setPencilColor(colorHex);
    const canvas = fabricCanvasRef.current;
    if (canvas && canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = colorHex;
    }
    // Also update active text object color if any selected
    if (canvas) {
      const activeObj = canvas.getActiveObject();
      if (activeObj && (activeObj instanceof fabric.FabricText || activeObj instanceof fabric.Textbox)) {
        activeObj.set('fill', colorHex);
        canvas.renderAll();
      }
    }
  };

  // Handle Placement Zone Selection
  const handlePlacementSelect = (zoneId: string) => {
    setPlacementZone(zoneId);
    if (!fabricCanvasRef.current) return;

    const zone = placementZones.find((z) => z.id === zoneId) || placementZones[0];
    const canvas = fabricCanvasRef.current;
    const posX = canvas.width! * zone.xRatio;
    const posY = canvas.height! * zone.yRatio;

    const activeObj = canvas.getActiveObject();
    if (activeObj && activeObj.selectable) {
      activeObj.set({ left: posX, top: posY });
      activeObj.setCoords();
      canvas.renderAll();
    }
  };

  // Handle Custom Logo Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !fabricCanvasRef.current) return;

    setLogoFileName(file.name);
    const reader = new FileReader();

    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) return;

      const canvas = fabricCanvasRef.current!;

      if (isPencilMode) {
        setIsPencilMode(false);
        canvas.isDrawingMode = false;
      }

      fabric.FabricImage.fromURL(dataUrl, { crossOrigin: 'anonymous' })
        .then((img) => {
          if (!img) return;

          const zone = placementZones.find((z) => z.id === placementZone) || placementZones[0];
          const scale = 80 / Math.max(img.width || 100, img.height || 100);

          img.set({
            left: canvas.width! * zone.xRatio,
            top: canvas.height! * zone.yRatio,
            scaleX: scale,
            scaleY: scale,
            originX: 'center',
            originY: 'center',
            cornerColor: '#825425',
            cornerSize: 8,
            transparentCorners: false,
          });

          canvas.add(img);
          canvas.setActiveObject(img);
          canvas.renderAll();
        })
        .catch((err) => console.error('Logo render error:', err));
    };

    reader.readAsDataURL(file);
  };

  // Canvas Object Actions
  const handleDeleteActive = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const activeObj = canvas.getActiveObject();
    if (activeObj && activeObj.selectable) {
      canvas.remove(activeObj);
      canvas.discardActiveObject();
      canvas.renderAll();
    }
  };

  const handleRotateActive = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const activeObj = canvas.getActiveObject();
    if (activeObj) {
      activeObj.rotate((activeObj.angle || 0) + 15);
      activeObj.setCoords();
      canvas.renderAll();
    }
  };

  const handleCenterActive = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const activeObj = canvas.getActiveObject();
    if (activeObj) {
      canvas.centerObject(activeObj);
      activeObj.setCoords();
      canvas.renderAll();
    }
  };

  const handleClearAll = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    canvas.getObjects().forEach((o) => {
      if (o.selectable || o.type === 'path') {
        canvas.remove(o);
      }
    });
    canvas.discardActiveObject();
    canvas.renderAll();
  };

  // Submit customization & Add to Cart
  const handleApply = () => {
    if (!fabricCanvasRef.current) return;
    const dataUrl = fabricCanvasRef.current.toDataURL({ format: 'png', multiplier: 2 });

    const config: MonogramConfig = {
      initials: text.trim() || 'CUSTOM',
      placement: placementZone,
      logoFileName: logoFileName || undefined,
      customNotes: customDescription.trim() || undefined,
      canvasSnapshot: dataUrl,
    };

    if (onApplyCustomization) {
      onApplyCustomization(dataUrl, config);
    }
  };

  return (
    <div className="bg-[#fbf9f4] rounded-2xl border border-[#d3c3be]/60 p-6 shadow-xl space-y-6 text-[#1b1c19]">
      {/* Customizer Header */}
      <div className="flex items-center justify-between border-b border-[#d3c3be]/40 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#825425]">
            <Sparkles className="w-4 h-4 text-[#825425]" />
            <span>Interactive Fabric.js Customizer</span>
          </div>
          <h3 className="font-display font-bold text-2xl text-[#090100] mt-0.5">
            Personalize {productName}
          </h3>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="text-xs font-semibold uppercase text-[#504440] hover:text-[#090100] px-3 py-1.5 rounded bg-[#f0eee9] hover:bg-[#e4e2dd] cursor-pointer"
          >
            Close Studio
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Canvas & Drawing Controls */}
        <div className="lg:col-span-7 flex flex-col items-center space-y-3">
          {/* Main Canvas View */}
          <div className="relative border-2 border-[#825425]/30 rounded-xl overflow-hidden shadow-xl bg-white group">
            <canvas ref={canvasRef} className="max-w-full h-auto cursor-crosshair rounded-xl" />

            {/* Canvas Action Overlay Toolbar */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#090100]/80 backdrop-blur-md p-1.5 rounded-lg border border-[#fdc087]/30 text-white shadow-lg z-20">
              <button
                type="button"
                onClick={handleRotateActive}
                className="p-1.5 hover:bg-[#825425] rounded transition-colors"
                title="Rotate 15°"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleCenterActive}
                className="p-1.5 hover:bg-[#825425] rounded transition-colors"
                title="Center Element"
              >
                <Move className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleDeleteActive}
                className="p-1.5 hover:bg-red-700 rounded transition-colors"
                title="Delete Selected Element"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-300" />
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="p-1.5 hover:bg-amber-800 rounded transition-colors text-[10px] font-semibold uppercase px-2"
                title="Reset Canvas"
              >
                Clear
              </button>
            </div>

            {/* Mode Banner Indicator */}
            <div className="absolute bottom-3 left-3 bg-[#090100]/80 text-[#fdc087] text-[10px] font-medium px-3 py-1 rounded-full backdrop-blur-md border border-[#fdc087]/30 flex items-center gap-1.5 z-20">
              {isPencilMode ? (
                <>
                  <Pencil className="w-3 h-3 text-amber-400 animate-pulse" />
                  <span>Pencil Mode Active — Draw directly on product image</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3" />
                  <span>Select tools to add text box or draw on image</span>
                </>
              )}
            </div>
          </div>

          {/* Interactive Tool Buttons: Add Text Box / Pencil Draw */}
          <div className="w-full flex flex-wrap items-center justify-between gap-2 p-3 bg-white rounded-xl border border-[#d3c3be]/40 shadow-xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAddTextBox}
                className="bg-[#825425] hover:bg-[#090100] text-white px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4 text-[#fdc087]" />
                <span>Insert Text Box</span>
              </button>

              <button
                type="button"
                onClick={togglePencilMode}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                  isPencilMode
                    ? 'bg-[#090100] text-[#fdc087] border-[#fdc087] shadow-md'
                    : 'bg-[#f0eee9] text-[#090100] border-[#d3c3be] hover:bg-[#e4e2dd]'
                }`}
              >
                <Pencil className="w-4 h-4" />
                <span>{isPencilMode ? 'Pencil Active' : 'Pencil Draw'}</span>
              </button>
            </div>

            {/* Brush & Text Stamping Color Picker */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase text-[#827470]">Color:</span>
              {brushColors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => handleColorChange(c.hex)}
                  className={`w-6 h-6 rounded-full border transition-transform cursor-pointer ${
                    pencilColor === c.hex ? 'scale-125 border-[#090100] ring-2 ring-[#825425]' : 'border-black/20 opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Customization Form Controls */}
        <div className="lg:col-span-5 space-y-4 bg-white p-5 rounded-xl border border-[#d3c3be]/40 shadow-xs">
          {/* 1. Placement Zone Selection */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#090100] block mb-2 flex items-center gap-1.5">
              <Move className="w-3.5 h-3.5 text-[#825425]" />
              <span>1. Choose Placement Zone:</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {placementZones.map((zone) => (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => handlePlacementSelect(zone.id)}
                  className={`py-2 px-3 rounded-md text-xs font-semibold transition-all cursor-pointer border text-left flex items-center justify-between ${
                    placementZone === zone.id
                      ? 'bg-[#090100] text-white border-[#090100] shadow-sm'
                      : 'bg-[#f0eee9] text-[#504440] border-[#d3c3be]/50 hover:bg-[#e4e2dd] hover:text-[#090100]'
                  }`}
                >
                  <span>{zone.label}</span>
                  {placementZone === zone.id && <Check className="w-3.5 h-3.5 text-[#fdc087]" />}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Text Box Content Input */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#090100] block mb-2 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-[#825425]" />
              <span>2. Text Box Content:</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type text, name, or initials..."
                maxLength={30}
                className="flex-1 bg-[#fbf9f4] border border-[#827470]/40 rounded-lg px-3.5 py-2 text-xs font-medium text-[#090100] focus:outline-none focus:border-[#825425]"
              />
              <button
                type="button"
                onClick={handleAddTextBox}
                className="px-3 py-2 bg-[#825425] hover:bg-[#090100] text-white rounded-lg text-xs font-semibold uppercase flex items-center gap-1 cursor-pointer"
                title="Add to canvas"
              >
                <Plus className="w-3.5 h-3.5 text-[#fdc087]" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* 3. Description of Customization */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#090100] block mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#825425]" />
              <span>3. Description of Customization:</span>
            </label>
            <textarea
              rows={3}
              value={customDescription}
              onChange={(e) => setCustomDescription(e.target.value)}
              placeholder="Describe the details of the customization you want (e.g. engrave initial on sleeve, gold foil placement, hand sketch preferences...)"
              className="w-full bg-[#fbf9f4] border border-[#827470]/40 rounded-lg p-3 text-xs text-[#090100] focus:outline-none focus:border-[#825425] resize-none"
            />
          </div>

          {/* 4. Custom Logo / Design Upload */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#090100] block mb-2 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-[#825425]" />
              <span>4. Upload Logo / Crest File:</span>
            </label>
            <label className="flex items-center justify-center gap-2 bg-[#f0eee9] hover:bg-[#e4e2dd] text-[#090100] text-xs font-semibold py-2.5 px-4 rounded-lg border border-[#827470]/40 cursor-pointer transition-colors w-full">
              <Upload className="w-4 h-4 text-[#825425]" />
              <span className="truncate">{logoFileName ? `Logo: ${logoFileName}` : 'Attach Design Image (PNG / SVG)'}</span>
              <input
                type="file"
                accept="image/*,.svg"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Apply & Add to Cart Button */}
          <div className="pt-3 border-t border-[#f0eee9]">
            <button
              type="button"
              onClick={handleApply}
              className="w-full bg-[#090100] text-white hover:bg-[#825425] py-3.5 px-6 rounded-lg text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#fdc087]" />
              <span>Apply & Add Custom Product to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
