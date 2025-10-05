import { useState } from 'react';

interface ImageGalleryProps {
  mainImage: string;
  additionalImages?: string[];
  mainImageAlt?: string;
}

export default function ImageGallery({ 
  mainImage, 
  additionalImages = [], 
  mainImageAlt = "Imagen principal" 
}: ImageGalleryProps) {
  const [currentMainImage, setCurrentMainImage] = useState(mainImage);
  const [currentMainImageAlt, setCurrentMainImageAlt] = useState(mainImageAlt);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handleImageClick = (imageUrl: string, imageAlt: string, index: number) => {
    if (selectedImageIndex === null) {

      setSelectedImageIndex(index);
      setCurrentMainImage(imageUrl);
      setCurrentMainImageAlt(imageAlt);
    } else if (selectedImageIndex === index) {

      setSelectedImageIndex(null);
      setCurrentMainImage(mainImage);
      setCurrentMainImageAlt(mainImageAlt);
    } else {
   
      setSelectedImageIndex(index);
      setCurrentMainImage(imageUrl);
      setCurrentMainImageAlt(imageAlt);
    }
  };

  // Crear array de imágenes para la galería
  // Si hay una imagen seleccionada, mostrar la imagen original en esa posición
  const galleryImages = additionalImages.map((url, index) => {
    // Si esta posición está seleccionada, mostrar la imagen original
    if (selectedImageIndex === index) {
      return {
        url: mainImage,
        alt: mainImageAlt,
        index,
        isOriginal: true
      };
    }
    // Sino, mostrar la imagen adicional normal
    return {
      url,
      alt: `Imagen ${index + 2} del artículo`,
      index,
      isOriginal: false
    };
  });

  return (
    <div className="space-y-6">
      {/* Imagen principal */}
      <div className="overflow-hidden h-[500px] flex flex-col gap-2 justify-end cursor-pointer">
        <img 
          src={currentMainImage} 
          alt={currentMainImageAlt} 
          className="inset-0 object-cover w-full h-full" 
        />
      </div>

      {/* Galería de imágenes adicionales */}
      {galleryImages.length > 0 && (
        <div className="rounded-lg">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            {galleryImages.map((image) => (
              <div 
                key={image.index}
                className={`relative overflow-hidden shadow-md h-[200px] cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedImageIndex === image.index 
                    ? 'ring-4 ring-verdeArk ring-opacity-50' 
                    : 'hover:shadow-lg'
                }`}
                onClick={() => {
                  if (image.isOriginal) {
                
                    setSelectedImageIndex(null);
                    setCurrentMainImage(mainImage);
                    setCurrentMainImageAlt(mainImageAlt);
                  } else {
             
                    handleImageClick(additionalImages[image.index], image.alt, image.index);
                  }
                }}
              >
                <img 
                  src={image.url} 
                  alt={image.alt} 
                  className="absolute inset-0 object-cover w-full h-full" 
                />
                {selectedImageIndex === image.index && (
                  <div className="absolute inset-0 flex items-center justify-center bg-verdeArk bg-opacity-20">
                
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
