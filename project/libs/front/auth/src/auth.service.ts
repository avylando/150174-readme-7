import { ApiService, ApiResponse } from '@front/api-service';
import { LoginUserDto } from '@project/authentication';

export class AuthApiService {
  constructor(private http: ApiService) {}

  login(url: string, dto: LoginUserDto): Promise<ApiResponse<void>> {
    return this.http.post(url, dto);
  }

  register(url: string, dto: LoginUserDto): Promise<ApiResponse<void>> {
    return this.http.post(url, dto);
  }

  refreshToken(url: string, token: string): Promise<ApiResponse<void>> {
    return this.http.put(url, token);
  }

  checkToken(url: string, token: string): Promise<ApiResponse<void>> {
    return this.http.post(url, token);
  }

  logout(url: string): Promise<ApiResponse<void>> {
    return this.http.post(url, {});
  }
}
