import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

function Index() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeEffect, setActiveEffect] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sampleImages = [
    {
      id: 1,
      original: "https://cdn.poehali.dev/files/a0475c13-5001-4aa2-92d1-f0734bfe9f31.jpg",
      enhanced: "https://cdn.poehali.dev/files/a0475c13-5001-4aa2-92d1-f0734bfe9f31.jpg",
      title: "Портретное фото",
      effects: ["Улучшение качества", "Яркость", "Контраст"]
    }
  ];

  const aiEffects = [
    { id: 'enhance', name: 'AI Улучшение', icon: 'Sparkles', color: 'bg-coral' },
    { id: 'animate', name: '3D Анимация', icon: 'Zap', color: 'bg-skyblue' },
    { id: 'upscale', name: 'Увеличение', icon: 'Maximize2', color: 'bg-lavender' },
    { id: 'colorize', name: 'Колоризация', icon: 'Palette', color: 'bg-warmyellow' },
    { id: 'restore', name: 'Реставрация', icon: 'RotateCcw', color: 'bg-lightblue' },
    { id: 'artistic', name: 'Арт-стиль', icon: 'Brush', color: 'bg-coral' }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setProcessedImage(null);
        setProgress(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (effectId: string) => {
    if (!selectedImage) return;
    
    setIsProcessing(true);
    setActiveEffect(effectId);
    setProgress(0);
    
    // Симуляция AI обработки
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setProcessedImage(selectedImage); // В реальном приложении здесь был бы результат AI
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="glass-effect">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Icon name="Sparkles" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">PhotoAI</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <a href="#" className="text-white/80 hover:text-white transition-colors">Галерея</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">Эффекты</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">Цены</a>
              <Button variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                Войти
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6 animate-float">
            Оживи свои фотографии с ИИ
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Превращай обычные снимки в произведения искусства с помощью искусственного интеллекта. 
            Улучшение качества, анимация, реставрация и многое другое.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-gray-900 hover:bg-white/90 px-8 py-3"
              onClick={() => fileInputRef.current?.click()}
            >
              <Icon name="Upload" size={20} className="mr-2" />
              Загрузить фото
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3"
            >
              <Icon name="Play" size={20} className="mr-2" />
              Посмотреть демо
            </Button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* AI Effects Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-8">AI Эффекты</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {aiEffects.map((effect) => (
              <Card 
                key={effect.id}
                className={`glass-effect border-white/20 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  activeEffect === effect.id ? 'ring-2 ring-white/50' : ''
                }`}
                onClick={() => processImage(effect.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 ${effect.color} rounded-xl mx-auto mb-3 flex items-center justify-center`}>
                    <Icon name={effect.icon as any} size={24} className="text-white" />
                  </div>
                  <h4 className="text-white font-semibold text-sm">{effect.name}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Image Processing Area */}
        {selectedImage && (
          <div className="mb-16">
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-center">Обработка изображения</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Original Image */}
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold flex items-center">
                      <Icon name="Image" size={20} className="mr-2" />
                      Оригинал
                    </h4>
                    <div className="photo-3d">
                      <div className="photo-inner">
                        <img 
                          src={selectedImage} 
                          alt="Original" 
                          className="w-full rounded-lg shadow-lg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Processed Image */}
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold flex items-center">
                      <Icon name="Sparkles" size={20} className="mr-2" />
                      AI Результат
                    </h4>
                    {isProcessing ? (
                      <div className="space-y-4">
                        <div className="bg-white/10 rounded-lg h-64 flex items-center justify-center">
                          <div className="text-center">
                            <div className="animate-spin w-8 h-8 border-2 border-white/30 border-t-white rounded-full mx-auto mb-4"></div>
                            <p className="text-white">Обработка AI...</p>
                          </div>
                        </div>
                        <Progress value={progress} className="bg-white/20" />
                        <p className="text-white/80 text-center">{progress}% завершено</p>
                      </div>
                    ) : processedImage ? (
                      <div className="photo-3d">
                        <div className="photo-inner">
                          <img 
                            src={processedImage} 
                            alt="Processed" 
                            className="w-full rounded-lg shadow-lg animate-pulse-glow"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white/10 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-white/30">
                        <div className="text-center">
                          <Icon name="Wand2" size={48} className="text-white/50 mx-auto mb-4" />
                          <p className="text-white/80">Выберите эффект для обработки</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {processedImage && !isProcessing && (
                  <div className="mt-8 flex justify-center space-x-4">
                    <Button className="bg-coral hover:bg-coral/90 text-white">
                      <Icon name="Download" size={20} className="mr-2" />
                      Скачать
                    </Button>
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      <Icon name="Share2" size={20} className="mr-2" />
                      Поделиться
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Sample Gallery */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-8">Примеры работ</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleImages.map((sample) => (
              <Card key={sample.id} className="glass-effect border-white/20 overflow-hidden hover:scale-105 transition-transform duration-300">
                <div className="relative">
                  <div className="photo-3d">
                    <div className="photo-inner">
                      <img 
                        src={sample.original} 
                        alt={sample.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-coral text-white">AI Enhanced</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="text-white font-semibold mb-2">{sample.title}</h4>
                  <div className="flex flex-wrap gap-1">
                    {sample.effects.map((effect, index) => (
                      <Badge key={index} variant="outline" className="border-white/30 text-white/80 text-xs">
                        {effect}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-8">Возможности AI</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-effect p-6 rounded-xl border border-white/20">
              <Icon name="Zap" size={48} className="text-coral mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-white mb-3">Быстрая обработка</h4>
              <p className="text-white/80">Получайте результат за секунды благодаря мощному AI</p>
            </div>
            <div className="glass-effect p-6 rounded-xl border border-white/20">
              <Icon name="Palette" size={48} className="text-skyblue mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-white mb-3">Множество эффектов</h4>
              <p className="text-white/80">Более 20 AI-фильтров для любых задач</p>
            </div>
            <div className="glass-effect p-6 rounded-xl border border-white/20">
              <Icon name="Shield" size={48} className="text-lavender mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-white mb-3">Безопасность</h4>
              <p className="text-white/80">Ваши фото защищены и удаляются после обработки</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass-effect mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-white/60">© 2025 PhotoAI. Оживляем фотографии с помощью искусственного интеллекта.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;