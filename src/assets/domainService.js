import axios from 'axios';

class DomainService {
  constructor() {
    this.domains = null;
    this.isLoading = false;
    this.promise = null;
  }

  async getDomains() {
    // Si ya tenemos los dominios, retornarlos
    if (this.domains) {
      return this.domains;
    }

    // Si ya hay una llamada en progreso, esperar a que termine
    if (this.promise) {
      return this.promise;
    }

    // Si no hay datos ni llamada en progreso, hacer la llamada
    this.isLoading = true;
    this.promise = this.fetchDomainsFromAPI();
    
    try {
      const result = await this.promise;
      return result;
    } finally {
      this.isLoading = false;
      this.promise = null;
    }
  }

  async fetchDomainsFromAPI() {
    try {
      // Verificar si hay un token válido antes de hacer la llamada
      const token = localStorage.getItem('jwt_access_token');
      if (!token) {
        throw new Error('No hay token de autenticación');
      }
      
      const response = await axios.get('https://api-erp.linacorp.biz/auth/domain-branch', {
        headers: {
          'Authorization': `JWT ${token}`
        }
      });
      this.domains = response.data;
      
      // Guardar en localStorage para uso posterior
      localStorage.setItem('allDomains', JSON.stringify(this.domains));
      
      return this.domains;
    } catch (error) {
      console.error('Error al cargar dominios:', error);
      
      // Fallback: intentar cargar desde localStorage
      const cachedDomains = localStorage.getItem('allDomains');
      if (cachedDomains) {
        this.domains = JSON.parse(cachedDomains);
        return this.domains;
      }
      
      throw error;
    }
  }

  // Método para limpiar el cache (útil para logout)
  clearCache() {
    this.domains = null;
    this.promise = null;
    this.isLoading = false;
  }

  // Método para forzar recarga
  async refreshDomains() {
    this.domains = null;
    this.promise = null;
    return this.getDomains();
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated() {
    const token = localStorage.getItem('jwt_access_token');
    return !!token;
  }

  // Método para obtener dominio por defecto
  getDefaultDomain() {
    if (!this.domains) return null;
    return this.domains.find(domain => domain.default_dominio === true) || this.domains[0];
  }

  // Método para obtener sucursal por defecto de un dominio
  getDefaultBranch(domainId) {
    if (!this.domains) return null;
    const domain = this.domains.find(d => d.p_iniddominio === domainId);
    if (!domain) return null;
    return domain.sucursales?.find(branch => branch.default_sucursal === true) || domain.sucursales?.[0];
  }

  // Método para obtener todas las sucursales de un dominio específico
  getBranchesByDomain(domainId) {
    if (!this.domains) return [];
    const domain = this.domains.find(d => d.p_iniddominio === domainId);
    return domain?.sucursales || [];
  }

  // Método para obtener un dominio específico por ID
  getDomainById(domainId) {
    if (!this.domains) return null;
    return this.domains.find(d => d.p_iniddominio === domainId);
  }
}

// Exportar una instancia singleton
export const domainService = new DomainService();
export default domainService;
