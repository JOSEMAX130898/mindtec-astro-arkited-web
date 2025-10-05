// Servicio API para Astro
// Usa la misma API que el proyecto React

const BASE_URL = "https://edtlab-cms-dev.herokuapp.com";
const PROJECT = "arkited";

export const fetchEvents = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/admin/event`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        project: `${PROJECT}`,
      },
    });

    const data = await response.json();
    console.log('📦 Datos brutos de eventos:', data);
    
    if (!data || !Array.isArray(data)) {
      throw new Error("Formato de datos incorrecto");
    }

    const mappedEvents = data.map((event) => {
      console.log('🔍 Evento individual:', event);
      console.log('🏷️ Tag del evento:', event.tag);
      console.log('🏷️ Tag name:', event.tag?.name);
      
      const mappedEvent = {
        id: event._id,
        title: event.name,
        start: event.date, // Fecha del evento
        description: event.description || "Sin descripción", // Descripción
        tag: event.tag?.name || "Sin categoría", // Tag del evento
        campus: event.sedes?.map((sede) => sede.campus_name).join(", ") || "Sin sede", // Sedes
        extendedProps: {
          startDay: event.startDay, // Día de inicio
          startHour: event.startHour, // Hora de inicio
          endHour: event.endHour, // Hora de fin
          inversion: event.inversion, // Información de inversión
          createdAt: event.created_at, // Fecha de creación
          sedes: event.sedes || [],
          tag: event.tag, // Tag completo para acceso en extendedProps
          description: event.description || "Sin descripción"
        }
      };
      
      console.log('🔍 Tag original:', event.tag);
      console.log('🔍 Tag mapeado en raíz:', mappedEvent.tag);
      console.log('🔍 Tag en extendedProps:', mappedEvent.extendedProps.tag);
      
      console.log('📦 Evento mapeado:', mappedEvent);
      console.log('🏷️ Tag en extendedProps:', mappedEvent.extendedProps.tag);
      return mappedEvent;
    });
    
    console.log('📦 Eventos mapeados:', mappedEvents);
    return mappedEvents;
  } catch (error) {
    console.error("Error al obtener los eventos:", error);
    return [];
  }
};

export const fetchCycleDetails = async (cicloId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/admin/cycle_name/${cicloId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        project: `${PROJECT}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los detalles del ciclo:", error);
    return null;
  }
};

export async function fetchBlogPosts() {
  try {
    const API_URL = 'https://edtlab-cms-dev.herokuapp.com/api';
    
    const blogUrl = `${API_URL}/admin/blog`;
    
    console.log('🔍 Llamando a blog:', blogUrl);
    
    const response = await fetch(blogUrl, {
      method: 'GET',
      headers: {
        'project': 'arkited',
        'Content-Type': 'application/json'
      }
    });

    console.log('📡 Blog response status:', response.status);
    console.log('📡 Blog response ok:', response.ok);
    console.log('📡 Blog response headers:', response.headers);

    if (!response.ok) {
      throw new Error(`Error al obtener blog: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('📦 Datos de blog:', data);
    console.log('📦 Tipo de datos:', typeof data);
    console.log('📦 Es array?', Array.isArray(data));
    console.log('📦 Cantidad de elementos:', data?.length);
    
    return data || [];
  } catch (error) {
    console.error('❌ Error al obtener blog:', error);
    return [];
  }
}

export async function fetchWebInfo(project, fields) {
  try {
    const API_URL = 'https://edtlab-cms-dev.herokuapp.com/api';
    
    const infoUrl = `${API_URL}/admin/webinfos`;
    
    console.log('🔍 Llamando a webinfo:', infoUrl);
    
    const body = {
      project: project,
      fields: fields
    };
    
    const response = await fetch(infoUrl, {
      method: 'POST',
      headers: {
        'project': project,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    console.log('📡 Webinfo response status:', response.status);
    console.log('📡 Webinfo response ok:', response.ok);

    if (!response.ok) {
      throw new Error(`Error al obtener webinfo: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('📦 Datos de webinfo:', data);
    return data || [];
  } catch (error) {
    console.error('❌ Error al obtener webinfo:', error);
    return [];
  }
}

// Función para obtener información específica de eventos
export async function getEventosInfo() {
  try {
    const response = await fetchWebInfo("arkited", [
      "eventTitle", 
      "eventTitle2", 
      "eventSubtitle", 
      "eventImage"
    ]);

    if (response) {
      const formattedData = response.reduce((acc, item) => {
        acc[item.field] = item.info;
        return acc;
      }, {});
      
      return formattedData;
    }
  } catch (error) {
    console.error("Error fetching eventos info:", error);
    return {};
  }
}

export const fetchActiveCarrousel = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/admin/carrousel/active`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        project: `${PROJECT}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los datos del carrusel:", error);
    return null;
  }
};

