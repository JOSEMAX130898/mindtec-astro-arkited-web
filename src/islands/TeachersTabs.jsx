import { useState, useEffect } from "react";
import { fetchTeachers } from "../services/api.js";

const TeachersTabs = () => {
  const [teachersData, setTeachersData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedTeachers, setSelectedTeachers] = useState([]);

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const data = await fetchTeachers();
        if (data) {
          setTeachersData(data);
        }
      } catch (err) {
        console.error("Error al obtener profesores:", err);
      }
    };

    getTeachers();
  }, []);

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    setSelectedCourse(null);
    setSelectedTeachers([]);
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setSelectedTeachers(course.teacher || []);
  };

  return (
    <div className="w-11/12 px-4 py-10 m-auto lg:w-9/12">
      {/* Botones de Materias */}
      <div className="flex pb-2 space-x-4 overflow-x-auto">
        {teachersData.map((subject) => (
          <button
            key={subject._id}
            onClick={() => handleSelectSubject(subject)}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              selectedSubject === subject ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
          >
            {subject.name}
          </button>
        ))}
      </div>

      {/* Botones de Cursos */}
      {selectedSubject && (
        <div className="flex flex-wrap gap-10 pb-2 mt-4 lg:gap-5">
          {selectedSubject.course.map((course) => (
            <button
              key={course._id}
              onClick={() => handleSelectCourse(course)}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                selectedCourse === course ? "bg-green-600 text-white" : "bg-gray-300"
              }`}
            >
              {course.name}
            </button>
          ))}
        </div>
      )}

    {selectedTeachers.length > 0 && (
        <div className="grid grid-cols-1 gap-8 mx-auto mt-10 sm:grid-cols-2 md:grid-cols-4 max-w-7xl">
          {selectedTeachers.map((teacher) => (
            <div
              key={teacher._id}
              className="relative overflow-hidden text-center shadow-lg"
          
            >
           
              <div className="relative mb-4 -mt-4">
                <div className="w-32 h-32 mx-auto overflow-hidden bg-white border-4 border-white rounded-full shadow-lg">
                  <img
                    src={teacher.imageUrl}
                    alt={teacher.name}
                    className="object-cover object-top w-full h-full"
                  />
                </div>
              </div>
              
         
              <h3 className="mb-2 text-lg font-bold text-purple-600 uppercase">
                {teacher.name}
              </h3>
              
           
              <p className="px-2 text-xs font-medium text-green-700">
                {teacher.comment || "Docente principal, con experiencia en campo y una didáctica infalible."}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeachersTabs; 