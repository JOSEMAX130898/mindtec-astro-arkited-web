import { useState, useEffect } from "react";
import { sendEmail } from "../services/api.js";

const FormComponent = ({ sedes, eventData, resetForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    sede: sedes.sede || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (resetForm) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        sede: sedes.sede || "",
      });
    }
  }, [resetForm, sedes.sede]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
   
      const sedesSeleccionadas = sedes.length > 0 
        ? sedes.map((s) => `<br> ${s}`).join("") 
        : "<br> No seleccionadas";
  
      const body = `
        Evento: ${eventData.name}<br>
        Fecha: ${eventData.fecha}<br>
        Hora: ${eventData.hora}<br>
        Inversion: ${eventData.inversion}<br>
        Sedes seleccionadas:${sedesSeleccionadas}<br>
        Nombre: ${formData.name}<br>
        Correo: ${formData.email}<br>
        Teléfono: ${formData.phone}<br>
      `;
  
    
      const emailContent = {
        mails: "colegio@logical.edu.pe", 
        body,
        subject: `Evento Registrado: ${eventData.name}`,
      };
  
      const response = await sendEmail(emailContent);
  
      if (response) {
        alert("¡Inscripción enviada con éxito!");
        setFormData({
          name: "",
          email: "",
          phone: "",
        });
      } else {
        alert("Error al enviar la inscripción. Por favor, intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Error al enviar la inscripción. Por favor, intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="flex flex-row items-center gap-10 space-y-4">
  <div className="w-full">
  <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre completo *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          disabled={isSubmitting}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-moradoArk focus:border-moradoArk disabled:bg-gray-100"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          disabled={isSubmitting}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-moradoArk focus:border-moradoArk disabled:bg-gray-100"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Teléfono
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          disabled={isSubmitting}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-moradoArk focus:border-moradoArk disabled:bg-gray-100"
        />
      </div>

      {/* <div>
        <label htmlFor="sede" className="block text-sm font-medium text-gray-700">
          Sede seleccionada
        </label>
        <input
          type="text"
          id="sede"
          name="sede"
          value={formData.sede}
          readOnly
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm bg-gray-50"
        />
      </div> */}
  </div>

   

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 font-medium text-white transition-colors rounded-md lg:w-2/5 bg-moradoArk hover:bg-opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Enviando..." : "Inscribirse al Evento"}
      </button>
    </form>
  );
};

export default FormComponent; 