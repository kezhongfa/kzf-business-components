interface Window {
  CCMS_INFOS_CONFIG: {
    TENANT: string;
    UAL: string;
  };
  SystemJS: { import: Promise<any> };
  KyPortalService: PortalService.IPortalConfig;
}
