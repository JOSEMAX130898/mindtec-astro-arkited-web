function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }
  
  export function getImageUrl(url: string): string {
    if (!url) return "";
    const version = hashString(url);
    return `${url}?v=${version}`;
  }
  