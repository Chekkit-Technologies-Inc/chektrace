// Sidebar route metadata
export interface RouteInfo {
  path: string;
  title: string;
  category?: number;
  icon: string;
  class: string;
  extralink: boolean;
  code: string;
  submenu: RouteInfo[];
}
