import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import FilterByTag from "./FilterByTag.jsx";
import FormComponent from "./FormComponent.jsx";
import { fetchEvents } from "../services/api.js";
import calendarIcon from "../assets/FECHA.svg";
import clockIcon from "../assets/HORA.svg";

import matriculaIcon from "../assets/MENSUALIDAD.svg";


import checkIcon from "../assets/CHECK.svg";
import noCheckIcon from "../assets/NO_CHECK.svg";
import ubicacionIcon from "../assets/UBICACION.svg";



const Calendar = () => {
  console.log("🚀 COMPONENTE CALENDAR INICIANDO...");
  
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSede, setSelectedSede] = useState(null);
  const [selectedSedeData, setSelectedSedeData] = useState(null);

  const [eventData, setEventData] = useState({
    name: "No disponible",
    fecha: "No disponible",
    hora: "No disponible - No disponible",
    inversion: "No disponible",
  });
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    console.log("🎯 USEEFFECT EJECUTÁNDOSE...");
    
    const getEvents = async () => {
      try {
        console.log("🎯 INICIANDO FETCH DE EVENTOS...");
        const data = await fetchEvents();
        console.log("🎯 EVENTOS OBTENIDOS:", data);
        console.log("🎯 CANTIDAD DE EVENTOS:", data.length);
        console.log("🎯 TIPO DE DATOS:", typeof data);
        console.log("🎯 ES ARRAY:", Array.isArray(data));
        
        if (data && Array.isArray(data)) {
          setEvents(data);
          setFilteredEvents(data);
          console.log("🎯 EVENTOS SETEADOS CORRECTAMENTE");
        } else {
          console.error("🎯 ERROR: Los datos no son un array válido");
        }
      } catch (error) {
        console.error("🎯 ERROR AL OBTENER EVENTOS:", error);
      }
    };

    getEvents();
  }, []);

  const handleEventClick = (info) => {
    console.log('🔍 Evento clickeado:', info.event);
    console.log('🔍 Propiedades del evento:', {
      title: info.event.title,
      startDay: info.event.extendedProps?.startDay,
      startHour: info.event.extendedProps?.startHour,
      endHour: info.event.extendedProps?.endHour,
      inversion: info.event.extendedProps?.inversion,
      sedes: info.event.extendedProps?.sedes,
      description: info.event.extendedProps?.description
    });
    setSelectedEvent(info.event);
    setIsOpen(true);
    setSelectedSede(null);
    setSelectedSedeData(null);
  };

  const handleSedeChange = (sedeId, sedeData) => {
    setSelectedSede(sedeId);
    setSelectedSedeData(sedeData);
  };
  
  
  
  

  useEffect(() => {
    console.log("selectedSede actualizado:", selectedSede);
  }, [selectedSede]);

  useEffect(() => {
    if (selectedEvent) {
      setEventData({
        name: selectedEvent.title || "No disponible",
        fecha: selectedEvent.extendedProps?.startDay || "No disponible",
        hora: `${selectedEvent.extendedProps?.startHour || "No disponible"} - ${selectedEvent.extendedProps?.endHour || "No disponible"}`,
        inversion: selectedEvent.extendedProps?.inversion || "No disponible",
      });
    }
  }, [selectedEvent]);

  console.log("🎯 RENDERIZANDO CALENDARIO");
  console.log("🎯 FILTERED EVENTS:", filteredEvents);
  console.log("🎯 EVENTS LENGTH:", filteredEvents.length);

  return (
    <div className="h-screen py-10">
      {/* Filtros */}
      <FilterByTag events={events} onFilteredEvents={setFilteredEvents} />

      {/* Calendario */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        timeZone="UTC"
        locale={esLocale}
        initialView="dayGridMonth"
        height="100%"
        headerToolbar={{
          left: "prev",
          center: "title",
          right: "next",
        }}
        events={filteredEvents}
        eventClick={handleEventClick}
        eventContent={(arg) => {
          // Usar el tag directamente como en FilterByTag.jsx
          const tag = arg.event.extendedProps?.tag || "Sin categoría";

          
          return (
            <div className="flex flex-col w-full max-w-[100px] sm:max-w-[150px] lg:max-w-full overflow-hidden lg:ml-3">
              <span className="block overflow-hidden text-sm font-bold text-verdeArk md:text-base text-ellipsis whitespace-nowrap">
                {tag}
              </span>
              <span className="block overflow-hidden text-sm font-bold md:text-base text-moradoArk text-ellipsis whitespace-nowrap">
                {arg.event.title}
              </span>
            </div>
          );
        }}
      />

      {/* Modal */}
      <div
        id="event-modal"
        tabIndex="-1"
        className={`z-50 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? "block" : "hidden"}`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className="relative w-11/12 max-w-2xl p-8 m-auto bg-white rounded-lg shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Título principal */}
          <h3 className="mb-4 text-2xl font-bold text-center text-gray-800">
            {selectedEvent?.title || "Detalles del evento"}
          </h3>
          
          {/* Descripción */}
          <p
            className="mb-6 text-sm text-gray-800"
            dangerouslySetInnerHTML={{ __html: selectedEvent?.extendedProps?.description || "Sin descripción disponible." }}
          ></p>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sección Desarrollo */}
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-800 ">Desarrollo</h2>
              
              <div className="ml-5 space-y-3">
                <div className="flex items-start space-x-1">
                  <div className="w-5 h-5 text-verdeEvento">
                 <img src={calendarIcon.src} alt="calendar" className="w-full h-full" />
                  </div>
                  <div>
                    <p className="text-sm text-verdeEvento">Día del evento:</p>
                    <p className="text-sm font-medium text-gray-800">{selectedEvent?.extendedProps?.startDay || "No disponible"}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-1">
                  <div className="w-5 h-5 text-verdeEvento">
                   <img src={clockIcon.src} alt="clock" className="w-full h-full" />
                  </div>
                  <div>
                    <p className="text-sm text-verdeEvento">Duración del evento:</p>
                    <p className="text-sm font-medium text-gray-800">
                      {selectedEvent?.extendedProps?.startHour || "No disponible"} - {selectedEvent?.extendedProps?.endHour || "No disponible"}
                    </p>
                  </div>
                </div>
              </div>
              <h2 className="text-lg font-bold text-gray-800 ">Inversión</h2>
              
              <div className="flex items-start ml-5 space-x-1">
                <div className="w-5 h-5 text-verdeEvento">
                 <img src={matriculaIcon.src} alt="matricula" />
                </div>
                <div>
                  <p className="text-sm text-verdeEvento">Matrícula única:</p>
                  <p className="text-sm font-medium text-gray-800">{selectedEvent?.extendedProps?.inversion || "No disponible"}</p>
                </div>
              </div>
            </div>
              
        {/* Sección Selecciona tu sede */}
        <div className="">
            <h2 className="text-lg font-bold text-gray-800 ">Selecciona tu sede</h2>
            
            {selectedEvent?.extendedProps?.sedes?.length > 0 ? (
              <div className="space-y-3">
                {selectedEvent?.extendedProps?.sedes?.map((sede, index) => {
                  const sedeId = `${selectedEvent.id}-${sede.campus_name}-${sede.vacancyName}`;
                  const isAvailable = sede.vacancyName?.toLowerCase().includes('disponible') || 
                                    sede.vacancyName?.toLowerCase().includes('available');

                  return (
                    <label key={sedeId} className="flex items-center space-x-1 cursor-pointer ">
                      <div className="flex space-x-1">
                   
                        <input
                          type="radio"
                          name="sede"
                          value={sedeId}
                          checked={selectedSede === sedeId}
                          onChange={() => handleSedeChange(sedeId, sede)}
                          className="w-4 h-4 mt-[2px]"
                          style={{
                            accentColor: '#16a34a'
                          }}
                        />
                             <div className="w-5 h-5 text-verdeEvento">
                             <img src={ubicacionIcon.src} alt="ubicacion" className="w-full h-full" />
                        </div>
                  <div className="flex flex-col">
                  <span className="text-sm font-medium text-verdeEvento">
                          {sede.campus_name}
                        </span>
                        <div className="ml-auto">
                        {isAvailable ? (
                          <div className="flex items-center space-x-1 text-blue-800 ">
                            <span className="text-xs text-[#191dba]">Vacantes disponibles</span>
                          <div className="w-5 h-5">
                          <img src={checkIcon.src} alt="check" className="w-full h-full" />
                          </div>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1 text-red-600">
                            <span className="text-xs text-[#d20f27]">Vacantes agotadas</span>
                          <div className="w-5 h-5">
                          <img src={noCheckIcon.src} alt="noCheck" className="w-full h-full" />
                          </div>
                          
                      </div>
                        )}
                      </div>
                  </div>
                      </div>
                 
                    </label>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-verdeArk">No hay sedes disponibles</p>
            )}
          </div>
      
          </div>

  

     
          <div className="flex flex-col items-center mt-8 text-center">
            <h2 className="text-5xl">INSCRIBIRSE AL EVENTO</h2>
            {selectedSedeData ? (
              <div className="flex flex-col items-center mt-5">
                {/* <p className="mb-3 text-sm text-gray-600">
                  Sede seleccionada: <span className="font-bold text-verdeArk">{selectedSedeData.campus_name}</span>
                </p> */}
                <a 
                  href={`https://wa.me/51${selectedSedeData.wsp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center transition-transform duration-300 rounded-full w-36 animate-heartbeat hover:animate-heartbeatStrong hover:scale-110"
                >
								
									<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="100" height="100" viewBox="0 0 256 256" xmlSpace="preserve">
										<g style={{stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'none', fillRule: 'nonzero', opacity: 1}} transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
											<circle cx="45" cy="45" r="45" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(42,181,64)', fillRule: 'nonzero', opacity: 1}} transform="  matrix(1 0 0 1 0 0) "/>
											<path d="M 16.138 44.738 c -0.002 5.106 1.332 10.091 3.869 14.485 l -4.112 15.013 l 15.365 -4.029 c 4.233 2.309 8.999 3.525 13.85 3.527 h 0.012 c 15.973 0 28.976 -12.999 28.983 -28.974 c 0.003 -7.742 -3.01 -15.022 -8.481 -20.498 c -5.472 -5.476 -12.749 -8.494 -20.502 -8.497 C 29.146 15.765 16.145 28.762 16.138 44.738 M 25.288 58.466 l -0.574 -0.911 c -2.412 -3.834 -3.685 -8.266 -3.683 -12.816 c 0.005 -13.278 10.811 -24.081 24.099 -24.081 c 6.435 0.003 12.482 2.511 17.031 7.062 c 4.548 4.552 7.051 10.603 7.05 17.037 C 69.205 58.036 58.399 68.84 45.121 68.84 h -0.009 c -4.323 -0.003 -8.563 -1.163 -12.261 -3.357 l -0.88 -0.522 l -9.118 2.391 L 25.288 58.466 z M 45.122 73.734 L 45.122 73.734 L 45.122 73.734 C 45.122 73.734 45.121 73.734 45.122 73.734" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(255,255,255)', fillRule: 'nonzero', opacity: 1}} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round"/>
											<path d="M 37.878 32.624 c -0.543 -1.206 -1.113 -1.23 -1.63 -1.251 c -0.422 -0.018 -0.905 -0.017 -1.388 -0.017 c -0.483 0 -1.268 0.181 -1.931 0.906 c -0.664 0.725 -2.535 2.477 -2.535 6.039 c 0 3.563 2.595 7.006 2.957 7.49 c 0.362 0.483 5.01 8.028 12.37 10.931 c 6.118 2.412 7.362 1.933 8.69 1.812 c 1.328 -0.121 4.285 -1.751 4.888 -3.442 c 0.604 -1.691 0.604 -3.14 0.423 -3.443 c -0.181 -0.302 -0.664 -0.483 -1.388 -0.845 c -0.724 -0.362 -4.285 -2.114 -4.948 -2.356 c -0.664 -0.241 -1.147 -0.362 -1.63 0.363 c -0.483 0.724 -1.87 2.355 -2.292 2.838 c -0.422 0.484 -0.845 0.544 -1.569 0.182 c -0.724 -0.363 -3.057 -1.127 -5.824 -3.594 c -2.153 -1.92 -3.606 -4.29 -4.029 -5.015 c -0.422 -0.724 -0.045 -1.116 0.318 -1.477 c 0.325 -0.324 0.724 -0.846 1.087 -1.268 c 0.361 -0.423 0.482 -0.725 0.723 -1.208 c 0.242 -0.483 0.121 -0.906 -0.06 -1.269 C 39.929 37.637 38.522 34.056 37.878 32.624" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(255,255,255)', fillRule: 'nonzero', opacity: 1}} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round"/>
										</g>
										</svg>
                </a>
                {/* <p className="mt-2 text-xs text-gray-500">
                  WhatsApp: +51 {selectedSedeData.wsp}
                </p> */}
              </div>
            ) : (
              <div className="flex flex-col items-center mt-5">
              
                <div className="flex items-center justify-center transition-transform duration-300 rounded-full opacity-50 w-36">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="100" height="100" viewBox="0 0 256 256" xmlSpace="preserve">
                    <g style={{stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'none', fillRule: 'nonzero', opacity: 1}} transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                      <circle cx="45" cy="45" r="45" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(42,181,64)', fillRule: 'nonzero', opacity: 1}} transform="  matrix(1 0 0 1 0 0) "/>
                      <path d="M 16.138 44.738 c -0.002 5.106 1.332 10.091 3.869 14.485 l -4.112 15.013 l 15.365 -4.029 c 4.233 2.309 8.999 3.525 13.85 3.527 h 0.012 c 15.973 0 28.976 -12.999 28.983 -28.974 c 0.003 -7.742 -3.01 -15.022 -8.481 -20.498 c -5.472 -5.476 -12.749 -8.494 -20.502 -8.497 C 29.146 15.765 16.145 28.762 16.138 44.738 M 25.288 58.466 l -0.574 -0.911 c -2.412 -3.834 -3.685 -8.266 -3.683 -12.816 c 0.005 -13.278 10.811 -24.081 24.099 -24.081 c 6.435 0.003 12.482 2.511 17.031 7.062 c 4.548 4.552 7.051 10.603 7.05 17.037 C 69.205 58.036 58.399 68.84 45.121 68.84 h -0.009 c -4.323 -0.003 -8.563 -1.163 -12.261 -3.357 l -0.88 -0.522 l -9.118 2.391 L 25.288 58.466 z M 45.122 73.734 L 45.122 73.734 L 45.122 73.734 L 45.122 73.734 C 45.122 73.734 45.121 73.734 45.122 73.734" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(255,255,255)', fillRule: 'nonzero', opacity: 1}} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round"/>
                      <path d="M 37.878 32.624 c -0.543 -1.206 -1.113 -1.23 -1.63 -1.251 c -0.422 -0.018 -0.905 -0.017 -1.388 -0.017 c -0.483 0 -1.268 0.181 -1.931 0.906 c -0.664 0.725 -2.535 2.477 -2.535 6.039 c 0 3.563 2.595 7.006 2.957 7.49 c 0.362 0.483 5.01 8.028 12.37 10.931 c 6.118 2.412 7.362 1.933 8.69 1.812 c 1.328 -0.121 4.285 -1.751 4.888 -3.442 c 0.604 -1.691 0.604 -3.14 0.423 -3.443 c -0.181 -0.302 -0.664 -0.483 -1.388 -0.845 c -0.724 -0.362 -4.285 -2.114 -4.948 -2.356 c -0.664 -0.241 -1.147 -0.362 -1.63 0.363 c -0.483 0.724 -1.87 2.355 -2.292 2.838 c -0.422 0.484 -0.845 0.544 -1.569 0.182 c -0.724 -0.363 -3.057 -1.127 -5.824 -3.594 c -2.153 -1.92 -3.606 -4.29 -4.029 -5.015 c -0.422 -0.724 -0.045 -1.116 0.318 -1.477 c 0.325 -0.324 0.724 -0.846 1.087 -1.268 c 0.361 -0.423 0.482 -0.725 0.723 -1.208 c 0.242 -0.483 0.121 -0.906 -0.06 -1.269 C 39.929 37.637 38.522 34.056 37.878 32.624" style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(255,255,255)', fillRule: 'nonzero', opacity: 1}} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round"/>
                    </g>
                  </svg>
                </div>
              </div>
            )}
            {/* <button className="block mb-4 text-lg font-bold text-gray-800">
              INSCRIBIRSE AL EVENTO
            </button>
            
   
            <div className="flex justify-center">
              <FormComponent sedes={selectedSede ? [selectedSede] : []} eventData={eventData} resetForm={isOpen} />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar; 