export const fetchCycles = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/admin/home_cycle/active`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        project: `${PROJECT}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los datos del carrusel:", error);
    return null;
  }
};

export const fetchTeachers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/admin/teacher`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        project: `${PROJECT}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los datos del carrusel:", error);
    return null;
  }
};

export async function fetchGallery() {
  try {
    const API_URL = 'https://edtlab-cms-dev.herokuapp.com/api';
    
    const galleryUrl = `${API_URL}/admin/picture`;
    
    console.log('🔍 Llamando a galería:', galleryUrl);
    
    const response = await fetch(galleryUrl, {
      method: 'GET',
      headers: {
        'project': 'arkited',
        'Content-Type': 'application/json'
      }
    });

    console.log('📡 Galería response status:', response.status);
    console.log('📡 Galería response ok:', response.ok);

    if (!response.ok) {
      throw new Error(`Error al obtener galería: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('📦 Datos de galería:', data);
    return data || [];
  } catch (error) {
    console.error('❌ Error al obtener galería:', error);
    return [];
  }
}

export const fetchBlog = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/admin/article`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        project: `${PROJECT}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los datos del carrusel:", error);
    return null;
  }
};

export const sendEmail = async (emailContent) => {
  try {
    console.log('📧 sendEmail iniciado con:', emailContent);
    console.log('📧 URL:', `${BASE_URL}/api/admin/correo`);
    console.log('📧 Project:', PROJECT);
    
    const response = await fetch(`${BASE_URL}/api/admin/correo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        project: PROJECT, 
      },
      body: JSON.stringify(emailContent),
    });

    console.log('📧 Response status:', response.status);
    console.log('📧 Response ok:', response.ok);
    console.log('📧 Response headers:', response.headers);

    const responseText = await response.text();
    console.log("📧 Respuesta del servidor:", responseText);

    if (!response.ok) {
      console.error('❌ Error HTTP:', response.status, response.statusText);
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    // Verificar si la respuesta es JSON válido
    try {
      const parsedResponse = JSON.parse(responseText);
      console.log('✅ Email enviado exitosamente:', parsedResponse);
      return parsedResponse;
    } catch (parseError) {
      console.error('❌ Error al parsear JSON:', parseError);
      console.error('❌ Respuesta no válida:', responseText);
      throw new Error('Respuesta del servidor no válida');
    }
  } catch (error) {
    console.error("❌ Error al enviar el correo:", error);
    return null;
  }
}; 

