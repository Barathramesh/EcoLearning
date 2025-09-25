import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, TreePine, Globe, Camera } from "lucide-react";

const ARStudios = () => {
  const handleEnterAR = () => {
    // AR world functionality would be implemented here
    alert("Entering AR World... (AR functionality would be implemented here)");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50">
      <Navigation />
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full mb-6 shadow-lg">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              AR Studios
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Step into immersive augmented reality worlds and explore environmental concepts like never before. Experience nature, ecosystems, and sustainability in 3D!
            </p>
          </div>

          {/* AR Preview Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
                  <TreePine className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Forest Ecosystem</h3>
                <p className="text-gray-600 text-sm">Explore virtual forests and learn about biodiversity</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-200 transition-colors">
                  <Camera className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Ocean Life</h3>
                <p className="text-gray-600 text-sm">Dive into underwater worlds and marine conservation</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Renewable Energy</h3>
                <p className="text-gray-600 text-sm">Interact with solar panels and wind turbines</p>
              </CardContent>
            </Card>
          </div>

          {/* Get Enter Button */}
          <div className="text-center">
            <Button 
              onClick={handleEnterAR}
              size="lg"
              className="px-12 py-6 text-lg font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Globe className="w-6 h-6 mr-2" />
              Enter AR World
            </Button>
            <p className="text-gray-500 text-sm mt-4">
              * AR functionality requires compatible device and camera access
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ARStudios;