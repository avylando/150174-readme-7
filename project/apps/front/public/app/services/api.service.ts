import type { ApiResponse } from '@front/api-service';
import { AxiosApiService } from '@front/api-service';
import { AuthApiService } from '@front/auth';
import { ApiRoute } from '../constants/api';
import { LoginUserDto } from '@project/authentication';

console.log('ApiRoute', ApiRoute);
const httpClient = new AxiosApiService(ApiRoute.BASE_URL);

class PublicApiService {
  constructor(private authService = new AuthApiService(httpClient)) {}

  loginUser(dto: LoginUserDto): Promise<ApiResponse<void>> {
    return this.authService.login(ApiRoute.LOGIN, dto);
  }
}

const publicApiService = new PublicApiService();
export { publicApiService };
