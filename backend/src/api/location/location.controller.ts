import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocationService } from './location.service';

@Controller('locations')
@ApiTags('Locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  getLocations() {
    return this.locationService.getLocations();
  }
}