export const fetchWebData = async (data) => {
  try {
    console.log('📧 sendEmail iniciado con:', data);
    console.log('📧 URL:', `${BASE_URL}/api/admin/web_data/list`);
    console.log('📧 Project:', PROJECT);
    
    const response = await fetch(`${BASE_URL}/api/admin/web_data/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        project: PROJECT, 
      },
      body: JSON.stringify(data),
    });

    console.log('📧 Response status:', response.status);
    console.log('📧 Response ok:', response.ok);
    console.log('📧 Response headers:', response.headers);

    const responseText = await response.text();
    console.log("📧 Respuesta del servidor:", responseText);

    if (!response.ok) {
      console.error('❌ Error HTTP:', response.status, response.statusText);
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    // Verificar si la respuesta es JSON válido
    try {
      const parsedResponse = JSON.parse(responseText);
      console.log('✅ Email enviado exitosamente:', parsedResponse);
      return parsedResponse;
    } catch (parseError) {
      console.error('❌ Error al parsear JSON:', parseError);
      console.error('❌ Respuesta no válida:', responseText);
      throw new Error('Respuesta del servidor no válida');
    }
  } catch (error) {
    console.error("❌ Error al enviar el correo:", error);
    return null;
  }
}; 

export async function fetchUniversities() {
  try {
    const API_URL = 'https://edtlab-cms-dev.herokuapp.com/api';
    
    const cyclesUrl = `${API_URL}/admin/solution_cycle`;
    
    console.log('🔍 Llamando a:', cyclesUrl);
    
    const response = await fetch(cyclesUrl, {
      method: 'GET',
      headers: {
        'project': 'arkited',
        'Content-Type': 'application/json'
      }
    });

    console.log('📡 Response status:', response.status);
    console.log('📡 Response ok:', response.ok);

    if (!response.ok) {
      throw new Error(`Error al obtener universidades: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('📦 Datos de universidades:', data);
    return data || [];
  } catch (error) {
    console.error('❌ Error al obtener universidades:', error);
    return [];
  }
} 

export async function fetchSolutions() {
  try {
    const API_URL = 'https://edtlab-cms-dev.herokuapp.com/api';
    
    const listUrl = `${API_URL}/admin/solution`;
    
    console.log('🔍 Llamando a:', listUrl);
    
    const response = await fetch(listUrl, {
      method: 'GET',
      headers: {
        'project': 'arkited',
        'Content-Type': 'application/json'
      }
    });

    console.log('📡 Response status:', response.status);
    console.log('📡 Response ok:', response.ok);

    if (!response.ok) {
      throw new Error(`Error al obtener soluciones: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('📦 Datos de soluciones:', data);
    return data || [];
  } catch (error) {
    console.error('❌ Error al obtener soluciones:', error);
    return [];
  }
}

// Función para obtener información específica de galería
export async function getGaleriaInfo() {
  try {
    const response = await fetchWebInfo("arkited", [
      "galleryTitle",
      "galleryTitle2", 
      "gallerySubtitle",
      "galleryImage"
    ]);

    if (response) {
      const formattedData = response.reduce((acc, item) => {
        acc[item.field] = item.info;
        return acc;
      }, {});
      
      return formattedData;
    }
  } catch (error) {
    console.error("Error fetching galería info:", error);
    return {};
  }
}

export async function getTeacherInfo() {
  try {
    const response = await fetchWebInfo("arkited", [
      "teachersBannerTitle",
      "teachersQuoteQuill",
      "teachersDescriptionQuill"
    ]);

    if (response) {
      const formattedData = response.reduce((acc, item) => {
        acc[item.field] = item.info;
        return acc;
      }, {});
      
      return formattedData;
    }
  } catch (error) {
    console.error("Error fetching galería info:", error);
    return {};
  }
}

export async function getTitleBeneficios() {
  try {
    const response = await fetchWebInfo("arkited", [
      "historyBenefitsTitle",
    ]);

    if (response) {
      const formattedData = response.reduce((acc, item) => {
        acc[item.field] = item.info;
        return acc;
      }, {});
      
      return formattedData;
    }
  } catch (error) {
    console.error("Error fetching galería info:", error);
    return {};
  }
}

export async function getNumeroNosotros() {
  try {
    const response = await fetchWebInfo("arkited", [
      "historyHow1Text",
      "historyHow1Quill",
      "historyHow2Text",
      "historyHow2Quill",
      "historyHow3Text",
      "historyHow3Quill"
    ]);

    if (response) {
      const formattedData = response.reduce((acc, item) => {
        const cleanInfo = item.info.replace(/<[^>]+>/g, "");
        acc[item.field] = cleanInfo;
        return acc;
      }, {});
      
      return formattedData;
    }
  } catch (error) {
    console.error("Error fetching galería info:", error);
    return {};
  }
}

export async function getEnsenamos() {
  try {
    const response = await fetchWebInfo("arkited", [
      "historyWhatQuill",
      "historyWhatImage",
 
    ]);

    if (response) {
      const formattedData = response.reduce((acc, item) => {
        const cleanInfo = item.info.replace(/<[^>]+>/g, "");
        acc[item.field] = cleanInfo;
        return acc;
      }, {});
      
      return formattedData;
    }
  } catch (error) {
    console.error("Error fetching galería info:", error);
    return {};
  }
}

export async function getSomosArkited() {
  try {
    const response = await fetchWebInfo("arkited", [
      "historyDescriptionQuill",
      "historyDescriptionImage",
 
    ]);

    if (response) {
      const formattedData = response.reduce((acc, item) => {
        const cleanInfo = item.info.replace(/<[^>]+>/g, "");
        acc[item.field] = cleanInfo;
        return acc;
      }, {});
      
      return formattedData;
    }
  } catch (error) {
    console.error("Error fetching galería info:", error);
    return {};
  }
}

export async function getFooterInfo() {
  try {
    const response = await fetchWebInfo("arkited", [
      "footerEmail",
    "footerEmailLink",
    "footerPhone",
    "footerPhoneLink",
    "footerPhone2",
    "footerPhone2Link",
    "footerAddress",
    "footerAddressLink",
    "footerFacebook",
    "footerWhatsapp",
    "footerYoutube",
    "footerInstagram",
    "footerTiktok",
 
    ]);

    if (response) {
      const formattedData = response.reduce((acc, item) => {
        const cleanInfo = item.info.replace(/<[^>]+>/g, "");
        acc[item.field] = cleanInfo;
        return acc;
      }, {});
      
      return formattedData;
    }
  } catch (error) {
    console.error("Error fetching galería info:", error);
    return {};
  }
}

export async function getLetrasInfo() {
  try {
    const response = await fetchWebInfo("arkited", [
    "historyHowAText",
    "historyHowAQuill",
    "historyHowBText",
    "historyHowBQuill",
    "historyHowCText",
    "historyHowCQuill",
    ]);

    if (response) {
      const formattedData = response.reduce((acc, item) => {
        const cleanInfo = item.info.replace(/<[^>]+>/g, "");
        acc[item.field] = cleanInfo;
        return acc;
      }, {});
      console.log(" 📦 Datos de soluciones:",formattedData);
      return formattedData;
    }
  } catch (error) {
    console.error("Error fetching galería info:", error);
    return {};
  }
}

export async function getContactoInfo() {
  try {
    const response = await fetchWebInfo("arkited", [
   "contactTitle",
"contactTitle2",
"contactSubtitle",
"contactImage"
    ]);

    if (response) {
      const formattedData = response.reduce((acc, item) => {
        acc[item.field] = item.info;
        return acc;
      }, {});
      
      return formattedData;
    }
  } catch (error) {
    console.error("Error fetching contato info:", error);
    return {};
  }
}

// Función para obtener información específica de blog
export async function getBlogInfo() {
  try {
    const response = await fetchWebInfo("arkited", [
      "blogTitle",
      "blogTitle2", 
      "blogSubtitle",
      "blogImage"
    ]);

    if (response) {
      const formattedData = response.reduce((acc, item) => {
        acc[item.field] = item.info;
        return acc;
      }, {});
      
      return formattedData;
    }
  } catch (error) {
    console.error("Error fetching blog info:", error);
    return {};
  }
}






export async function getSedesInfo() {
  try {
    const response = await fetchWebInfo("arkited", [
      "locationsTitle",
      "locationsTitle2", 
      "locationsSubtitle",
      "locationsImage"
    ]);

    if (response) {
      const formattedData = response.reduce((acc, item) => {
        acc[item.field] = item.info;
        return acc;
      }, {});
      
      return formattedData;
    }
  } catch (error) {
    console.error("Error fetching sedes info:", error);
    return {};
  }
}

// Función para obtener las ubicaciones desde la API
export async function fetchLocations() {
  try {
    const API_URL = 'https://edtlab-cms-dev.herokuapp.com/api';
    const locationsUrl = `${API_URL}/admin/location`;
    
    console.log('🔍 Llamando a ubicaciones:', locationsUrl);
    
    const response = await fetch(locationsUrl, {
      method: 'GET',
      headers: {
        'project': 'arkited',
        'Content-Type': 'application/json'
      }
    });

    console.log('📡 Ubicaciones response status:', response.status);
    console.log('📡 Ubicaciones response ok:', response.ok);

    if (!response.ok) {
      throw new Error(`Error al obtener ubicaciones: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('📦 Datos de ubicaciones:', data);
    return data;
  } catch (error) {
    console.error('❌ Error al obtener ubicaciones:', error);
    return [];
  }
}

export async function fetchAdvices() {
  try {
    const API_URL = 'https://edtlab-cms-dev.herokuapp.com/api';
    const advicesUrl = `${API_URL}/admin/advice`;
    
    console.log('🔍 Llamando a testimonios:', advicesUrl);
    
    const response = await fetch(advicesUrl, {
      method: 'GET',
      headers: {
        'project': 'arkited',
        'Content-Type': 'application/json'
      }
    });

    console.log('📡 Testimonios response status:', response.status);
    console.log('📡 Testimonios response ok:', response.ok);

    if (!response.ok) {
      throw new Error(`Error al obtener testimonios: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('📦 Datos de testimonios:', data);
    return data || [];
  } catch (error) {
    console.error('❌ Error al obtener testimonios:', error);
    return [];
  }
} 