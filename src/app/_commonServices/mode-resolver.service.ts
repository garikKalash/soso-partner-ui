export class ServiceUrlProvider {
  /*
   * set it 1 for development mode
   * and 2 for live version
   * */

  private static mode: number = 2;

  public static  getAuthenticationServiceUrl(): string {
    return ServiceUrlProvider.mode === 1 ? "http://localhost:8002/" : "https://soso-authentication-service.herokuapp.com/";
  }

  public static getEventListenerServiceUrl(): string {
    return ServiceUrlProvider.mode === 1 ? "http://localhost:3000/" : "https://soso-event-service.herokuapp.com/";
  }

  public static getClientServiceUrl(): string {
    return ServiceUrlProvider.mode === 1 ? "http://localhost:8080/" : "https://soso-client.herokuapp.com/";
  }

  public static  getPartnerServiceUrl(): string {
    return ServiceUrlProvider.mode === 1 ? "http://localhost:8081/" : "https://soso-partner.herokuapp.com/";
  }

  public static  getCommonDataServiceUrl(): string {
    return ServiceUrlProvider.mode === 1 ? "http://localhost:8001/" : "https://soso-common-data.herokuapp.com/";
  }

}
