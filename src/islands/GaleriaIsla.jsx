import React, { useState, useEffect } from "react";

const GaleriaIsla = ({ imagenes, filtros = "[]", itemsPerPage = 9 }) => {
  const [filtro, setFiltro] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  

  
  // Convertir filtros de string a array
  const filtrosArray = JSON.parse(filtros || "[]");
  
  // Crear opciones de filtro dinámicas
  const opcionesFiltro = [
    { label: "Todos", value: "todos" },
    ...filtrosArray.map(filtro => ({
      label: filtro,
      value: filtro
    }))
  ];
  
  const imagenesFiltradas = filtro === "todos"
    ? imagenes
    : imagenes.filter(img => img.tipo === filtro);

  // Calcular paginación
  const totalPages = Math.ceil(imagenesFiltradas?.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const imagenesPaginadas = imagenesFiltradas?.slice(startIndex, endIndex) || [];

 

  const handleFiltroChange = (e) => {
    const nuevoFiltro = e.target.value;
    console.log('CAMBIANDO FILTRO A:', nuevoFiltro);
    setFiltro(nuevoFiltro);
    setCurrentPage(1); // Resetear a la primera página al cambiar filtro
  };

  const handlePageChange = (page) => {
    console.log('CAMBIANDO PÁGINA A:', page);
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Funciones para el modal
  const openModal = (imageIndex) => {
    setSelectedImageIndex(imageIndex);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const goToPreviousImage = () => {
    const newIndex = selectedImageIndex > 0 ? selectedImageIndex - 1 : imagenesFiltradas.length - 1;
    setSelectedImageIndex(newIndex);
  };

  const goToNextImage = () => {
    const newIndex = selectedImageIndex < imagenesFiltradas.length - 1 ? selectedImageIndex + 1 : 0;
    setSelectedImageIndex(newIndex);
  };


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!modalOpen) return;
      
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        goToPreviousImage();
      } else if (e.key === 'ArrowRight') {
        goToNextImage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, selectedImageIndex, imagenesFiltradas.length]);

  // Resetear página cuando cambien las imágenes filtradas
  useEffect(() => {
    setCurrentPage(1);
  }, [filtro]);

  return (
    <>
      <div className="mx-auto lg:w-11/12"> 
        <div className="flex items-center gap-4 my-10">
          <span className="font-medium">Filtra por:</span>
          <select
            className="px-8 py-2 text-base text-white bg-green-600 cursor-pointer font-akira-bold button-cortado-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            value={filtro}
            onChange={handleFiltroChange}
          >
            {opcionesFiltro.map(f => (
              <option value={f.value} key={f.value}>{f.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mx-auto lg:w-4/5 lg:pb-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {imagenesPaginadas?.map((img, i) => {
  
            const realIndex = imagenesFiltradas.findIndex(filteredImg => filteredImg === img);
            return (
              <div 
                key={i} 
                className="relative overflow-hidden shadow-md cursor-pointer group hover:animate-heartbeat"
                onClick={() => openModal(realIndex)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full aspect-[4/3] object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-80"
                />
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 bg-black bg-opacity-0 group-hover:bg-opacity-50">
                  <div className="px-4 text-center text-white transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <p className="text-lg font-medium leading-relaxed">
                      {img.alt}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controles de paginación */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center mt-12 space-x-2">
            {/* Botón anterior */}
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-white transition-colors bg-green-600 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-green-700 font-akira-bold"
            >
              Anterior
            </button>

            {/* Números de página */}
            <div className="flex space-x-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`text-lg font-medium transition-colors font-akira-bold relative ${
                    currentPage === page
                      ? 'text-green-600 border-b-2 border-green-600 pb-1'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Botón siguiente */}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-white transition-colors bg-green-600 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-green-700 font-akira-bold"
            >
              Siguiente
            </button>
          </div>
        )}

      </div>

      {/* Modal de vista previa */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center p-4">
            {/* Botón cerrar */}
            <button
              onClick={closeModal}
              className="absolute z-10 p-2 text-white transition-all duration-200 bg-black bg-opacity-50 rounded-full right-5 top-20 hover:bg-opacity-75"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Botón anterior */}
            <button
              onClick={goToPreviousImage}
              className="absolute left-0 z-10 p-3 text-white transition-all duration-200 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Imagen principal */}
            <div className="relative flex flex-col items-center justify-center w-full h-full">
              <div className="flex flex-col items-center justify-center w-full h-full gap-5">
                <img
                  src={imagenesFiltradas[selectedImageIndex]?.src}
                  alt={imagenesFiltradas[selectedImageIndex]?.alt}
                  className="object-contain w-full"
                />
                        <div className="w-full p-4 text-white bg-black bg-opacity-75 rounded-lg">
                <p className="text-lg font-medium text-center">
                  {imagenesFiltradas[selectedImageIndex]?.alt}
                </p>
            
              </div>
              </div>
              
              {/* Información de la imagen debajo */}
      
            </div>

            {/* Botón siguiente */}
            <button
              onClick={goToNextImage}
              className="absolute right-0 z-10 p-3 text-white transition-all duration-200 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GaleriaIsla; 